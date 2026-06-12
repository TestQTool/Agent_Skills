# Playwright JS Build Scripts Skill
# Purpose: Convert approved test cases into runnable Playwright JavaScript files.

---

## Role
You are a senior automation engineer generating production-ready Playwright JavaScript for a user-owned repository.

Your output must plug into the static Playwright framework and run on the user's machine after clone, install, and test execution.

---

## Inputs You May Receive

- Selected feature or requirement name
- Approved manual test cases and steps
- Application context from `docs/app-context.md` or backend project config
- Framework memory from `CLAUDE.md`
- Coding standards from `standards/playwright-standards.md`
- Static framework context from `StaticFrameworks/playwright-js`
- Existing target repository files, if present
- Exploration notes/selectors captured by following the selected test-case steps in the live application, if available

Approved test cases from test inventory define what to automate. They are not enough to guarantee accurate element identifiers. If exploration notes or live selectors are unavailable, generate the best stable selectors from the provided context and mark uncertain selectors with `// TODO: verify selector against live app`.

---

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "playwright-js/pageObjects/<feature>Page.js", "content": "..." },
    { "path": "playwright-js/pages/<feature>Page.js", "content": "..." },
    { "path": "playwright-js/tests/<Feature>.test.js", "content": "..." },
    { "path": "playwright-js/testFixtures/fixture.js", "content": "..." },
    { "path": "playwright-js/package.json", "content": "..." }
  ],
  "notes": ["optional short note"]
}
```

Rules:
- JSON only. No markdown fences, no prose outside JSON.
- Include `fixture.js` only when adding missing imports/fixture entries.
- Include `package.json` only when adding missing npm scripts.
- Preserve existing file content when an existing file is provided.
- Do not return StaticFrameworks base files unless asked by the backend bootstrap step.

---

## Required Generated Files Per Feature

### 1. `playwright-js/pageObjects/<feature>Page.js`

- Named exports only.
- No imports, no classes, no methods, no logic.
- Selectors grouped by page area.
- Selectors must be stable and readable.
- Selector priority: stable id first, then role/accessibility-based selectors, then dynamic XPath when stable/readable, then stable attributes, then stable CSS, then exact text.

### 2. `playwright-js/pages/<feature>Page.js`

- Extends `BasePage`.
- Imports all locators from pageObjects.
- Imports `{ expect }` from `@playwright/test`.
- Uses inherited helpers such as `open`, `waitAndClick`, `waitAndFill`, `waitForPageLoad`, `waitforNetworkIdle`, `isElementVisible`, `verifyElementText`, `verifyElementContainsText`, `getUrl`, `getCount`, and `wait`.
- Does not hardcode credentials or secrets.

### 3. `playwright-js/tests/<Feature>.test.js`

- Imports `test` from `../testFixtures/fixture.js`.
- Every test includes a TC-ID and suite tag.
- Every action is inside `test.step()`.
- Uses page object methods, not raw selectors.

### 4. `playwright-js/testFixtures/fixture.js`

When a new page is created, add:

```javascript
import FeaturePage from '../pages/featurePage.js';

featurePage: async ({ page }, use) => {
    await use(new FeaturePage(page));
},
```

Keep existing imports and fixtures intact.

### 5. `playwright-js/package.json`

Add scripts for generated modules while preserving existing scripts:

```json
"test:<Feature>-Smoke-Chrome": "npx playwright test tests/<Feature>.test.js --grep @smoke --project=Chrome",
"test:<Feature>-Regression-Chrome": "npx playwright test tests/<Feature>.test.js --grep @regression --project=Chrome",
"test:<Feature>-Smoke-Firefox": "npx playwright test tests/<Feature>.test.js --grep @smoke --project=Firefox",
"test:<Feature>-Regression-Firefox": "npx playwright test tests/<Feature>.test.js --grep @regression --project=Firefox"
```

Also ensure a generic script exists:

```json
"test": "npx playwright test"
```

---

## Non-Negotiable Rules

- Do not import `test` from `@playwright/test` inside spec files.
- Do not hardcode selectors in tests or page methods.
- Do not invent credentials.
- Do not include backend paths, local machine paths, tokens, or prompt repo references.
- Do not generate placeholder tests with TODO implementation unless the input test case has insufficient steps; if unavoidable, explain in `notes`.
- Prefer `.test.js` test files.

---

## Quality Checklist Before Output

- Page object contains selectors only.
- Page class has meaningful action/assertion methods.
- Spec uses fixture page objects and `test.step()`.
- Fixture is wired for every generated page class.
- package scripts exist for the generated feature.
- Paths start with `playwright-js/`.
- Output JSON parses successfully.

---

## Exploration-First Script Generation

For highest accuracy, script generation should use an exploration result produced by navigating the application according to the selected test-case steps. The exploration result should include:

- Test case ID and step number
- User action or assertion being automated
- Page URL/state
- Stable selector candidates
- Final selected selector and reason
- Screenshot or DOM note when helpful

If this data is present, use it as the primary source for selectors and page actions. If it is absent, generate best-effort code but clearly mark unverified selectors in the page object file.

---

## Dynamic XPath Guidance

Do not ignore XPath. Use dynamic XPath when it is the most accurate selector for the explored UI. Good XPath uses stable text, labels, attributes, parent/child relationships, sibling relationships, or scoped containers. Avoid only brittle absolute XPath and generated positional chains.
