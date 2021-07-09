---
templateKey: blog-post
title: Performance Update
author: Julia Kreger
date: 2021-07-09T22:00:00.000Z
category:
  - label: Development Update
    id: category-A7fnZYrE9
---

## What a Journey ##

When I started out on a journey of trying to improve the performance of ironic a few months ago, the journey ended up taking a bit of a different path from what I expected. But I can now say with confidence, because all of the patches have merged and even backported to our "Wallaby" release, that we've made Ironic faster.

The path was similar to what was expected, but half of the effort became building consensus and sharing context. Plus, very verbose notes in code *do* tend to help. Along this path, we also learned some new aspects, and were able to incorporate changes to hopefully improve the overall situation for most operators.

### Where can I get this?! ###

* Expect this in Ironic 18.1 or Ironic 19 (Xena) (whichever ends up being the next release).
* Alternatively, Ironic 17.0.4 (Wallaby) since we backported most of the changes, and you can manually add database indexes if you need them.

If you need some of these patches backported to older releases, join on us irc.oftc.net in #openstack-ironic and let us know.

### Where did we end up? ###

Overall, we have been able to reduce the time it took to download our sample data by 82% and improve the number of nodes returned per second to consumers like Nova who request lists of nodes with distinct fields in excess of 630% from our very first performance test measurements of Ironic while in the process of exploring performance bottlenecks and how to address them.

This whole effort challenged how we approached operations with node lists.
<br>
* Additional database indexes
* Improvements to how we sanitize nodes
* Improvements to how we handle the access control context when lists of nodes are being handled.
* Removal of excess work from the Database, and Database client
<br>
These changes show an increadible performance improvement over Ironic 17.0 which was released before we started this effort to improve performance.
<br>

![Graph of database and api nodes returned per second via the Ironic API"](/img/blog-performance-update.png)

### One size, does not fit everyone ###

Ironic fulfills the needs of several different use cases. From a Systems Administrator just needing to deploy the same OS image to a number of machines in fairly rapid order. To software deploying specialized ramdisk images and configuration such as those that may be used to stand up a small private cloud. To the largest and most complex deployments where Ironic powers the management of all Bare Metal nodes and resources within an organization.

Not only does the scale differ, but so do the usage patterns, and ultimately the resources required to continue to manage a dynamic Bare Metal cloud. In this exercise, this was something we came to learn with our code.

We treated database queries as one size fits all, and to put it blunt, they cannot be treated as such. Without writing more on the subject than anyone would want to read, there are trade-offs. Ironic now attempts to leverage the trade-off when lists of nodes are being requested which *should* improve general node list performance. The trade off being in those cases, Ironic will no longer use a database join to pull in a composite field for a node. This is because that join was actually triggering additional overhead in the SQL client as the result set was being downloaded and converted for use by the program. Basic performance testing shows this change to be on-par with when we utilzied joins, but it should help operators who use one or more node traits assigned to a node.

## Next Step ##

Now that we have have some awesome performance improvement merged to Ironic, there are obviously several future steps we *can* take. Only time will tell if we *will* take them.
<br>
* Make **chassis_uuid** use a join - Presently, explicitly asking for a node's chassis_uuid is kind of slow. Unfortunately this is an object model change and cannot be backported.
* Make **allocation_uuid** use a join - Explicitly asking for an allocation, also causes some additional overhead query. Unfortunately, this is also an object model change and cannot be backported.
* Improve Nova's interaction with nova.virt.ironic - This is not explicitly in Ironic, but the driver for Ironic in nova is subjected to some calls internally that make sense when your nova-compute service is a hypervisor, and not a transport through to Ironic. Specifically [bug 1923955](https://bugs.launchpad.net/nova/+bug/1933955) is one of those cases. We believe this can use the internal cache.
* We may explore our periodic task handling, but at present this does not feel like it would have much of an operational gain for users of Ironic.
<br>
If your hoping to see a performance improvement when retreiving the managing conductor for each node via the API, I wouldn't expect that unless we consider additional data model changes. But if you have a use case, please bring it to our attention and maybe it will inspire us!

Feel free to join us in #openstack-ironic on irc.oftc.net if you have any questions!
