# QA Automation - Playwright JavaScript/TypeScript BDD Cucumber Framework Project Memory

## Goal

Generate a self-contained `playwright-bdd-cucumber` web automation framework that a user can clone, install, configure, and run locally or in CI.

The final repository must not depend on Qentrix backend, local prompt files, Agent_Skills, or StaticFrameworks at runtime.

## Runtime Layout

```text
playwright-bdd-cucumber/
  package.json
  cucumber.js
  pageObjects/<feature>PageObjects.ts
  pages/<feature>Page.ts
  step-definitions/<feature>Steps.ts
```

## Framework Architecture

```text
Web actions / common keywords
  -> Base page / base keyword layer
    -> Feature page / feature keyword layer
      -> Tests, specs, feature files, or suites
```

## Generated Files Per Feature

- `pageObjects/<feature>PageObjects.ts`: locators/selectors only.
- `pages/<feature>Page.ts`: page actions, waits, data helpers, and assertions.
- `step-definitions/<feature>Steps.ts`: test orchestration only.
- Framework wiring files are updated only when needed and must preserve existing content.

## Coding Standards

- Keep locators/selectors out of tests.
- Keep assertions out of BDD step definitions when this stack uses BDD.
- Use role-based credentials and environment-driven configuration.
- Do not hardcode secrets, absolute paths, backend URLs, tokens, or prompt repository paths.
- Prefer stable selectors: ids, accessibility labels, semantic attributes, dynamic XPath only when readable and robust.
- Mark inferred selectors with a TODO when live exploration data is unavailable.

## Skill Read Order

For automation script generation, read:

1. `CLAUDE.md`
2. `docs/onboarding-guide.md`
3. `docs/app-context.md`
4. `standards/playwright-bdd-cucumber-standards.md`
5. `build-scripts/SKILL.md`
6. `run-ready-framework/SKILL.md`
7. Static framework files from `StaticFrameworks/playwright-bdd-cucumber`
8. Approved test inventory cases and supplied exploration findings

Use `explore/SKILL.md` only for a separate exploration workflow. Use `heal/SKILL.md` only for failing or broken existing scripts.

## Runtime Rule

Generated code must run with:

```bash
npx cucumber-js --tags @smoke
```
