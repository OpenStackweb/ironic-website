---
templateKey: blog-post
title: What is after BIOS?
author: Julia Kreger
date: 2022-04-04T20:00:00.000Z
category:
  - label: Development Updates
    id: category-A7fnZYrE9
---

Every six months or so, the Ironic project community meets to discuss current and new topics of interest. We call this the [Project Teams Gathering](https://ptg.opendev.org/). This time serves as a time for many projects to gather and have the important discussions, some of which may overlap into other projects, or may impact or affect numerous projects. Regardless if a project treats the Projects Teams Gathering as a formal event, or a set of hallway track style discussions, often we keep notes, and we try to bring others into the discussion. It is part of our community's culture.

And today, an interesting topic came up when we were performing our retrospective:)What is (life) after BIOS?

When we say BIOS, we can mean many *different* things. In this case, we're referring to BIOS booting. Most often referred to as "Legacy BIOS" booting.

[Legacy BIOS booting](https://en.wikipedia.org/wiki/BIOS#Boot_process) is the way computers, specifically [IBM PC](https://en.wikipedia.org/wiki/IBM_Personal_Computer) and compatible systems started at power-on which proceeded from basic device initialization, firmware loading, and then initiation of the operating system boot using a Master Boot record on a storage device, which then redirects to a boot loader, which then may load an Operating System kernel, such as Linux, which is then able to launch the rest of the operating system.

Much of this works through special locations identified and expected on disk, but not through an understanding of the contents. Which means if you accidently deleted a critical file, and then restored it without rebooting, the likelihood your computer would no longer boot was quite high. Given much of this technology was rooted in fundamentals started in the 1980s, much room for improvement followed.

But for those of you that don't remember those days, think of how to start an operating system with 1 megabyte of address space.

##UEFI is now##

The [Unified Extensible Firmware Interface](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface), better known as UEFI, was the answer. While initial work in replacing Legacy BIOS booting started in the late 1990s, it did not pick up steam and adoption until 2010-2020. This spread not only to technology based on the Intel x86 architecture, but also similarly in the ARM architectures as well, and is seeing further extension to additional architecture because there are far more advantages to this mode of booting. No more 1MB memory limitation, and now in theory you could boot Linux inside of your EFI pre-boot environment before you boot your final Linux kernel.

Frightening right?

Well, don't worry! It is actually possible to boot a system from an EFI shell, or explore the contents on disk to discover what exactly is going on. And if your lucky, you may have some graphical tools available as well before your computer is even running an operating system. Plus! Aspects like Secure boot are further baked into the system, as opposed to the predecessor [Trusted Boot](https://wiki.gentoo.org/wiki/Trusted_Boot).

##Why does this matter with Ironic?##

One of the things the Ironic community is sensitive to is changes in the Server hardware marketplace. Ironic is used by hardware and software vendors to deploy their solutions for their clients much as a cloud operator deploys workloads. So when a vendor like [Intel announces they are going to stop supporting Legacy BIOS](https://uefi.org/sites/default/files/resources/Brian_Richardson_Intel_Final.pdf) boot, we take notice. Except it didn't happen quite as rapidly as Intel proposed.

During the Wallaby development cycle (1st half, 2021), some Ironic cores finally started to see cases where users were interacting with brand new Data Center server platforms where Legacy BIOS boot was no longer a feature. Where you couldn't boot to it, but maybe you could still invoke the 20h interrupt to attempt to load Option Roms from hardware... where that might freeze the system. It was an interesting few months to say the least, yet the consensus was reached that "Time to default Ironic to UEFI" had come.

And so in the Yoga release of OpenStack Ironic, the default was switched.

And now the quest is onward!

##So what is next?##

While I'm sure many would prefer to have crystal balls and be able to make sense of the long term plans of the community, we just don't have such magical power. What we do have is foundations of technology upon which we can build the next evolution.

And [emerging work](https://twitter.com/qrs/status/1496908435488755724) by [Trammell Hudson](https://twitter.com/qrs) may be a path we should explore. An in-UEFI Ironic Agent able to deploy and then boot to an operating system without a reboot would be an amazing feat, and I personally think it would be an excellent project goal. Think of all of the possibilities! While, we might not be able to *entirely* rely upon it for aspects quickly like cleaning or full introspection, we may be able to one day.

And then there are additional CPU architectures, but it would mean a lot for the community if operators interested would be willing to help enable hardware access. Even if the possibility or hope is raised to the community, it becomes context to drive us. A mission to take on. A barrier to scale!

And there is the old conundrum of the computer, inside of the computer. We *once* viewed this as devices with firmware, but now entire operatings systems can live on a card and do distinct work. Hopefully, forward progress will be ma
de here so we can do the needful, and enable the automation of even more infrastructure.
