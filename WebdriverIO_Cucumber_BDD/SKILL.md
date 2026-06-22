---
name: webdriverio-cucumber-bdd
description: Generate, explore, heal, review, and package web automation assets for WebdriverIO + JavaScript/TypeScript + Cucumber BDD Framework. Use when Codex needs to create or maintain a production-ready webdriverio-cucumber-bdd framework, convert approved manual test cases into automated tests, discover selectors, repair broken locators, or validate clone-and-run readiness for this stack.
---

# WebdriverIO JavaScript/TypeScript Cucumber BDD Framework Skill

## Purpose

Use this skill package to create production-ready web automation for the WebdriverIO + JavaScript/TypeScript + Cucumber BDD Framework stack. The generated repository must be self-contained and runnable on a user machine without depending on Agent_Skills, prompt files, or StaticFrameworks at runtime.

## Read Order

1. `CLAUDE.md` for stack memory, architecture, and non-negotiable rules.
2. `docs/onboarding-guide.md` for workflow and expected user outcome.
3. `docs/app-context.md` or project-specific context for URLs, roles, modules, and known behaviors.
4. `standards/webdriverio-cucumber-bdd-standards.md` for coding and folder conventions.
5. `build-scripts/SKILL.md` to convert approved test cases into automated scripts.
6. `run-ready-framework/SKILL.md` before pushing or handing off the framework.
7. `heal/SKILL.md` only for broken existing tests.
8. `explore/SKILL.md` only for exploration or selector-discovery workflows.

## Runtime Command

```bash
npx wdio run wdio.conf.ts --cucumberOpts.tags @smoke
```

## Core Rule

Preserve framework layering: selectors/locators in locator files, actions and assertions in page/keyword files, and orchestration only in test/spec/feature files.
