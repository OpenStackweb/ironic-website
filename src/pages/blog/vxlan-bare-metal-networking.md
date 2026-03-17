---
templateKey: blog-post
title: "Ironic's Networking Evolution: Bringing VXLAN to Bare Metal"
author: Julia Kreger
date: 2026-03-02T10:00:00.000Z
category:
  - label: Development Update
    id: category-A7fnZYrE9
---

The Gazpacho development cycle (OpenStack 2026.1) brings VXLAN overlay networking support to Ironic bare metal nodes. This enables bare metal servers to participate in the same L2 broadcast domains as virtual machines, providing better network scalability and improved experience.

Sometimes customer calls start with what seems like a vision, but turns out to be a misunderstanding of project documentation. It can be hard to tell at first, but this time once we understood the customer's perception, we quickly realized it was a misunderstanding with a vision.

In the past, a contributor from a networking hardware vendor posted a patch to enable Ironic ports to have configuration set which was to influence the OVN VTEP Controller and enable binding on remote devices. Once the project realized the scope and mode, we quickly backed out that change, yet as was once said, the die was cast. The idea of using Ironic nodes with VXLAN had been seeded into the universe.

And, it is not as if it is a bad idea. The biggest challenge large scale operators of sovereign clouds face is the management of the physical and the resulting logical networks and providing enough tools to address the bottlenecks as they are found. One of the biggest challenges with "classical" logical network management using VLANs is just the restricted number of logical networks (4096) which is due to the design of VLAN utilizing ethernet packet headers. This quickly grows into management of root switch bridges, spanning tree, and so on and so forth. Complex networks twenty years ago maybe had a few hundred VLANs, yet the proliferation of virtualization has driven the average enterprise's networking needs to the limits. Mix in scaled workloads, and traditional means of traffic management also no longer scale. This led to VXLAN being developed and it is the logical path forward for even mid-size cloud operators needing better network scalability.

For virtualization heavy environments, it made a lot of sense to just enable your workloads to have "virtual overlay" networks, and then map those virtual networks to the physical networks as needed. Soon hypervisors automatically established and managed "overlay" networking between hypervisors and virtual machines benefited by what becomes perceived as a limitless number of networks.

Where this gets "fun" and "interesting" is with Bare Metal and Ironic. My customer sought to put baremetal nodes into the same L2 broadcast domain of the virtual "overlay" network. Their perception was that because we had the one misleading feature, that we had generalized support. But with all things networking, the details can be nuanced.

Historically Ironic has had support for two basic networking approaches. The first is called `flat`, although it really is more "static" in nature because the cabling and port associations are all statically configured in an environment and the most advanced configuration case you may really leverage is routed spine-leaf handling of traffic. The second approach is the `neutron` network interface, which supports dynamic networking and the attachment of VLANs to bare metal nodes under Ironic's management.

Except, there is a limit to the number of VLANs on any given physical network. This VXLAN feature is not immune to the limitation even with its 16 million possible networks, but the odds of trying to operate 4096 networks on any single given physical device are also fairly minimal. A pragmatic approach was obviously required.

And so we got to work in the Ironic project and began to collaborate with cloud operators in the upstream project to come up with a solution to bring bare metal nodes to VXLAN networks. A few months later, we've merged a new mechanism driver called `baremetal-l2vni` into the networking-baremetal project, initial switch driver updates to enable VNI binding for logical switch devices into the networking-generic-switch project, and had even managed to get some initial testing in place.

## What This Enables

This capability allows operators to place both virtual machines and bare metal instances on the same Geneve or VXLAN tenant networks. Previously, operators were limited to either setting a default tenant network type of "vlan" or manually creating and managing provider networks of type VLAN to facilitate bare metal node attachments. With VXLAN support, operators gain improved multi-tenant isolation at scale and dynamic network provisioning for bare metal nodes, removing the manual overhead of provider network management.

## How It Works

In this model, Neutron Networker nodes (nodes which bridge networks and provide routing services through the bridging of the northbound and southbound database context of OVN) are able to attach Geneve and VXLAN networks to VLAN segments which are able to flow over a physical port and be translated across to the VXLAN network.

The switches leverage their ASICs to do the packet encapsulation and decapsulation work, enabling efficient traffic flows over the network. This hardware-accelerated translation means the performance impact is minimal while maintaining the flexibility of overlay networking.

The overall model enables switches to register the VXLAN VNI they require and allows traffic to be efficiently routed over the physical network. The same lower VLAN segment gets utilized on the remote switch which is then bound to only the VXLAN VNI and to the requested physical ports.

Effectively, VXLAN overlay becomes a giant cross-connect panel, allowing efficient and dynamic communication between a virtual machine and a bare metal node somewhere in a larger VXLAN enabled network fabric.

## What's Next

While we're not "done", this next development cycle we'll shift gears to testing individual switches and their configuration. This may mean we identify some areas to improve or refine further, and hopefully will result in more verbose documentation as we go in case you decide you want to treat your DPU as a switch, or do some other sort of extended configuration. Our implementation expects VXLAN configurations to utilize BGP EVPN "ingress-replication" of type-2 routes, though we may extend support to multicast-style VXLAN configurations in the future. There is also an effort underway in Neutron to connect BGP Ethernet VPN tunneling to facilitate VXLAN connectivity. We expect our existing work to be compatible and largely just give operators the ability to choose the approach which makes the most sense for their environment, once that Neutron functionality is available.

## Try It Out

This VXLAN functionality focuses on the switch-side networking attachments to VXLAN networks. Complementing this work, the Gazpacho cycle also brings Trait Based Networking decisions, which drive the early determination of VIF to Interface mapping - determining which interface should be used for network attachment. Together, these capabilities provide operators with greater flexibility in both interface selection and network attachments for advanced networking configurations.

This functionality is designed for fully integrated OpenStack deployments and requires Neutron. It is not currently applicable to standalone or Metal3 use cases.

Both networking-baremetal 8.0.0 and networking-generic-switch 9.0.0 are required for this functionality. The networking-generic-switch ML2 driver handles VNI management as ports are plugged and unplugged, ensuring the ML2 driver is aware of the flow, logic, and binding segment data necessary to facilitate network attachment.

If you're a vendor with a custom ML2 plugin and want to add support for VXLAN bare metal attachments, we'd be happy to collaborate on implementing the port attach and detach flows for your specific driver. Please reach out to the Ironic project!

We encourage operators to test this in their environments and provide feedback. Your individual configuration might be a little different or have a different model, and that is okay. We're up for patches and more collaboration as this is Open Source!

For more details, see:
- [VXLAN networking in Ironic](https://docs.openstack.org/ironic/latest/admin/vxlan.html)
- [networking-baremetal documentation](https://docs.openstack.org/networking-baremetal/latest/)
- [networking-generic-switch documentation](https://docs.openstack.org/networking-generic-switch/latest/)

## Get Involved

Have questions or want to discuss VXLAN networking for bare metal? Join us in #openstack-ironic on irc.oftc.net or reach out on the openstack-discuss mailing list. We're always happy to help operators get started or collaborate on extending support to additional switch vendors and ML2 plugins!

## Acknowledgments

Special thanks goes to Doug Goldstein with Rackspace for being an awesome community partner and helping push forward the VXLAN functionality.
