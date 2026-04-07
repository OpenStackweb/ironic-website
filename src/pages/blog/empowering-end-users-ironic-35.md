---
templateKey: blog-post
title: Empowering End-Users in Ironic 35.0
author: Jay Faulkner
date: 2026-03-17T12:00:00.000Z
category:
  - label: Development Update
    id: category-A7fnZYrE9
---

Even when only considering its integration with OpenStack, Ironic has
multiple different customers at any given time. The admin who installs
and manages the conductors. The project managers who might online
hardware and configure nodes in Ironic. The end-users who provision
bare metal instances through Nova's compute API. In Ironic 35.0
(OpenStack 2026.1, Gazpacho), we made two major feature improvements
with one of those users in mind in particular: the end-user, by
empowering them with more options about how to configure their
instances at deploy time.
<!--more-->

## Autodetect Deploy Interface

The first of these user-facing features is our new autodetect deploy
interface. This permits changing the selected deployment method based
on image metadata. Previously, this was selected by node
configuration – by either an admin or a manager – and left entirely
out of the hands of the end-user. Now, by configuring nodes with the
autodetect deploy interface, we can enable end users to select what
deployment method they would like by choosing what image to deploy.

Detection is based off image metadata. The three interfaces that we
can support autodetection for today are bootc, ramdisk, and direct:
- *bootc* is selected when an OCI container is provided as the
  deployment image, and that OCI container does not contain a full
  disk image. This detection method will never trigger for Nova
  end-users, as OCI container urls are not supported for Nova
  deployment.
- *ramdisk* is selected when a Glance image is provided with
  `ironic_ramdisk=True` in the metadata. The autodetect interface then
  looks for additional metadata pointing to a boot iso or
  kernel/ramdisk pairing for boot.
- *direct* is the fallback deployment interface used when none of the
  others match.

If your nodes are configured today for direct deployment, you can
likely switch them to autodetect with no disruption.

Please see the [autodetect deploy interface documentation](https://docs.openstack.org/ironic/latest/admin/interfaces/deploy.html#autodetect-deploy) for more
specific information on how to configure this feature.

## Trait-based port scheduling

The second of these user-facing features is subtle, but powerful.
Previously, when provisioning nodes with a fully integrated OpenStack,
operators had few options as to how to map networks to ports or
portgroups – a simple match on physical_network. This is functional;
but static. Instead, we wanted to give end-users more
flexibility in how their virtual interfaces from Neutron are mapped
into a physical machine.

First, a short aside: what is a trait? Traits are a way for Nova to
track machines configured in a certain way. For instance, if you
configure a Nova flavor to have the property
`trait:HW_CPU_X86_AVX2=required`, virtual instances booted with that
flavor will be placed onto a hypervisor with AVX2-supporting CPUs. In
a similar way, Ironic uses custom traits to advertise different ways
that Ironic can configure a node to fulfill a flavor request.
Trait-based port scheduling is based on this concept: an admin can
configure a flavor to request a specific trait from Ironic which will
inform Ironic how you want your ports scheduled.

Configuration of trait-based port scheduling is performed via a YAML
config file, with each key correlating to a custom trait, and the
value is a list of rules to follow to build a mapping. For instance,
you could tell Ironic to `attach_port` when `network.tag="green" &&
port.physical_network="green"`.  Operators can also set a trait to use
when none are provided. Here is an example of a trait-based networking
configuration:

```yaml
CUSTOM_DIRECT_ATTACH_A_PURPLE_TO_STORAGE:
  actions:
    - action: attach_port
      filter: port.vendor == 'purple' && network.name == 'storage'
CUSTOM_BOND_GREEN_STORAGE_TO_STORAGE_BY_2:
  actions:
    - action: group_and_attach_ports
      filter: >-
        port.vendor == 'green' && port.category == 'storage'
        && ( network.name =~ 'storage' || network.tags =~ 'storage' )
      max_count: 2
      min_count: 2
```

This port scheduling goes a step further with the ability to assemble
dynamic portgroups. In Ironic, prior to Gazpacho, the only way to get
portgroups – ports bonded together using LACP or similar technology –
is to statically configure port groupings on a node. Now, with
trait-based scheduling, you can assemble portgroups on the fly based
on rulesets. For instance, not only could you attach green ports to
green physical networks from the previous example, but by using the
`group_and_attach_ports` action, you can have Ironic create a
portgroup on the fly based on the specified rules – including the
ability to fail processing if too few or too many ports would be
included in the portgroup.

For full details, see the [trait-based networking documentation](https://docs.openstack.org/ironic/latest/admin/trait-based-networking.html).

## Get started

Both the autodetect deploy interface and trait-based port scheduling
are available now in Ironic 35.0 as part of the OpenStack 2026.1
(Gazpacho) release. Together, they represent a meaningful step toward
giving end-users more control over how their bare metal instances are
configured, without requiring admin intervention. Check out the full
[Ironic 35.0 release notes](https://docs.openstack.org/releasenotes/ironic/2026.1.html)
for everything that's new in this release.
