---
templateKey: blog-post
title: A Lesson Learned Under Stress
author: Julia Kreger
date: 2026-05-05T12:00:00.000Z
category:
  - label: Development Update
    id: category-A7fnZYrE9
---

Sometimes we all seek to move as quickly as possible to address an
urgent issue.

But, sometimes that is not always the best course of action. Sometimes
the best course of action is to take a breath, take a step back, and
look at the big picture. Otherwise, we risk making more mistakes.
<!--more-->

The Ironic project recently found its Continuous Integration testing
broken on a Monday morning. In research, we found that Glance was now
rejecting our test job scripting from uploading kernels and ramdisks.
We were obviously, concerned, frustrated, alarmed, upset. After all,
this was also first thing Monday morning! All this because we were
uploading our kernel and ramdisk artifacts with a `container_format`
of `bare` and a `disk_format` of `raw`. But, that was wrong.

In the second half of 2024, Ironic contributors -- as well as much of
the OpenStack community -- had major image-security related
vulnerabilities. Working these problems in secret, as these major
issues require, can cause normal communication channels to break down.
Sometime during this confusion, we don't remember where or how,
we were told our usage of Glance was wrong. So we worked to remedy it
by updating our documentation around usage patterns.

In hindsight, now we know that information was out of context --
and the CI failure Monday morning confirms it.

We rushed when we should have taken a step backwards. We changed our
documentation and gave bad guidance because we were trying to rush.
And while this issue is only about documentation, the overall lesson
to Ironic contributors is "stop, take a breath, understand; then act."

In summary: If you're using Glance for your kernel and ramdisk
artifacts, the proper container and disk format for the kernel is
`aki`, and for the ramdisk, `ari`.

Operating Ironic can be difficult sometimes, and it's even worse when
the contributors themselves are confused about the right thing to do.
Sorry to anyone who is having to update processes twice in a row.
Ironic will take this as a reminder to slow down, even when dealing
with a security issue.
