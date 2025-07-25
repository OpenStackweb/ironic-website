---
templateKey: blog-post
title: Coming Soon - Threaded Ironic
author: Julia Kreger
date: 2025-07-25T20:00:00.000Z
category:
  - label: Development Update
    id: category-A7fnZYrE9
---

To understand where you're going, you need to understand where you started.

We typically don't talk about [eventlet](https://eventlet.readthedocs.io/en/latest/). It was a foundational technology which OpenStack based on to address concurrency in a Python process. It enabled a <!--more--> level of concurrency which has simplified many things for OpenStack without developers needing to be mindful of threading. In essence, Eventlet replaces native threading and numerous blocking calls in a Python application. It also came with caveats, but it provided a suitable substrate to build upon.

For example, calling a time.sleep() call wouldn't actually block the application. The same is true for socket IO, and numerous other code paths which block a "thread".

This is because eventlet quite literally overwrote Threading logic with code which functionally turns the threads into [coroutines](https://en.wikipedia.org/wiki/Coroutine), where any blocking action would result in different coroutines executing.

For OpenStack as a whole, this was fairly useful. Most activities were not bound by CPU resource constraints, even when a process was functionally single threaded for specific actions. Of course, some services decomposed furhter along logical boundries, but overall OpenStack services had found an balance in the process and task execution models which met requirements while also kept the design and maintenance relatively simple.

But time has finally come for OpenStack projects to remove eventlet. The reasons are complex, and truthfully eventlet has been holding OpenStack projects back, while changes in Python make the maintenance of eventlet problematic as time moves forward.

The end result, Ironic is becoming a true multi-threaded application. While not quite already released, expect Ironic 32.0 (part of the 2025.2 OpenStack release) to be the result of the hard work of contributors in the community.

## Ironic and Threading

Ironic has had an interesting history.

A project which is widely used inside of OpenStack and as well outside of OpenStack.

A project which facilitates the day to day management of fleets of Bare Metal hardware.

A project which supports a variety of deployment strategies and performance profiles from embedded to heavily scaled out across an extensively large cluster.

The net result is you can run Ironic a single container, or in a distributed deployment, and the driving factor in how you'll make that decision is more an artifact of your operational requirements. For example, if you're using Redfish or IPMI, each of which have drastically different performance impacts.

With this, there are two activities within Ironic which are heavily concurrent and can be extremely resource intensive: Power state synchronization and Sensor Data Collection.

Both activities require the ability to interact with Ironic's database in a consistent way, where any locking is able to be updated inside of the database utilizing the existing connections as to also not risk a possible split-head situation through database cluster. Combined with the consistent hash ring which assigns nodes to "ironic-conductor" processes, this model avoids possible deadlock conditions for a node, and when combined with the pre-existing locking model, work on a specific node is reserved.

But going back to the two tasks which generate the most activity for an Ironic deployment, the power state and sensor data processes, each process ultimately can become IO bound. They can, depending on the driver, launch external processes, or have a substantial amount of structured data to parse in order to achieve the desired end result.

In the past, Ironic has handled this concurrency with eventlet. Some work would be temporarily blocked for a short time, but the threading model allowed for the work to be managed through a pool of threads where specific work is assigned to a thread based upon the user requests or actions, the vast majority of it being asynchronous. Moving forward, native python threads will be used to facilitate the removal of eventlet.

This unfortunately changes the process model, to an extent, as well as the amount of memory, and ultimately the overall behavior pattern of Ironic. While there are many changes, the results are also positive. In large part because threads align with the process design model in use. Work becomes a task on the thread pool, and the end result is the database record is updated. A substantial portion of already existing code helps provide the guard rails to prevent issues like zombie or orphaned threads, supported by the overall design of Ironic. Where things are going to be most interesting, is where tasks previously hung before, in the same way, for example when a remote BMC is unreachable.

To take a step back though, threads are often viewed with skepticism and confusion. In part because because it is hard to mentally think of the behavior patterns which result. On a plus side, risk of the overall change is greatly reduced but not eliminated due to the removal of eventlet. Even amongst Ironic maintainers, we had to take a step back and look at other common everyday applications and their thread behavior to help reset and ground our perceptions.

### Operator Impact - Process model changes

So far, we've already discussed, at a high level, the fact that the removal of eventlet will result in the use of Ironic becoming a multi-threaded application. A side-effect of the changes, is that each "application" being launched becomes a sub-process from the launching process.

The easiest way to think of this is as a "launcher" and the "service". Some common code exists between the two, for example shutdown handling must be triggered by a launcher because threads cannot receive signals. Aside from some additional complexity around stopping/starting the processes, the net effect is an increased memory footprint.

Ironic also has multiple use modes, depending on the footprint of the deploy. For Example, the Metal3 project uses Ironic under the hood in a single container which operates a single process. Moving forward, this single container will now have three processes. The first process, the launcher will be what the container starts, and then two sub-processes will spawn. One sub-process will be the API surface for Ironic, and the other sub-process will be the conductor process which is charged with doing the heavy lifting of the deployment. This also means that some drivers or processes may then fork additional processes off from a thread to achieve additional actions like speaking to a device using ipmitool, or when converting an image using qemu-img.

The traditional API service will still be available for Ironic, as well as the conductor process, but they will be threaded. The Ironic project decided that because our overall model was overall not impacted by these changes, that it made the most sense to not try to maintain some level of backwards compatibility where eventlet could continue to be used. The new model, from our early benchmarks does appear to be similar or even more performant, although we are under no allusions that we may find issues moving forward related to these changes, but those issues will need to be worked as they are discovered.

At the end of the day, we see this change keeping a similar operational profile and experience for the user. It is just they will notice it if they look at the process list.

### Operator Impact - Memory Usage

But when looking at a process list. Operators are very likely to notice an increased memory footprint.

There is not much we can really do about this, and we're sorry. But we'll try to explain.

In Linux, memory reported for an application is in one of two buckets: Virtual Size (VSZ), and Resident Set Size (RSS).

The KEY difference between the two is that the Virtual size represents what the application has allocated or mapped, but not necessarily used. The Resident Set Size is what is actually used for the application to operate.

Threaded applications often require more memory. Part of it is the thread stack for thread local memory needs. At the same time, open files or memory ranges across threads cause the the VSZ numbers for processes to increase in line with the size of the thread stack memory allocation size **and** the workload of the application. This is linear in nature, but does closely track with the threading and we identified this in our early benchmarks where we were not getting rid of old threads. We simply kept adding new threads until the overall application started to have performance problems. We worked with some other community developers to propose a new thread pool model which kept our thread counts in line, and ultimately our memory utilization under control. The downside of the entire model with a "launcher" and "service" process, is that each instance of such has a memory footprint and ends up with distinct independent copies.

The net result -- 10x increase in VSZ counts. 2-3x increase in the RSS counts. This will require operators to tune any memory constraints where they run Ironic in a Container or where they may be applying strict limits to the process runtime. At the same time, the process concurrency improvements are going to also result in a faster Ironic deployment, overall.

## Will I need to tune this newly threaded world?

As a project maintainer, we started this journey with an expectation that we would likely need to tune the threading model. Limit our number of threads. Add more capabilities to stop and resume work asynchronously! Who in their right mind would have 300 threads anyway! Turns out, we would! And it also turns out many applications already use a huge number of threads. Compare to a Slack client or Web Browser. Modern machines have thousands of running threads today which largely goes un-noticed.

So the short answer is you may not need to tune Ironic, unless you have extremely high concurrency and lots of slow responding BMCs. Another possibility is that your workload is intense and a conductor is overloaded. All of these scenarios are very situational, so we'll try our best to set some context.

A stock Ironic deployment in this should have approximately 30-40 threads running by default. This should account for power state synchronization and the various periodic tasks which trigger every on a regular basis. Ironic has, as an artifact of design, a thundering herd problem which can occur. Arne Wiebalck with CERN talks about this to an extent on [youtube](https://www.youtube.com/watch?v=awMFMZfQmBs&t=3s), but this tends to smooth out as time progresses.

This can compound if you turn on sensor data collection. And be made even worse is you have hosts which take a long period of time to respond. Ultimately, this does boil down to needing to know your situation. Moving forward, Ironic is going to also begin to sanity check some of the runtimes of work, and try to get into a habit of making suggestions in the logs as warnings for operators to evaluate tunable settings. Until then, we'll cover some of the key tunable options to be aware of.

### Setting \[conductor\]setting workers\_pool\_size

The Conductor configuration option, *workers_pool_size* is the total number of conductor workers which is divided into a reserved pool, for mission critical actions, and a normal workers pool. This directly impacts the maximum number of threads, but generally the hope is this value is good for most deployments and this should be only modified if the thread pool is running out of threads.

### Setting \[conductor\]periodic\_max\_workers

The conductor has an additional setting, *periodic_max_workers*, where it limits the number of concurrent works for periodic tasks. By default this is limited to 8 workers, and will also automatically reduce the power state workers if also modified. If you have a large fleet and you need to increase your parallelism for periodic actions, this is a good starting point.

### Setting \[conductor\]sync\_power\_state\_workers

The number of threads which are launched for synchronizing the power state is controlled by the *sync_power_state_workers* option. A constraint is that the *periodic_max_workers* setting must be at least the same value, otherwise the workers may be restricted. If you have slow responding Baseboard Management Controllers, you may want to increase these settings.

### Setting \[conductor\]sync\_power\_state\_interval

The interval, in seconds, between launching new attempts to check and synchronize the power state of remote hosts with the database. This option, by default, is set to every sixty seconds. While multiple sweeps cannot run at the same time, the default setting may be a bit aggressive for larger clusters.

### Setting \[sensor\_data\]workers

This is the maximum concurrency for sensor data collection by a conductor. Sensor data collection, depending on the management protocol or even the performance of the remote BMC, can wildly impact the overall performance of this process. For example, a single host may take 30-60 seconds to query overall. Obviously, if your collecting sensor data, you may want to increase the worker count, and appropriately set the frequency in which you collect sensor data.

### Timeout and Retry Settings

A trend we have seen over the years is some operators wish to avoid all possible failures by extending timeouts. This is extremely counter-intuitive because timeouts should generally be shorter, as each thread stuck waiting to timeout is a consumed thread. If your trying to tune, do take a look at your timeout settings and consider 30 seconds instead of 60 seconds. Consider less retries in general. 

## The Future Beyond Threading

As a project, we recognize we have two distinct challenges which threading helps, but also doesn't help. Blocking IO, and the thundering herd of periodic tasks.

Moving forward, we expect to take a more hybrid approach where we are using coroutines in threads to increase the parallelism upon which we perform certain actions like power state sync or sensor data collection.

For periodic tasks, we're likely to move to a model where we keep a list of delayed future actions which need to occur, and utilize a single periodic task to spawn these actions as follow-ups. That said, both of these changes are substantial changes beyond the removal of eventlet. In a weird sense, they are actually more complex changes to Ironic's architecture than just removing eventlet and getting threading as a side effect.

## Thanks

A special thanks goes to all of the Ironic contributors who have worked some long hours over this past development cycle to help ensure we can remove eventlet. We're almost there, and hopefully it will be gone in the next few weeks!

Also, special thanks goes to the current Eventlet maintainers and their active efforts to wind down Eventlet. You can learn more at their [Eventlet Removal](https://removal.eventlet.org/) website.
