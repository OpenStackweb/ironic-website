---
templateKey: default-page
seo:
  description: "Integrations for Ironic Bare Metal"
  title: Ironic Bare Metal Integrations
  twitterUsername: "@openstack"
  url: "https://ironicbaremetal.org/"
title: Integrations
subTitle: "Ironic project Integrations and Tools"
---

The Ironic project has a long history of being driven by Cloud and Infrastruture operators seeking to solve their problems. This has resulted in a diverse set of capabilities, integrations, and ways to leverage ironic.

<br>

## Community Projects with Integration

This is a list of community projects which feature or leverage Ironic in order to deploy Bare Metal to meet the needs of infrastucture operators and ultimately end users. Some of these projects have commercial versions or offerings from vendors, however this list is restricted to "Community" only.

- **Bifrost:** <https://docs.openstack.org/bifrost/latest/install/index.html> - An Ansible based toolkit to setup Ironic, and orchestrate Bare Metal provisioning with Playbooks!
- **TripleO:** <https://docs.openstack.org/project-deploy-guide/tripleo-docs/latest/> - A toolkit and suite of projects which use Ironic to deploy the Bare Metal and offer the ability to deploy Bare Metal as a Service level configurations. Able to be used to deploy an entire OpenStack cluster.
- **Kayobe:** <https://docs.openstack.org/kayobe/latest/> - A toolkit to deploy an OpenStack cluster using physical bare metal which leverages Ironic to perform Bare Metal deployment.
- **Metal³:** <https://metal3.io> - A toolkit to help facilitate bare metal machine deployment from with-in a Kubernetes deployment, leveraging Ironic in an an ephemeral design.
- **Airship:** <https://www.airshipit.org/> - A cloud orchustration toolkit which uses seamlessly integrates OpenStack, Kubernetes, Metal³, and ultimately Ironic.
- **StarlingX:** <https://www.starlingx.io> - A cloud infrastructure sotware stack which supports the deployment of workloads to Bare Metal using Ironic.
- **Nova:** <https://docs.openstack.org/nova/latest/admin/configuration/hypervisor-ironic.html> - The OpenStack Compute service, also known as Nova, supports using Ironic as a hypervisor in order to allow compute resource to request and deploy Bare Metal instances as opposed to virtual machine instances.

<br>

## Tools, & Other Useful Items

- **Metalsmith:** <https://docs.openstack.org/metalsmith/latest/> - A command line tool to schedule and deploy bare metal without additional services like OpenStack Nova or Placement.
- **Ansible Integration:** <https://github.com/openstack/ansible-collections-openstack> - How does Bifrost work?! It uses the *baremetal* and *baremetal_node* modules from the official OpenStack Ansible collection!
- **networking-ansible:** <https://opendev.org/x/networking-ansible> - Control your switches via Neutron ML2 and Ansible, to enable ironic bare metal nodes on specific tenant networks.
- **networking-generic-switch:** <https://opendev.org/openstack/networking-generic-switch> - Community developed [Neutron](https://docs.openstack.org/neutron/latest) ML2 driver for switch integration.
- **sushy:** <https://docs.openstack.org/sushy/latest/> - A lightweight python library for accessing Redfish BMCs, used by Ironic!

<br>

## Are we missing something?

If we're missing your integration, or you think we've forgotten about some awesome tool out there, don't worry. Feel free to propose a change to this document via [Github](https://github.com/OpenStackweb/ironic-website)!
