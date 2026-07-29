# Playwright JavaScript Hybrid Run Healing

Use this file when a generated Playwright JavaScript Hybrid test fails during Run Automation. These rules repair generated client automation only. They do not create new business test cases and they do not modify reference framework files.

## Scope

Apply these healing rules only when all are true:

- Framework is Playwright.
- Language is JavaScript.
- Framework type is Hybrid.
- Generated client root is the selected framework root, usually `updatedplaywrightjshybrid`.
- Failure comes from a generated run, not from reference repositories.

Allowed generated files to patch:

```text
updatedplaywrightjshybrid/pageObjects/*.js
updatedplaywrightjshybrid/pages/*.js
updatedplaywrightjshybrid/tests/*.test.js
updatedplaywrightjshybrid/fixtures/test.js
updatedplaywrightjshybrid/test-data/testdata.json
updatedplaywrightjshybrid/test-data/credentials.csv
updatedplaywrightjshybrid/.env
```

Do not modify:

```text
D:\skills\Agent_Skills
D:\frameworks\StaticFrameworks
updatedplaywrightjshybrid/pages/BasePage.js
updatedplaywrightjshybrid/config/**
updatedplaywrightjshybrid/utils/**
updatedplaywrightjshybrid/package.json
updatedplaywrightjshybrid/playwright.config.js
```

Framework-owned support files can be read for context but must not be rewritten during healing unless the user explicitly asks for framework maintenance. `fixtures/test.js` is the only support file that may be patched, and only to register missing generated page fixtures or fix generated fixture import/export wiring.

## Healing Flow

1. Read the failed run logs, selected script path, generated files, screenshot/error context if available, and current `.env`/test-data files.
2. Classify the failure before editing anything.
3. Heal only automation defects that are strongly supported by the evidence.
4. Apply the smallest patch to generated files in the isolated workspace.
5. Rerun the same selected script in headless mode.
6. Push healed code back to the selected generated branch only after the rerun passes.
7. If rerun fails, do not push the patch. Report the remaining failure and the attempted fix.

Maximum auto-heal attempts: `1` for a hard failure, plus `1` additional targeted attempt only when the healed rerun exits successfully but Playwright reports flaky retries.

## Failure Classification

Treat as healable automation defects:

- Locator not found.
- Locator strict mode violation caused by weak/generated selector.
- Incorrect locator definition or page method selector.
- Page-object class uses `this.page` in a locator helper method but the constructor did not assign `this.page = page`.
- Page class instantiates a page-object class without passing the active Playwright `page`.
- Test references a missing key in `test-data/testdata.json` or `credentials.csv`.
- Test uses stale generated data from another testcase ID.
- Test hardcodes URL or credentials that should come from `.env` or test data.
- Test imports a generated page class with wrong casing or wrong path.
- Fixture file imports a generated default-export page class as a named import.

Treat as genuine app/test failure and do not heal:

- Application returns a real validation error expected by the testcase outcome.
- Login fails with provided valid credentials and selectors are correct.
- Page/API returns 4xx/5xx caused by application behavior.
- Approved testcase expectation is not met after successful interaction.
- Required testcase data is not available in approved input, `.env`, or test data.
- Environment URL is unreachable or redirects to an unrelated page.

When uncertain, return `"status": "manual_review"` with a clear reason instead of guessing.

## Locator Healing Rules

For locator failures, inspect live DOM from `process.env.BASE_URL` using headless Playwright before changing selectors.

Prefer selector evidence in this order:

1. Stable `data-testid`, `data-test`, or `data-qa`.
2. Stable `id`.
3. Stable `name`.
4. Accessible role with verified accessible name.
5. Verified label.
6. Verified placeholder.
7. Stable semantic CSS.
8. Readable relationship XPath only when no better option exists.

Do not use guessed labels when DOM evidence shows stable attributes. Example:

```js
// Bad after DOM shows id/name=username
this.usernameInput = page.getByLabel('Username');

// Good when id is present
this.usernameInput = page.locator('#username');

// Good when name is the best stable evidence
this.usernameInput = page.locator('input[name="username"]');
```

For common login controls, choose one evidence-backed strict-mode-safe selector per control:

```js
this.usernameInput = page.locator('#username');
this.passwordInput = page.locator('#password');
this.loginButton = page.locator('button[type="submit"]');
```

Do not use Playwright `locator.or()` in healed final code. If multiple selector candidates exist, choose the highest-priority candidate supported by DOM evidence and document rejected candidates in the healing reason or warnings, not in the source code.

Do not add random class names, absolute XPath, nth-child selectors, positional selectors, or fallback selector chains that can hide strict-mode issues.

## Page Object Constructor Healing Rules

If the failure is similar to:

```text
TypeError: Cannot read properties of undefined (reading 'locator')
at ../pageObjects/<Feature>PageObjects.js
```

inspect the referenced page-object class. If a method calls `this.page.locator(...)`, `this.page.getByRole(...)`, `this.page.getByLabel(...)`, or any other `this.page` access, patch the constructor to store the page:

```js
export class HomePageObjects {
  constructor(page) {
    this.page = page;
    this.productLinks = page.locator('.card-title a');
  }

  getProductLink(productName) {
    return this.page.locator(`.card-title a:has-text("${productName}")`);
  }
}
```

Also verify the matching page class passes the active page:

```js
this.locators = new HomePageObjects(page);
```

Do not replace this with a broad selector or a fixed wait. This is a wiring defect, not a timing defect.

