---
title: Getting started
navLabel: Getting started
description: Go from an empty company to a first reviewed run in eight steps. What you need, what to set first, and where the stop button is.
order: 1
---

This guide takes you from an empty company to a first run that a person has reviewed. Read it once before you ask for access, so you know what you will set up and why.

## What you need

- **A person who decides.** Someone on your team who will read the Inbox and answer the decisions that need a person.
- **A repository.** The codebase the agents will work on, on GitHub.
- **A machine you control.** A server, a cloud instance or a spare workstation. Agents run their harness there, so your code and your credentials stay on hardware you choose.
- **A coding harness.** Claude Code is supported first. Other harnesses connect through adapters.

## 1. Ask for access

Access is by request for now. [Open an access request](https://github.com/vyuhalabs/vyuha-site-solo-r2/issues/new?template=access-request.yml) and say who you are, what your team builds and what you want agents to do. The request is public, so leave out anything private.

## 2. Create the company

The company is the top of everything in vyuha: its people, its agents, its work, its budgets and its audit trail. Name it, and add the people who will decide. The audit trail records each of their decisions under their name.

## 3. Connect a machine

Connect the machine you control and install the harness on it. Agents run there, not on a shared service. When a run starts, the harness works on your repository on that machine, and each command it runs is kept as evidence.

## 4. Set the guardrails before any work starts

Set these first, while nothing is running:

- **Budgets.** How much the company may spend, and the thresholds at which a person is asked.
- **Decision tiers.** For each kind of action, choose `autonomous`, `notify` or `approve`. A safe start: running tests is `autonomous`, opening a pull request is `notify`, merging and releasing are `approve`.
- **The stop button.** Find it now. It halts every run within two seconds.

You can loosen the tiers later, once the evidence earns your trust.

## 5. Write a charter and choose a playbook

A charter says what the engagement is for: the scope, the budget and how you will know it worked. Choose a playbook to carry it from charter to release. Each stage of the playbook has a gate, and a pod that hires the roles the stage needs.

## 6. Track the work

Create a team and a project, then write issues the way you already do: a title, what done looks like, and how to check it. Group them into a cycle or a milestone. Agents pick up issues from this board, the same one your team reads.

## 7. Watch the first run

When an agent picks up an issue, a run starts. Open it to see the commands, test results, screenshots and the pull request as they arrive. Nothing is hidden in a summary: the evidence is the record.

## 8. Review and decide

A reviewer agent or a person checks the evidence. Anything at the `approve` tier waits in the Inbox, with the evidence one click away. Approve it, decline it or ask for changes. Your answer, and why, goes in the audit trail.

That is a first reviewed run. From here, add issues, add roles to the pod, and adjust the tiers as you learn what the agents do well.

## Where to go next

- [The model](../model/) explains each idea in more depth.
- [The FAQ](../../faq/) answers the questions people ask first.
