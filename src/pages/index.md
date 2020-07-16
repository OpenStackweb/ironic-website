---
templateKey: index-page
seo:
  description: Ironic Bare Metal as a Service
  image: /img/og-image.jpg
  title: Home
  twitterUsername: "@openstack"
  url: "https://ironicbaremetal.org/"
header:
  bottomtext:
    title: 15.1.0 release available now
    link: "https://docs.openstack.org/releasenotes/ironic/unreleased.html#relnotes-15-1-0"
    linktext: See the release notes
  buttons:
    - link: "https://docs.openstack.org/bifrost/latest/install/index.html"
      text: Get Started with Bifrost
  display: true
  subTitle:
    - text: Ironic is an open source project that fully manages bare metal infrastructure. It discovers bare-metal nodes, catalog them in a management database, and manage the entire server lifecycle including enrolling, provisioning, maintenance, and decommissioning.
  title: Bare Metal as a Service
mainpitch:
  description:
    - text: >
        Ironic allows operators to provision bare metal machines instead of virtual machines. It provides generic drivers ("interfaces") that support standards like IPMI and Redfish, used to manage any type of bare metal machine, no matter the brand. At the same time, it's officially supported by different vendors that help maintain not only the Ironic code-base, but also their own interfaces included in the Ironic code to provide full compatibility with their specific features.
    - text: >
        Ironic is developed in Python, it is open source, and it uses gerrit for code review. To ensure reliability of the code, Ironic uses the powerful Zuul CI engine tool to run the basic unit and functional tests, and also to simulate bare metal machines using advanced virtualization techniques to be able to run more complex tests with different deployment scenarios, including upgrades and multinode environments.
    - text: >
        Ironic has evolved and grown since it was "just" a way to provide bare metal machines to OpenStack users, finding ways to effectively become a standalone bare metal as a service system, capable of providing the same features as a full hardware management application.
  display: true
  title: How Ironic Helps
promo:
  title: Want to learn more?
  description:
    - text: >
        Read the latest white paper "Building the Future on Bare Metal, How Ironic Delivers Abstraction and Automation using Open Source Infrastructure"
  button:
    - link: "//www.openstack.org/bare-metal/white-paper"
      text: Read the white paper
  display: true
features:
  display: true
  rows:
    - text: >
        From the initial enrollment to the final decommissioning, Ironic manages the whole lifecycle of a bare metal machine. Ironic provides operators a complete view into hardware, as well as a set of extensible preparation actions, before workloads are assigned to it.
      title: Automated Lifecycle Management
    - text: >
        A consistent API layer enables vendor differences to be abstracted from users, and provides a simple interface to deploy and undeploy machines. These operations interact with the automated lifecycle management so one never has to remember to clean up a machine again.
      title: API Driven Deployment
    - text: >
        Ironic features the notion of hardware ownership and leasing, allowing splitting the whole cluster into non-overlapping pools of hardware. Thanks to the optional integration with the OpenStack Networking service, Ironic is capable of networking hardware orchestration allowing physically isolating workloads from different users.
      title: Multi-tenant Access
    - text: >
        A modular and scalable footprint, which enables the same interface and tooling regardless if you are managing tens, hundreds, or even thousands of physical machines.
      title: Scalable Footprint
    - text: >-
        Concepts are available to users to allow entry and tracking of hardware from procurement processes and then allocate them to specific groups of users via their project.
      title: Procurement & Resource Allocation
  title: Features
review:
  bottom:
    text: Interested in highlighting your usage?
    button:
      text: Contact Us
      link: "#"
  display: true
  opinions:
    - company: Company
      opinion: >
        This is a quote from one of the project's users. Ideally, we will have
        something like this, with substance, to validate the claim that this
        brand name uses and likes the project if we don't have a logo
      person: John Doe
      title: Title
    - company: Company
      opinion: >
        This is a quote from one of the project's users. Ideally, we will have
        something like this, with substance, to validate the claim that this
        brand name uses and likes the project if we don't have a logo
      person: John Doe
      title: Title
    - company: Company
      opinion: >
        This is a quote from one of the project's users. Ideally, we will have
        something like this, with substance, to validate the claim that this
        brand name uses and likes the project if we don't have a logo
      person: John Doe
      title: Title
  text: >
    What's the quickest way to give a project the perception of credibility?
    Tell the reader that people (or organizations) they know are already using
    it. The most effective way to do that is with logos, but if logos aren't
    available we can use text.
  title: "Users show credibility, without logos"
---
