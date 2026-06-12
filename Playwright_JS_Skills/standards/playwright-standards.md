# Playwright Coding Standards - Framework Structure

Generated Playwright scripts must match the static framework in `StaticFrameworks/playwright-js` and must run after the user clones the target repository.

---

## File Outputs Per Feature

```text
playwright-js/pageObjects/<feature>Page.js
playwright-js/pages/<feature>Page.js
playwright-js/tests/<Feature>.test.js
playwright-js/testFixtures/fixture.js
playwright-js/package.json
```

The first three are feature files. `fixture.js` and `package.json` are framework wiring files and must be updated only when necessary.

---

## pageObjects Rules

- Named exports only.
- No imports.
- No functions, classes, conditionals, or runtime logic.
- Group locators by section.
- Use clear names ending in element type where useful: `loginButton`, `emailInput`, `statusDropdown`, `resultsTable`.

Selector priority:

1. Stable `id` selector, for example `#login-button`.
2. Role/accessibility selector, for example `getByRole('button', { name: 'Login' })`, `[role="button"]`, `[aria-label="Login"]`, or label text.
3. Dynamic XPath when it is stable, readable, and tied to durable text, attributes, parent/child relationships, or sibling relationships.
4. Stable attributes such as `[data-testid="..."]`, `[name="..."]`, `[type="..."]`, `[placeholder="..."]`, or `[title="..."]`.
5. Stable CSS classes that are not generated or hashed.
6. Exact text selectors as a last resort.

XPath is valid when it improves reliability or expresses relationships better than CSS. Prefer dynamic XPath such as `//*[contains(text(), "Save")]`, `//button[contains(., "Submit")]`, `//label[contains(., "Email")]/following::input[1]`, `//*[contains(@class,"modal")]//button[contains(.,"Cancel")]`, or parent/child/sibling expressions based on stable labels. Avoid only brittle absolute XPath, generated ids/classes, and blind positional chains such as `/html/body/div[2]/div[3]/button[1]`.

---

## Page Class Rules

- File path: `playwright-js/pages/<feature>Page.js`.
- Import `BasePage` from `./basePage.js`.
- Import `{ expect }` from `@playwright/test`.
- Import selectors from `../pageObjects/<feature>Page.js`.
- Class name: `<Feature>Page`.
- Constructor: `constructor(page) { super(page); }`.
- One page method should represent one user action or assertion.
- Navigation methods return `await super.waitForPageLoad()` or `await super.waitforNetworkIdle()`.
- Assertion methods call `await this.wait()` first.
- Use `this.testData` and `this.getLoginDataByRole(roleName)` instead of hardcoded data.

---

## Spec Rules

- File path: `playwright-js/tests/<Feature>.test.js`.
- Import `test` from `../testFixtures/fixture.js`.
- Do not import `test` from `@playwright/test`.
- Every test title includes a TC-ID.
- Every test title includes `@smoke`, `@regression`, or both.
- Every user action and assertion is wrapped in `test.step()`.
- Use page object methods only.
- Use `test.describe.parallel()` unless test order is required.

---

## Fixture Rules

When a new page class is generated, update `playwright-js/testFixtures/fixture.js`.

Add import:

```javascript
import FeaturePage from '../pages/featurePage.js';
```

Add fixture entry:

```javascript
featurePage: async ({ page }, use) => {
    await use(new FeaturePage(page));
},
```

Preserve all existing imports and fixture entries.

---

## package.json Rules

Generated feature scripts should be added without removing existing scripts.

Required generic script:

```json
"test": "npx playwright test"
```

Feature scripts:

```json
"test:<Feature>-Smoke-Chrome": "npx playwright test tests/<Feature>.test.js --grep @smoke --project=Chrome",
"test:<Feature>-Regression-Chrome": "npx playwright test tests/<Feature>.test.js --grep @regression --project=Chrome"
```

Firefox scripts are recommended when the framework has a Firefox project configured.

---

## Runtime Rules

The generated repository must run on a user machine with:

```bash
cd playwright-js
npm install
npx playwright install
npm test
```

Do not write absolute local paths, backend URLs, prompt repository URLs, API tokens, GitHub tokens, or secrets into generated files.

---

## Exploration-Backed Selector Rule

Test inventory cases provide the expected behavior and steps. They do not guarantee accurate selectors. Before final script generation, the system should explore the live application by following the selected test-case steps and capture selectors for every interacted element and assertion state.

When exploration results are available, generated scripts must use those explored selectors. When exploration results are not available, selectors are best-effort and uncertain selectors must be marked with `// TODO: verify selector against live app`.

