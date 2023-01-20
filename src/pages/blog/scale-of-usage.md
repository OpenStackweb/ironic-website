---
templateKey: blog-post
title: The scale of usage
description: About once a year, often in the beginning of the year, I receive a question to which I cannot really answer. Truthfully, it often comes from several avenues, and different organizations.
author: Julia Kreger
date: 2022-01-05T22:00:00.000Z
category:
  - label: Development Update
    id: category-A7fnZYrE9
---

## The Scale of (Ironic) Usage ##

About once a year, often in the beginning of the year, I receive a question to which I cannot really answer. Truthfully, it often comes from several avenues, and different organizations.

It is not that I don't know, we as a community do know... kind of. But there is a conundrum.

Open Source contributors representing firms cannot speak to many of the details because revealing the context behind discussions and associating them with individual's or organization's name is inappropriate unless they had explicitly granted permission. And even then, they are the exception to the rule which is to preserve the privacy of our customers and users. Those deeply engaged in a community build a relationship of trust, and some additional context gets conveyed. Lingo, or Jargon as it was once called, gets used. We paraphrase, re-scope, and obscure much when making our arguments for or against a given aspect. But we're all trying to do the right thing, for revealing the details is really, truly, in-appropriate.

Which is truly also kind of remisicent of a recent [GCC bug filing](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=95644#c4).
<br>
<br>
![The customer has nuclear weapons.  They do not "bounty". :)](/img/customer-has-nuclear-weapons.jpg)
<br>
Which sure seems like a similar conundrum, and establishing the context of who the customer happens to be.

## Artifact of infrastructure ##

The closer you get to lower layers of intrastructure, the more important it becomes. Also, the greater impact one can have should details make it into the eyes of those who would do harm.

Typically in communities, we can see the power lines, we might be able to figure out where the water lines are precisely, but the closer we get to those infrastructure centers, the more secretive or restrictive those environments need to be to ensure the service and security of the services being provided.

It is the same for cloud infrastructure operators, telecommunications providers, and even train operators. They provide a substrate service to meet the needs of their customers. Often, the customer never knows how the server got there. Or how their telephone call completed, or what drove the spike into the railroad track tie.

On some level, that is an implementation detail on a path.

## It is hard for vendors as well ##

It is also not the easiest thing for vendors who specialize in providing support or development services to even have these answers either. As an entity, they are bound by their agreements and consideration of the customer's privacy. Often reports and telemetry data, due to information security concerns, come from reproduction or internal test environments, and not actual production environments where an issue is being encountered which requires assistance or support. Ultimately, sometimes the hardest thing to wrap one's head around in these sorts of situations is that there is often not just a singular customer environment, but many.

Vendors are in a very similar place to the contributors. They serve as proxies for their customers at the end of the day.

## The end result ##

The result of this is a lack of a clear picture of usage. It is difficult to truly understand the users of any given piece of Open Source software.

But, we *can* piece together public context, and this is why the [OpenStack Baremetal Logo program](https://www.openstack.org/use-cases/bare-metal/) is helpful to the Ironic community. It helps highlight the firms which have an interest in the software. To join the program, each organization was required to submit their use case in how they use ironic. A number of them resulted in blog posts and stories. While this doesn't always result in explicit counts of number of servers, it is only the portion who actively stepped forward.

Another avenue for gauging interest and usage of an upstream project is through who contributes to the project itself. We don't necessarily have context into their usage or use case unless they speak of it publicly, but a commit from a firm may be be driven by any number of different drivers: Customer needs, Internal Need, Bugfixes from internal or external usage, Compelled need to fix a typo, or a friend just wanting to make sure they can have breakfast on occasion with another friend resulting in a pain point being fixed.

The following screen shots are from [Stackalytics](https://www.stackalytics.io/?module=ironic-group&metric=commits) conveying commits by companies over the current Yoga development cycle and the two prior development cycles.
<br>
<br>
![Yoga Commits - In-Progress](/img/yoga-in-progress-commits.jpg "Yoga Commits January 5th 2022")
<br>
![Xena Commits](/img/xena-commits.jpg "Xena Development Cycle Commits")
<br>
![Wallaby Commits](/img/wallaby-commits.jpg "Wallaby Development Cycle Commits")
<br>
Unfortunately, without diving into each and every single change and trying to determine the motivation behind each, it is difficult to discern the interest and driver.

And as humans, we tend to put more weight behind **direct** first person statements, especially when we begin to talk about a scale of use or a size of a deployment as direct statements from humans also generally have a scope in which they are spoken which helps convey the full context. This could be the question which prompted the response.

## I'm an infrastructure operator, How can we help? ##

There are multiple things **you can do** to help spread the word and context of usage. 

The first is to participate in the [OpenStack User Survey](https://www.openstack.org/user-survey). This helps provide the [Open Infrastructure Foundation](https://openinfra.dev/) information which helps put into focus the state of the ecosystem and it's usage.

The second way you can help is to engage the community directly and share your story. We have a [Bare Metal Special Interest Group](https://etherpad.opendev.org/p/bare-metal-sig) you can join and we will be happy to discuss topics, provide guidance, and this is the most effective path for feedback and context sharing directly to the developers.

The third, and path only for the most **brave** is to submit a blog post. If you can't share your story directly on our blog, we are always happy to share a link.
