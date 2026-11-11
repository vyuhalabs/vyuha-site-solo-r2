/** The seven parts of the model, in the order a reader meets them. */
export const MODEL = [
  {
    id: "work",
    name: "Work",
    text: "Teams, projects, issues, cycles and milestones: the way a product team already tracks work. Agents take work from the same board you use.",
  },
  {
    id: "agents",
    name: "Agents",
    text: "Each agent has a role and picks up issues. It runs a real coding harness, Claude Code first and others through adapters, on a machine you control.",
  },
  {
    id: "decisions",
    name: "Decisions",
    text: "Every kind of action has a tier: autonomous, notify or approve. The ones that need a person land in the Inbox.",
  },
  {
    id: "evidence",
    name: "Evidence",
    text: "A run keeps its commands, test results, screenshots and pull requests. A person or a reviewer agent checks them before work moves on.",
  },
  {
    id: "playbooks",
    name: "Playbooks",
    text: "A playbook takes an engagement from charter to release in stages, each with a gate it must pass.",
  },
  {
    id: "pods",
    name: "Pods",
    text: "A pod hires the roles a stage needs: a planner to plan, builders to build, a reviewer to check the evidence.",
  },
  {
    id: "budgets",
    name: "Budgets",
    text: "Spend has budgets and thresholds. Crossing one asks a person. The stop button halts every run within two seconds.",
  },
] as const;
