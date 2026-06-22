# Cypress TypeScript Framework Agent Skills - Onboarding Guide

## Skill Set

| Skill | Purpose |
|-------|---------|
| `explore` | Explore a live application and capture selectors, screenshots, UI states, and gaps |
| `generate-tests` | Create exactly 30 structured manual test cases from requirements/context |
| `build-scripts` | Convert approved test cases into Cypress TypeScript automation files |
| `run-ready-framework` | Verify the final framework is cloneable and runnable |
| `heal` | Repair broken selectors or locator lines after UI changes |

## Recommended Read Order

1. `CLAUDE.md`
2. `docs/onboarding-guide.md`
3. `docs/app-context.md`
4. `standards/cypress-typescript-standards.md`
5. `build-scripts/SKILL.md`
6. `run-ready-framework/SKILL.md`
7. GitHub workflow skill, when repository operations are required
8. Static framework files from `StaticFrameworks/cypress-typescript`
9. Approved test cases, exploration findings, and existing target repo files

## Expected User Outcome

After generated automation is pushed, the user can clone the repo, install dependencies, configure environment variables, and run:

```bash
npx cypress run --env grepTags=@smoke
```

## Repository Split

Agent_Skills owns generation intelligence: prompts, standards, output contracts, and validation rules.
StaticFrameworks owns runnable assets: configs, base classes, utilities, reporters, and test data templates.
Generated target repositories must contain runnable framework files and must not depend on Agent_Skills at runtime.
