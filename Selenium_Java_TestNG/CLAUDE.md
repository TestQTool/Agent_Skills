# QA Automation - Selenium Java TestNG Framework Project Memory

## Goal

Generate a self-contained `selenium-java-testng` web automation framework that a user can clone, install, configure, and run locally or in CI.

The final repository must not depend on Qentrix backend, local prompt files, Agent_Skills, or StaticFrameworks at runtime.

## Runtime Layout

```text
selenium-java-testng/
  pom.xml
  src/test/resources/config.properties
  src/main/java/pageObjects/<Feature>PageObjects.java
  src/main/java/pages/<Feature>Page.java
  src/test/java/tests/<Feature>Test.java
```

## Framework Architecture

```text
Web actions / common keywords
  -> Base page / base keyword layer
    -> Feature page / feature keyword layer
      -> Tests, specs, feature files, or suites
```

## Generated Files Per Feature

- `src/main/java/pageObjects/<Feature>PageObjects.java`: locators/selectors only.
- `src/main/java/pages/<Feature>Page.java`: page actions, waits, data helpers, and assertions.
- `src/test/java/tests/<Feature>Test.java`: test orchestration only.
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
4. `standards/selenium-java-testng-standards.md`
5. `build-scripts/SKILL.md`
6. `run-ready-framework/SKILL.md`
7. Static framework files from `StaticFrameworks/selenium-java-testng`
8. Approved test inventory cases and supplied exploration findings

Use `explore/SKILL.md` only for a separate exploration workflow. Use `heal/SKILL.md` only for failing or broken existing scripts.

## Runtime Rule

Generated code must run with:

```bash
mvn test -Dgroups=smoke
```
