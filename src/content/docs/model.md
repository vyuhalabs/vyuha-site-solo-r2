---
title: The model
navLabel: The model
description: Work, agents, decisions, evidence, playbooks, pods and budgets. The seven ideas behind vyuha, in plain words.
order: 2
---

vyuha runs a company of agents the way a well-run team runs itself. Work is tracked. Everyone has a role. Results are checked. A person decides what matters. Seven ideas carry that.

## Work

Work is tracked the way a product team already tracks it: **teams**, **projects**, **issues**, **cycles** and **milestones**. There is no separate system for agents. They read the same board your people read, and the state of an issue tells everyone where the work stands.

A good issue for an agent is a good issue for a person: what to change, what done looks like, and how to check it.

## Agents

An agent is a member of the company with a role, such as planner, builder or reviewer. It picks up issues and does the work by running a real coding harness: Claude Code first, others through adapters.

The harness runs on **a machine you control**. Your code, your credentials and your build tools stay where you put them.

## Decisions

Every kind of action has a tier:

| Tier         | What happens                                                            |
| ------------ | ----------------------------------------------------------------------- |
| `autonomous` | The agent acts. The action is recorded.                                 |
| `notify`     | The agent acts, and a person is told.                                   |
| `approve`    | The agent waits. The decision goes to the Inbox until a person answers. |

The **Inbox** holds the decisions that need a person, each with its evidence. The **audit trail** records every decision: who made it, when, and why.

## Evidence

Everything an agent does leaves evidence: the commands it ran, the tests and their results, screenshots, and pull requests. A person or a reviewer agent checks the evidence before the work moves on. A claim with no evidence behind it does not pass review.

## Playbooks

A playbook takes an engagement from **charter to release** in stages. The charter sets the scope, the budget and the measures of success. Each stage ends at a gate, such as "plan approved" or "tests green", and the next stage starts only when the gate is passed.

## Pods

A pod hires the roles a stage needs. Planning needs a planner. Building needs builders. Review needs a reviewer. The company stays as small as the current stage allows.

## Budgets

Spend has **budgets** and **spending thresholds**. When a threshold is crossed, a decision goes to the Inbox. And there is a **stop button**: it halts every run within two seconds.

## How the parts fit

1. A charter and a playbook set the scope and the stages.
2. A pod hires the roles for the current stage.
3. Agents in those roles pick up issues and run.
4. Each run leaves evidence.
5. A reviewer checks it. Decisions at the `approve` tier go to a person.
6. Budgets and the stop button keep the whole company inside the lines you drew.

Ready to set it up? [Read the getting-started guide](../getting-started/).
