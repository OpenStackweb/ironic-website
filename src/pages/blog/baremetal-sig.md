---
templateKey: blog-post
title: Bare Metal SIG at OpenInfra Summit Berlin!
author: Julia Kreger
date: 2022-06-17T20:00:00.000Z
category:
  - label: Development Updates
    id: category-A7fnZYrE9
---
Just over a week ago, the Bare Metal SIG finally had it's first in-person meeting. That whole pandemic hindered a gathering for some time.

<br>

![Tweet from arne_wiebalck about this being the first in person sig meeting](/img/sig-in-person.png)

<br>

One attendee called it "intense".

<br>

![Tweet about the SIG being intense"](/img/sig-intense.png)

<br>

In retrospect, it was intense! The room, albeit oddly shaped, was full with approximately 46 attendees. Other related sessions such as [@arne_wiebalck](https://twitter.com/arne_wiebalck) talking about CERN's use of baremetal [node cleaning was also full](https://twitter.com/ashinclouds/status/1534118794796453890). And a surprising number of attendees were also present and engaged in other deep topics such as sustainability in the cloud, or to put it more precisely, making the cloud more sustainable. It was an amazing contrast from the last few years when the sig would only occassionally have larger number of attendees, but it is also important to remember we have all been occupied the last few years.<br>

One of the great things of chatting in person is that it helps facilitate the use of the same words much faster. Body language allows us to identify and refine statements on the fly. This is harder to do even on video calls.<br>

It also allows us to see visual queues where more information is needed, and really allowed us to dive deep into various areas to help spread context and information.<br>

In any event, it was both a refreshing and powerful experience because we were able to obtain some data points!

<br>
<br>
For Ironic operators present:
<br>
<br>
- 33% are using the `redfish` hardware type in production.<br>
- 17% are using a Neutron ML2 plugin for automating port plugging in switches.<br>
- 15% are using Deploy Steps! - We had no idea!<br>
- 8% are running a long lived bifrost deployment. Yes, we're fairly sure they read the documentation where we stated this was not recommended usage.<br>
- 8% are operating over a 1,000 nodes in production with Ironic.<br>
- 4% are leveraging Cinder integration.<br>
- 4% reported use of the "ansible" deployment interface.<br>
- 3% are operating over 10,000 baremetal nodes managed by Ironic in production.<br>
- 2% indicated they are enforcing Secure Boot.<br>
- 2% indicated they are using Metal3 to drive Ironic.<br>
<br>
<br>
One thing to keep in mind, when these gatherings occur and we're able to collect data from a random sampling of attendees at a conference, the data is skewed to the attendees who chose to be there.
<br>
<br>
<br>
A few observations:
<br><br>
- Increasing interest in ARM, and also a lack of readibly available knowledge in it's use. One familiar with multiple architectures stated "set the parameters, and it just worked", where as others indicated they struggled to find their way through dependencies such as the actual bootloader to use.<br><br>
- Some operators are finding some pain points in third party integrations around automation. The community likely needs to consider loosening some restrictions we've held as guiding principles, and some of the pain points which arose during the discussion were already known and in progress.<br><br>
- Larger operator need a means for information sharing. Not all of it is Ironic or ironic specific, a lot of it is just the complexity and intertwined dependencies which are outside of the project's ability to influence.<br>
<br><br>

Hopefully, soon in the future, we will be able to have the SIG meet again, perhaps at a future [Project Teams Gathering](https://openinfra.dev/ptg/)! In the mean time, please consider joining us virtually!