## Fixture Import/Export Healing Rules

If the failure is similar to:

```text
Test has unknown parameter "homePage"
Test has unknown parameter "productPage"
Test has unknown parameter "cartPage"
```

patch `updatedplaywrightjshybrid/fixtures/test.js` to register the missing fixtures. Before writing imports, inspect the matching page files in `updatedplaywrightjshybrid/pages/`.

Generated page classes in this framework should be default exports:

```js
export default class CartPage extends BasePage {
}
```

For default-export page classes, fixture imports must be default imports:

```js
import CartPage from '../pages/CartPage.js';
```

Do not use named imports unless the page file explicitly contains a named export:

```js
// Wrong for default-export page files
import { CartPage } from '../pages/CartPage.js';
```

Correct fixture registration pattern:

```js
import { test as base, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import ProductPage from '../pages/ProductPage.js';
import CartPage from '../pages/CartPage.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  }
});

export { expect };
```

When patching fixtures, preserve existing valid fixture entries and imports. Do not remove unrelated fixtures needed by other selected scripts in the same run.

If rerun fails with:

```text
SyntaxError: The requested module '../pages/<Feature>Page.js' does not provide an export named '<Feature>Page'
```

the repair used the wrong import style. Patch `fixtures/test.js` to use a default import for that page file and rerun.

## Test Data Healing Rules

If a generated test references missing data, patch `test-data/testdata.json` or `test-data/credentials.csv` using only selected testcase data.

Example failure:

```text
Cannot destructure property 'emptyCredentials' of 'testData.login' as it is undefined
```

Valid repair:

```json
{
  "login": {
    "emptyCredentials": {
      "username": "",
      "password": ""
    }
  }
}
```

Do not invent usernames, passwords, messages, URLs, or business data. If data is missing from approved testcase input, return `"status": "manual_review"` with a clear reason.

## Runtime Data Rules

`.env` is only for base URL and approved valid/default credentials:

```text
BASE_URL=...
TEST_USERNAME=...
TEST_PASSWORD=...
```

Invalid credentials, empty values, alternate users, form inputs, expected messages, and testcase-specific values belong in test data, not `.env`.

Generated JavaScript in tests, pages, and pageObjects must not contain literal runtime URLs, usernames, passwords, or tokens from testcase steps. It must read them through `process.env`, framework helpers, or test data.

## Flaky Rerun Healing Rules

A rerun is not cleanly healed when Playwright exits with code `0` but reports flaky retries, such as `1 flaky` or `2 flaky` in terminal output.

When the first healed rerun is flaky:

1. Treat the result as unstable, not passed.
2. Read the flaky rerun logs together with the original failure logs.
3. Identify why the test needed retry to pass.
4. Apply one additional minimal patch focused only on reducing retry-dependent behavior.
5. Do not push any healed files unless the next rerun passes cleanly with no flaky summary.

Common flaky causes to repair when evidence supports them:

- Assertion runs before the UI reaches the expected state.
- Click or fill happens before the element is attached, visible, enabled, or stable.
- Network-backed content is asserted without waiting for the relevant response, URL, or DOM state.
- Test depends on stale state from a previous test run.
- Locator matches transient or duplicate elements during page transitions.
- Test data cleanup/setup is incomplete and causes intermittent state.

Preferred Playwright repairs:

- Use locator auto-waiting with `await expect(locator).toBeVisible()` or `toBeEnabled()` before interaction only when the log shows readiness timing.
- Wait for specific page state, URL, response, or durable DOM change instead of fixed sleeps.
- Make selectors strict and stable so retries are not hiding ambiguous locator behavior.
- Isolate generated test data when repeated runs can collide.
- Keep retries as a runner safety net; do not add or increase retries in healed test code to hide instability.

Do not heal flaky behavior by adding arbitrary `waitForTimeout`, broad fallback selectors, repeated clicks, try/catch swallowing, larger global timeouts, or extra Playwright retries.

If the reason for flakiness cannot be proven from logs, DOM evidence, screenshots/traces, or selected testcase data, return `"status": "manual_review"` and explain what evidence is missing.

## Output Contract

Return strict JSON only. Do not include any text outside the JSON object.

```json
{
  "status": "fixed | manual_review",
  "summary": "short explanation of what was fixed or why manual review is needed",
  "files": [
    {
      "path": "updatedplaywrightjshybrid/pages/LoginPage.js",
      "content": "full updated file content"
    }
  ],
  "reason": "only required for manual_review, explains why healing was not possible"
}
```

### Field rules

- `status`: Use `"fixed"` when healing was applied and rerun should proceed. Use `"manual_review"` when the failure cannot be safely auto-healed.
- `summary`: Brief human-readable explanation of the healing performed or the reason for manual review.
- `files`: Array of objects, each with a `path` (relative to the generated client framework root) and `content` (the complete updated file content). Include every generated file that was changed.
- `reason`: Required only when `status` is `"manual_review"`. Explain why automatic healing was not possible (e.g., wrong URL, missing DOM evidence, genuine app failure).

File paths must stay inside the selected generated client framework root (e.g., `updatedplaywrightjshybrid/...`). Never output paths outside that root.

## Completion Gate

A heal is complete only when:

1. The patch changes only generated client files.
2. The reason is supported by run logs, screenshots, error context, DOM evidence, or selected testcase data.
3. The same script is rerun headlessly.
4. The rerun passes cleanly with no Playwright flaky summary.
5. Only then the healed files are pushed to the selected generated branch.



