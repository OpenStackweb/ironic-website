---
templateKey: blog-post
title: Ironic 18.2
author: Julia Kreger
date: 2021-09-24T16:00:00.000Z
category:
  - label: Development Update
    id: category-A7fnZYrE9
---

## Xena Release ##

On Wednesday, September 22nd, 2021, the Ironic team released its OpenStack Project "Xena" cycle deliverable for Ironic as version 18.2.0.

For those who are not aware of how OpenStack branches are supported, this will be a stable branch which will be maintained for a period of time, as opposed to an Intermediate release by the Ironic project which may only see backports for a limited amount of time.

Overall the Xena development cycle consisted of over 22 new features to Ironic, and over 48 thousand lines of code having been modified.

<br>

## Notable Features, Fixes, and Changes ##

This list includes Ironic 18.2, 18.1, and 18.0.

* Parallel image downloads are now enabled by default.
* Event subscriptions can now be created on Redfish BMC's through the vendor pass-thru interface.
* *boot_mode* and *secure_boot* are now top level fields of a node which can enable easier management of these states. Some additional work into this should be expected as time goes forward. 
* Node History events are now recorded, and can be retrieved by the API. Expect CLI tools to be updated to have functionality for this early in the [OpenStack Yoga](https://releases.openstack.org/yoga/schedule.html) development cycle.
* PXE loaders can now be configured to copy files from the base operating system. You *must* specify this, as Ironic does ship defaults at this time. Look for *\[pxe\]loader_file_paths* in the configuration.
* The *anaconda* deploy_interface can now post configuration drives.
* Vendor specific *driver_info* parameters for items such as *deploy_kernel*, *deploy_ramdisk*, *deploy_iso*, and *rescue_iso* have been deprecated in favor of vendor-less parameter names.
* Performance issues when retrieving lists of nodes have largely been addressed. This was written about in prior blog posts, and should greatly help Nova integrated deployments.
* Bios setting registry fields are now available when retrieving the BIOS settings.
* A new *custom-agent* deploy interface can be used for instances where the agent provides **all** necessary deployment steps.
* Deprecation warnings for Secure RBAC related policy changes are now suppressed. This was largely because the larger OpenStack community was not able to implement delineated System and Project scoped rule sets before the end of the Wallaby development cycle, nor the now completed Xena cycle. At present all projects are not expected to be in a position to deprecate legacy rules until the end of the Yoga development cycle. Stay tuned!

<br>

Please remember to update your agent, or you will be missing the following features:

* *bmc_mac* is now stored in Introspection data.
* Disk, Network, CPU, and Memory burn in cleaning steps are now available for optional stress testing of these components. Special thanks goes to CERN for contributing these to the community.
* Bootloader CSV files for UEFI defaults can now be loaded from EFI partitions and used to set the appropriate bootloader. While this capability was backported to address operational issues being encountered by users, this is an important step as Ironic moves forward into the world of being UEFI native and UEFI being the default.

And more! Please review the [release notes](https://docs.openstack.org/releasenotes/ironic/xena.html) for even more detailed information.

## Where can I get it? ##

Ironic 18.2.0 can be downloaded from a variety of places:

* [PyPi](https://pypi.org/project/ironic/)
* [OpenDev](https://tarballs.opendev.org/openstack/ironic/)
* "git clone --branch stable/xena https://opendev.org/openstack/ironic.git"
* [RDO Project xena/stable repository (Untested)](https://trunk.rdoproject.org/centos8-xena/current/delorean.repo)
<br>

This blog post was written a few weeks prior to the official Xena release of OpenStack, so expect distribution packagers for OpenStack to pickup this version of Ironic as time moves forward.

## Looking Forward ##

Soon into the next (yoga) development cycle, the Ironic project expects to switch the default boot mode for *all* deployments to UEFI, if not otherwise already specified. We anticipate this default change to take place with future version 19.0.

Such a change *can* potentially be breaking for many deployments if they never specified a default previously, but it is far past-time for ironic to move away from a default of Legacy BIOS booting by default. We are not expecting to *remove* the support anytime soon, so operators will just be able to assert the *bios* default instead if they, or their hardware is not ready for this change.

<br>

## Questions? Want to help? ##

Feel free to join us in #openstack-ironic on irc.oftc.net if you have any questions!

Ironic also has its [Project Teams Gathering](http://lists.openstack.org/pipermail/openstack-discuss/2021-September/025033.html) upcoming during the week of October 18th, 2021.
