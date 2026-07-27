---
templateKey: blog-post
title: RISC-V and Ironic
author: Julia Kreger
date: 2026-07-20T12:00:00.000Z
category:
  - label: Development Update
    id: category-A7fnZYrE9
---

Recently, the question of RISC-V support has been coming up quite a
bit. Understandably, there is a lot of ecosystem interest because not
only does RISC-V offer the possibility of avoiding the legacy CPU
manufacturers in the name of sovereignty, but it also offers a path to processor designs which
are license fee free which can reduce costs. Combined in time
sharing microchip fabrication facilities, and the power of design and
fabrication automation lowering costs, we're quickly heading towards
a world where the status quo that we have expected as it relates to
server hardware becomes harder to maintain. But we're not here to
preach design, or even largely forecast what we see. Although we can
see the shift already starting.
<!--more-->

## Ironic's Architecture Support

Ironic has long supported multiple architectures, but that has
largely come with two expectations. The first being that you supply
the needful configuration to delineate any bootloader and boot artifacts.
The second being there is some way to manage or control the physical
host. The bar on management has historically been very low along the
lines of "be able to control power" through some sort of management
device. But these are just the most simplified path and largely what
actual infrastructure operators need is the ability to reset the
device. In Ironic we call this phase cleaning, and while out of the
box we limit this to storage, we fundamentally drive this process
through booting a cleaning ramdisk on the remote host.

We have long done this on x86, Power, and even ARM hardware which
supports the ability to signal and manage boot devices. This is where
things with RISC-V are heading into an unknown.

## The Redfish Standard

Ironic as a project has largely standardized around DMTF Redfish, to
the point where Ironic project members actively engage with the Redfish
Forum to advance the specification for the common good. The risk of sorts with
RISC-V is an attempt to drive only towards embedded use models. Think
which slot to boot from out of flash RAM, and not what block device
to use, or if the device should *instead* boot to the network or
even virtual media. Slots on a chip are fine for embedded devices,
but in the world of enterprise hardware it will be a drastically
different model from what operators are used to if the machines
do not follow the same exact patterns set forward on other major
modern platforms.

While we're not even opposed if someone who wants to resurrect
SNMP power strip drivers, or even develop a lightweight RISC-V
support/management model, the enterprise ecosystem is going to
expect more. We absolutely don't want to discourage the efforts
of RISC-V, we just want to see the ecosystem reach parity.
Something which took ARM hardware in enterprise environments a
number of years.

## Call to Action

As a call to action, the Ironic project would recommend the
following:

1. **Full power control** - Be able to take the power away from the
   RISC-V system and verify that it is off, and ultimately be able
   to turn it back on and verify the power is on.
2. **Network boot signaling** - An ability to signal via a remote
   API that the device should boot from a network device.
3. **Remote firmware settings control** - This is huge because the
   more specifics which get encoded under the hood, for example how
   interrupts are handled by the motherboard, the more operators
   with highly specific workloads will want to tune the behavior of
   the hardware. Bonus points for device firmware management.
4. **Virtual media support** - Some sort of ability to attach
   virtual media to boot from virtual media instead of via a
   network. After all, virtual media is far more secure and the
   model typically used by hardware vendors today is the presentation
   of a bootable USB device which the host boots from on next power on.
5. **No serial console dependency** - Don't expect a user to touch
   the serial console of the host, or even be permitted to do so.
   Often this level of access is highly restricted and many operators
   expect to be able to view a "graphical" console. This is something
   we may be able to assist with, but to boot or interact with the
   device, we need to stay away from the console. Touching the
   console should only be for troubleshooting.

This is just a short list of things which would help the RISC-V
ecosystem gain adoption with Ironic operators and end users in enterprise
use cases. That is not to say if it was possible to support a model where
a device always network boots, that is fine, but the enterprise
expectations will always seek to match x86 and Arm capabilities they
have today.
