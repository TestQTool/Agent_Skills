# QA Automation - Playwright JS Project Memory
# Loaded for script generation. Keep this domain-neutral; app-specific details come from docs/app-context.md or backend project config.

---

## Goal
Generate a self-contained Playwright JavaScript automation framework that a user can clone and run on their own machine.

The final repository must not depend on Qentrix backend, local prompt files, Agent_Skills, or StaticFrameworks at runtime. Those repos are generation inputs only.

---

## Runtime Layout

```text
playwright-js/
  package.json
  playwright.config.js
  CustomReporter.js
  global-teardown.js
  pages/
    basePage.js
    <feature>Page.js
  pageObjects/
    <feature>Page.js
  tests/
    <Feature>.test.js
  testFixtures/
    fixture.js
  test-data/
    credentials.csv
  utils/
    WebActions.js
    testdata.json
```

---

## Framework Architecture

```text
CommonActions (utils/WebActions.js)
  -> BasePage (pages/basePage.js)
    -> FeaturePage (pages/<feature>Page.js)
```

- `pageObjects/<feature>Page.js` contains locator constants only.
- `pages/<feature>Page.js` contains page actions and assertions.
- `tests/<Feature>.test.js` contains test orchestration using `test.step()`.
- `testFixtures/fixture.js` wires page classes as fixtures.

---

## Generated Files Per Feature

For every feature, generate or update:

```text
playwright-js/pageObjects/<feature>Page.js
playwright-js/pages/<feature>Page.js
playwright-js/tests/<Feature>.test.js
playwright-js/testFixtures/fixture.js
playwright-js/package.json
```

Only update `fixture.js` and `package.json` when needed. Preserve existing content and append missing imports, fixtures, and npm scripts without removing unrelated entries.

---

## Coding Standards

### pageObjects/<feature>Page.js
- Named exports only.
- No imports, functions, classes, or logic.
- Group locators by page area.
- Prefer stable selectors.
- Add `// TODO: verify selector against live app` only when exploration data is missing.

### pages/<feature>Page.js
- Import `BasePage` from `./basePage.js`.
- Import `{ expect }` from `@playwright/test`.
- Import all selectors from `../pageObjects/<feature>Page.js`.
- Class extends `BasePage`.
- Constructor calls `super(page)`.
- Page methods use inherited `WebActions` helpers.
- Credentials come from `this.getLoginDataByRole(roleName)` or environment-driven test data, never from hardcoded secrets.
- Assertion methods call `await this.wait()` before assertions.

### tests/<Feature>.test.js
- Import `test` from `../testFixtures/fixture.js`.
- Do not import `test` from `@playwright/test`.
- Every test title includes a TC-ID and `@smoke` or `@regression`.
- Every async action is wrapped in `test.step()`.
- Use `test.describe.parallel()` unless the test cases require ordered execution.

---

## Selector Priority

1. Element `id` selectors, when the id is stable and not generated.
2. Accessibility and role-based selectors, including role, accessible name, aria-label, and label text.
3. Dynamic XPath, when it is stable, readable, and best represents the element relationship.
4. Stable attributes such as `data-testid`, `name`, `type`, `placeholder`, `title`, or custom semantic attributes.
5. Stable CSS classes that are not generated or hashed.
6. Exact text selectors as a last resort.

XPath is allowed and useful when written dynamically. Prefer XPath patterns based on durable text, labels, parent/child relationships, sibling relationships, or stable attributes, such as `//*[contains(text(), "Save")]`, `//label[contains(., "Email")]/following::input[1]`, or `//*[@id="login"]//button[contains(., "Submit")]`. Avoid only brittle absolute XPath, generated ids/classes, and blind positional chains. If a selector cannot be verified from exploration, mark it with `// TODO: verify selector against live app`.

---

## Exploration Findings For Accurate Scripts

Approved test cases from test inventory are the behavioral source of truth. Automation script generation must not load or run `explore/SKILL.md` by default.

If exploration notes, selector findings, DOM snapshots, or screenshots are supplied, treat them as the first-priority evidence for selectors, waits, page actions, and assertions. If exploration data is missing, do not block script generation. Fall back to intelligent selector inference from the approved test-case steps, app context, existing repository files, and common stable UI patterns; mark uncertain selectors with `// TODO: verify selector against live app`.

---

## Skill Read Order

For automation script generation, read and apply the prompt files in this order:

1. `CLAUDE.md`
2. `docs/onboarding-guide.md`
3. `docs/app-context.md` or client/project-specific app context
4. `standards/playwright-standards.md`
5. `build-scripts/SKILL.md`
6. `run-ready-framework/SKILL.md`
7. `../GitHub_Workflow/SKILL.md`
8. Static framework files from `StaticFrameworks/playwright-js`
9. Selected test inventory cases, supplied exploration findings, and existing target repository files

Do not read `explore/SKILL.md` during normal automation script generation. Use it only in a separate exploration workflow that produces exploration notes or selector findings before script generation. Automation script generation must still proceed when those artifacts are absent by using the fallback selector inference rules.

Use `heal/SKILL.md` only for failing or broken existing scripts.

---

## Runtime Rules

Generated code must run after:

```bash
cd playwright-js
npm install
npx playwright install
npm test
```

Specific generated scripts should also work, for example:

```bash
npm run test:Login-Smoke-Chrome
npm run test:Login-Regression-Chrome
```

Use environment variables for machine-specific values:

```text
BASE_URL=<application url>
TEST_ROLE=Admin
HEADLESS=true
```

Do not write local absolute paths, backend URLs, GitHub tokens, API keys, or prompt repository paths into generated files.




