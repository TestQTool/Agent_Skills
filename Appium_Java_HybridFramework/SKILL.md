---
name: appium-java-hybridframework
description: Generate, explore, heal, review, and package mobile automation for Appium + Java + Hybrid Framework with Android and iOS support. Use when Codex needs to create a production-ready appium-java-hybrid framework, convert mobile test cases into automated tests, discover Android/iOS locators, repair broken selectors, or validate device-ready execution.
---

# Appium Java Hybrid Framework Mobile Skill

Use this package for Android and iOS mobile automation. Always preserve platform separation for capabilities, locators, gestures, app identifiers, and device setup.

## Read Order

1. `CLAUDE.md`
2. `docs/onboarding-guide.md`
3. `docs/app-context.md`
4. `standards/appium-java-hybrid-standards.md`
5. `build-scripts/SKILL.md`
6. `run-ready-framework/SKILL.md`
7. `explore/SKILL.md` only for live mobile exploration
8. `heal/SKILL.md` only for failing selectors

## Core Rule

Generated mobile tests must support both Android and iOS through platform-aware capabilities and locator helpers. Never hardcode a single platform unless the requested test is explicitly platform-specific.
