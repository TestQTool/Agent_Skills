---
name: playwright-java-testng
description: Generate, explore, heal, review, and package web UI automation for Playwright Java + TestNG Framework. Use when Codex needs to create TestNG suites, convert approved test cases into automated tests, manage TestNG groups/listeners/data providers, or validate run-ready TestNG execution.
---

# Playwright Java TestNG Framework Skill

Use this skill package for production-ready Java TestNG automation.

## Read Order

1. `CLAUDE.md`
2. `docs/onboarding-guide.md`
3. `docs/app-context.md`
4. `standards/playwright-java-testng-standards.md`
5. `build-scripts/SKILL.md`
6. `run-ready-framework/SKILL.md`
7. `explore/SKILL.md` only for discovery workflows
8. `heal/SKILL.md` only for failing tests

## Core Rule

Preserve TestNG layering: TestNG tests orchestrate behavior, page/client/screen classes own actions and assertions, object/endpoint files own selectors or endpoints, and `testng.xml` owns suite grouping.

