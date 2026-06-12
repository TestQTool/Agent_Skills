# Playwright JS Agent Skills - Onboarding Guide

This repository contains prompt skills for generating, packaging, and healing Playwright JavaScript automation frameworks.

---

## Skill Set

| Skill | Purpose |
|-------|---------|
| `explore` | Explore a live application and capture selectors, screenshots, and flows |
| `generate-tests` | Create structured manual test cases from requirements/context |
| `build-scripts` | Convert approved test cases into Playwright JS page objects, pages, and specs |
| `run-ready-framework` | Verify the final pushed framework is cloneable and runnable |
| `heal` | Repair broken selectors after UI changes |

---

## Recommended Backend Read Order For Automation Script Generation

Read these files in this exact order for normal automation script generation:

1. `CLAUDE.md` - project memory, final framework goal, runtime structure, and global rules.
2. `docs/onboarding-guide.md` - skill orchestration, repository split, and end-to-end generation flow.
3. `docs/app-context.md` or client/project-specific app context - application URL, auth, roles, modules, and known behavior.
4. `standards/playwright-standards.md` - code structure, selector priority, fixture rules, package scripts, and runtime rules.
5. `build-scripts/SKILL.md` - convert approved test inventory cases plus any supplied exploration findings into Playwright files.
6. `run-ready-framework/SKILL.md` - verify/correct final framework packaging before push.
7. `../GitHub_Workflow/SKILL.md` - branch, pull/sync, commit, PR, merge-readiness, and conflict rules.
8. Static framework files from `StaticFrameworks/playwright-js` - runnable base files that must be copied into the target repo.
9. Selected test cases from test inventory, supplied exploration findings, and existing target repo files - behavior source, selector context, and merge context.

Use `explore/SKILL.md` only in a separate exploration workflow that produces notes/selectors before script generation. Do not load it by default for automation script generation.

Use `heal/SKILL.md` only after execution failures or known UI selector breakage. It is not part of the normal first-time script generation read order.

---

## Expected User Outcome

After Qentrix pushes generated automation to the user's repository, the user should be able to run:

```bash
git clone <repo>
cd <repo>/playwright-js
npm install
npx playwright install
npm test
```

Feature-specific scripts should also work:

```bash
npm run test:<Feature>-Smoke-Chrome
npm run test:<Feature>-Regression-Chrome
```

---

## Repository Split

Agent_Skills owns generation intelligence:
- prompts
- coding standards
- output contracts
- run-ready validation rules

StaticFrameworks owns runnable assets:
- package files
- Playwright config
- fixtures
- base page
- utility methods
- reporters
- test data templates

Generated target repositories must contain the runnable framework files. They must not depend on Agent_Skills or StaticFrameworks at runtime.

---

## Accuracy Note

Converting test inventory cases directly into scripts is behaviorally accurate, but selector accuracy improves when exploration findings are provided. The current automation script generation flow should consume supplied exploration notes/selectors as first-priority evidence; it should not run exploration by itself, and it should not block generation when exploration findings are absent. In that case, generate scripts using fallback selector inference from test steps, app context, and stable UI patterns.

When a separate exploration workflow exists, it should use the selected test cases as the route through the application, then collect selectors and assertion states for those exact flows.

---

## Safety Rules

- Do not commit real credentials to prompt files.
- Do not generate local absolute paths.
- Do not push prompt files into user repositories.
- Do not generate GitHub tokens or backend API secrets.
- Use environment variables and test-data templates for runtime configuration.

