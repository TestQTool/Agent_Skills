---
name: hybrid
description: Generate Playwright JavaScript Hybrid automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation that must create locator definitions, page classes, fixtures, and Playwright tests compatible with the matching Hybrid static framework; never use this skill to create test cases or invent business scenarios.
---

# Playwright JavaScript Hybrid Script Generation

Generate feature-specific automation for the Playwright JavaScript Hybrid framework. Treat selected approved test cases as the only behavioral source of truth.


## Run automation healing

For Playwright JavaScript Hybrid run-failure repair, use the sibling `HEALING.md` file in this directory. Keep generation rules in this `SKILL.md`; keep run-time repair, failure classification, rerun, and push-after-pass policy in `HEALING.md`.

## Required input
Require:

- Framework version and existing target-repository files.
- Selected approved cases containing `id`, `title`, ordered `steps`, and optional approved `tags`, `preconditions`, and `dataReferences`.
- Every step containing `number`, `action`, and `expected`.
- Application routes and safe runtime data references required by those steps.
- Selector evidence when production-ready output is requested.
- Selector evidence from live application inspection when the backend provides it.

Use only data that is present in the selected approved test cases. Do not invent URLs, users, passwords, tags, or roles.
When approved test-case steps contain an application URL or credential value, move those values into the generated root `.env` file and consume them through environment variables. Do not hardcode those values in tests, page classes, locators, comments, or step titles.
Reject tokens, cookies, private keys, and platform secrets. Accept test-environment credentials only when they are explicitly present in the approved test case, and store them only in `.env`.

Runtime data rule is mandatory: if a testcase step says `Navigate to url "https://..."`, `Enter username "..."`, or `password "..."`, those literal values must appear only in `.env` and never in any generated `.js` file. Generated tests and page objects must read them from `process.env.BASE_URL`, `process.env.TEST_USERNAME`, and `process.env.TEST_PASSWORD` or framework helpers that expose those environment values.

Data placement rule is mandatory:

- `.env` is only for the application base URL and approved valid/default runtime credentials used to access the application.
- Put the approved application URL in `BASE_URL`.
- Put valid/default login credentials in `TEST_USERNAME` and `TEST_PASSWORD`.
- Put invalid usernames, invalid passwords, alternate users, form input values, expected messages, search text, and other testcase-specific data in `test-data/testdata.json` or `test-data/credentials.csv`.
- Negative tests must not overwrite `.env` valid credentials with invalid values. They should read invalid values from test data.
- Generated JavaScript may reference keys such as `process.env.BASE_URL` or `testData.invalidUsername`, but must not contain the literal values from testcase steps.

Do not load or invoke a test-case-generation skill. Do not create, expand, merge, split, reprioritize, or supplement test cases.

## Target output contract

The static framework path is reference context only. Do not use the reference repository path as a generated output path.

Reference framework path:

```text
web-automation/playwright/javascript/hybrid
```

Generated files must target the selected client framework root from the request, usually:

```text
updatedplaywrightjshybrid
```

Return operation paths either relative to that selected root or prefixed with that selected root:

```text
.env
test-data/testdata.json
test-data/credentials.csv
pageObjects/<Feature>PageObjects.js
pages/<Feature>Page.js
tests/<feature>.test.js
```

or:

```text
updatedplaywrightjshybrid/.env
updatedplaywrightjshybrid/test-data/testdata.json
updatedplaywrightjshybrid/test-data/credentials.csv
updatedplaywrightjshybrid/pageObjects/<Feature>PageObjects.js
updatedplaywrightjshybrid/pages/<Feature>Page.js
updatedplaywrightjshybrid/tests/<feature>.test.js
```

Never return generated paths beginning with `web-automation/`, `updatewebautomation/`, `playwright/javascript/hybrid/`, `Agent_Skills/`, or `StaticFrameworks/`.

For every selected runnable test case, the response must include generator-owned operations for all three layers:

```text
pageObjects/<Feature>PageObjects.js
pages/<Feature>Page.js
tests/<feature>.test.js
```

Do not return only `.env`, only locator/page files, only coverage, or an empty operations list when selected testcase steps are present. If selectors are uncertain, still generate the locator object, page class, and test with best-effort accessible selectors and mark the selector status as `needs_exploration` in coverage/warnings.

Hard dependency contract:

- If any test imports `../pages/<Feature>Page.js`, the same response must include `pages/<Feature>Page.js` as a `createFile` or `replaceGeneratedFile` operation unless that exact file already exists in the selected client branch and is being intentionally reused.
- If any test calls `new <Feature>Page(page)` or calls `<feature>Page.<method>()`, the page class file must define that constructor and every called method.
- If any page class imports `../pageObjects/<Feature>PageObjects.js`, the same response must include `pageObjects/<Feature>PageObjects.js` unless that exact file already exists in the selected client branch and is being intentionally reused.
- Never generate a test that calls page methods when the matching page class operation is missing.
- Never generate a page class that uses locator properties when the matching locator object operation is missing.

Fixture dependency contract:

- If a generated test destructures a fixture such as `async ({ loginPage }) =>`, `fixtures/test.js` must already expose that exact lower-camel-case fixture or the response must include a `registerFixture` operation for it.
- `registerFixture` must import the page class from `../pages/<Feature>Page.js`, instantiate it with `page`, and preserve all existing fixture imports and entries.
- Do not destructure `loginPage`, `cartPage`, or any other page fixture in tests unless that fixture exists after applying operations.

Example fixture registration:

```js
import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

export { expect };
```

Update only when needed:

```text
fixtures/test.js
package.json
```

Never regenerate or replace framework-owned configuration, `core`, utilities, validators, templates, health tests, reporters, or lockfiles.

## Workflow

1. Validate the selected IDs and required step fields.
2. Inspect existing feature files before generating operations.
3. Put selector definitions in `pageObjects/<Feature>PageObjects.js` and map every approved action to one page method in `pages/<Feature>Page.js`.
4. Map every approved expected result to a Playwright web-first assertion in the page class.
5. Use verified selector evidence as the primary selector source.
6. If live selector evidence is present, choose selectors from that evidence before using testcase wording. Prefer stable `id`, `name`, `data-testid`, role/name, placeholder, visible label, and button/link text from the evidence.
7. If selector evidence is missing or incomplete, infer only readable selectors, still return runnable feature files, and mark the response `needs_exploration`.
8. Generate exactly one Playwright test for each selected test-case ID.
9. Reuse existing files and fixtures without removing unrelated content. For same feature/module generation, append new selected testcase blocks into the existing feature test file and preserve existing testcase blocks not selected in the current request.
10. If the selected testcase ID already exists in an existing generated test file, replace only that testcase block and its owned runtime data instead of creating a duplicate test or duplicate file.
11. If a different feature/module is selected, create or update only that module's pageObjects, pages, tests, and runtime data files. Leave unrelated module files unchanged.
12. Write approved runtime URL/credential values to `.env`, then read them through `process.env` or framework environment helpers.
13. Return deterministic JSON operations and complete step coverage.

Technical navigation required to execute an approved action may be implemented inside a page method. Record it in coverage with `technical: true`; do not turn it into a new business scenario or expectation.

## Page object rules

Keep locators/selectors separate from page actions/assertions:

```js
// pageObjects/LoginPageObjects.js
export class LoginPageObjects {
  constructor(page) {
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }
}

// pages/LoginPage.js
import BasePage from './BasePage.js';
import { LoginPageObjects } from '../pageObjects/LoginPageObjects.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new LoginPageObjects(page);
  }

  async login(username, password) {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }
}
```
Prefer selectors in this order:

1. Stable selector evidence: `id`, `name`, `data-testid`, `data-test`, or `data-qa` from live inspection.
2. `getByRole` with accessible name from live inspection.
3. `getByLabel` when the evidence confirms a matching label.
4. `getByPlaceholder` when the evidence confirms a matching placeholder.
5. Stable semantic attributes.
6. Scoped stable CSS.
7. Readable relationship XPath.

Do not use absolute XPath, blind positional selectors, generated classes, or selectors copied without evidence.

When live evidence contains a stable `id` or `name`, prefer it over a guessed label. Example: if evidence shows an input `{ "id": "username", "name": "username" }`, use `page.locator('#username')` or `page.locator('input[name="username"]')`; do not guess `page.getByLabel('Username')` unless the evidence confirms that label.

For important actions such as login, choose one strict-mode-safe locator per property. Do not combine multiple selectors with Playwright `locator.or()` in generated locator definitions, page methods, or assertions.

```js
this.usernameInput = page.locator('input[name="username"]');
this.passwordInput = page.locator('input[name="password"]');
this.loginButton = page.getByRole('button', { name: 'Login' });
```

If multiple stable selector candidates exist, pick the most specific evidence-backed selector in the documented priority order instead of chaining them. A generated locator used by `click`, `fill`, or `expect(...).toBeVisible()` must resolve to exactly one intended element.

For page-displayed assertions, do not assert a broad container fallback such as `page.locator('.container').or(page.locator('form'))`. Prefer asserting the unique required controls for that page:

```js
async verifyLoginPageDisplayed() {
  await this.expectVisible(this.locators.usernameInput);
  await this.expectVisible(this.locators.passwordInput);
  await this.expectVisible(this.locators.loginButton);
}
```

Do not create TODO selector comments in generated runnable files. If selector evidence is unavailable, still generate best-effort strict locators and mark uncertainty in `coverage/warnings`, not in source comments.

## Page and test rules

- Use JavaScript ESM.
- Extend `pages/BasePage.js` in page classes.
- Put selectors only in `pageObjects/*.js`; put business actions and assertions in `pages/*.js`.
- Use one meaningful action or assertion per page method.
- Register page classes in the existing `fixtures/test.js` using lower-camel-case names.
- Import `test` only from `../fixtures/test.js`.
- Prefer registered page fixtures in tests. Do not instantiate `new <Feature>Page(page)` inside tests when a matching fixture exists or is being registered in the same response.
- Import page classes in tests from `../pages/<Feature>Page.js` only when direct construction is unavoidable; otherwise rely on the registered fixture import in `fixtures/test.js`.
- Every imported page class must exist in `pages/` and export the class used by the test.
- Every page method called by a test must be implemented in the imported page class.
- Page classes must import locator definitions from `../pageObjects/<Feature>PageObjects.js` and use those locators for interactions/assertions.
- Do not create `page-objects/` files. Use `pageObjects/` for locator definitions and `pages/` for page classes.
- Include the exact approved ID and title in the test name.
- Include only approved testcase tags as Playwright `@tags` in the test title.
- Preserve tag meaning and use values from the testcase `tags` field only. Example: testcase tag `Regression` becomes `@Regression`.
- Do not invent `@smoke`, `@regression`, or any other tag when it is not present in the selected testcase.
- Do not derive tags from the testcase title, description, validation type, boundary condition, feature name, or step wording.
- If the testcase `tags` field is empty or missing, the generated Playwright test title must contain no `@tags`.
- Do not convert `priority`, `type`, `category`, `status`, requirement IDs, or any other metadata field into Playwright `@tags`.
- Examples: `Priority: 2-Medium` must not become `@2-Medium`; `Type: Functional` must not become `@Functional`; `Category: Negative` must not become `@Negative`.
- Keep priority/type/category as `test.info().annotations`, comments, or report metadata only.
- Wrap every approved action and expected result in `test.step()`.
- Call page methods from tests; do not use raw selectors in tests.
- Use `expect(locator).toBeVisible()`, `toHaveText()`, `toContainText()`, `toHaveValue()`, `toHaveURL()`, or another retrying assertion.
- Do not use fixed sleeps or `expect(await locator.isVisible()).toBeTruthy()`.
- Generate only `*.test.js`; never create a duplicate `.spec.js` implementation.

## Configuration and security

- Create or update the root `.env` file when approved testcase data contains a URL, username, password, or role.
- Store the application URL in `BASE_URL`.
- Store only valid/default credentials in `TEST_USERNAME` and `TEST_PASSWORD` unless the testcase clearly requires a role-specific prefix.
- Store invalid credentials and all other testcase-specific input data in `test-data/testdata.json` or `test-data/credentials.csv`, not in `.env`.
- Read the application host from `process.env.BASE_URL` through the framework environment helper.
- Read credentials from `process.env.TEST_USERNAME` and `process.env.TEST_PASSWORD`, or through `utils/secrets.js`.
- For negative login scenarios, read invalid username/password from test data and keep `.env` credentials valid/default.
- In `tests/*.test.js`, never write literal URL, username, password, email, or credential strings from testcase steps. Assign variables only from environment helpers or `process.env`, for example `const username = process.env.TEST_USERNAME;`.
- In `pages/*.js` and `pageObjects/*.js`, never write literal URL, username, password, email, or credential strings from testcase steps. Page methods should accept values as parameters or read safe framework environment helpers.
- Do not use literal fallbacks such as `process.env.TEST_PASSWORD || 'demo'`; missing runtime data should fail clearly or be supplied through `.env`.
- `BASE_URL` must be the application origin/base host only. Page methods must navigate with relative paths through `BasePage.open(path)`, for example `await this.open('/web/index.php/auth/login')` inside `navigateToLoginPage()`.
- Use relative paths in executable navigation after `BASE_URL` is configured. Do not pass `process.env.BASE_URL` into `BasePage.open(path)`.
- Tests should call page navigation methods such as `await loginPage.navigateToLoginPage();`; tests should not directly navigate with full URLs.
- Never put a full environment URL, username, password, or secret value in `.test.js`, `pages/*.js`, `pageObjects/*.js`, test titles, step titles, notes, logs, or comments. Do not turn hidden values into visible text such as `Navigate to url process.env.BASE_URL`; use natural safe labels such as `Navigate to login page`.
- Never emit local absolute paths, backend paths, prompt-repository paths, or GitHub tokens.

Bad generated test examples:

```js
await loginPage.open('https://school.moodledemo.net/login/index.php');
await loginPage.login('student', 'moodle26');
const password = process.env.TEST_PASSWORD || 'moodle26';
```

Good generated test examples:

```js
const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;
await loginPage.navigateToLoginPage();
await loginPage.login(username, password);
```

Good negative-data example:

```js
const { invalidUsername, invalidPassword } = testData.login.invalidCredentials;
await loginPage.login(invalidUsername, invalidPassword);
```

## Test-data consistency

- `test-data/testdata.json` is runtime input data, not the primary testcase inventory. Do not make generated tests depend on raw metadata under `testCases`.
- `test-data/testdata.json` content must be strict valid JSON only. Never put JavaScript expressions, `process.env.*`, `undefined`, comments, single-quoted strings, or trailing commas inside JSON.
- If a runtime value should come from `.env`, do not duplicate it in `testdata.json`; read it in the JavaScript test from `process.env` or the framework environment helper.
- JSON values must be literals: strings, numbers, booleans, arrays, objects, or null. For whitespace input, use a quoted string such as `"   "`.
- Structure runtime JSON by business feature/module and scenario data key:

```json
{
  "login": {
    "whitespaceUsername": {
      "username": "   "
    }
  }
}
```

- Do not add `_metadata`, raw testcase inventory, project metadata, source metadata, or traceability details to client `test-data/testdata.json`. Keep client framework data files focused on runtime inputs only.
- If a generated test imports `test-data/testdata.json`, every referenced object path must exist in the same generated or updated `test-data/testdata.json` file.
- Do not reference `testData.login`, `testData.credentials`, `testData.<feature>.<name>`, or any nested key unless that exact object path is present in the returned test-data operation.
- If a test destructures `const { whitespaceUsername } = testData.login;`, then `test-data/testdata.json` must contain `login.whitespaceUsername`.
- If a test reads `testData.login.invalidCredentials.username`, then `test-data/testdata.json` must contain `login.invalidCredentials.username`.
- For each generation, `test-data/testdata.json` must represent the selected testcase runtime data only. Do not preserve stale testcase IDs, stale credentials, stale URLs, or stale rows from previous generations unless those IDs are also selected in the current request.
- Generate `test-data/credentials.csv` only when the generated tests or framework helpers actually read that CSV file. Do not create a placeholder credentials file just because credentials exist in the testcase.
- If an existing test-data file is reused, merge only the selected testcase data needed by the generated tests and remove or replace stale generator-owned data for the same feature.
- Empty-field scenarios must use an explicit test-data object instead of assuming an object exists.

Example: if a test contains:

```js
const { emptyCredentials } = testData.login;
```

then `test-data/testdata.json` must contain:

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

Prefer direct, small feature data objects for generated tests. Do not make tests destructure from the original raw testcase metadata unless that raw metadata shape is intentionally generated and exactly matches the test code.

## Output contract

Return strict JSON only:

```json
{
  "status": "ready | needs_exploration | blocked",
  "tool": "playwright",
  "language": "javascript",
  "frameworkType": "hybrid",
  "frameworkVersion": "1.0.0",
  "testCaseIds": ["TC-001"],
  "operations": [],
  "coverage": [],
  "warnings": []
}
```

For runnable UI test cases, `operations` must contain at minimum:

```json
[
  { "type": "createFile", "path": "pageObjects/<Feature>PageObjects.js", "content": "..." },
  { "type": "createFile", "path": "pages/<Feature>Page.js", "content": "..." },
  { "type": "createFile", "path": "tests/<feature>.test.js", "content": "..." }
]
```

Operation paths must use relative paths or the selected client root. They must not use the reference framework path.

Include `.env` as a generated operation when selected testcase data contains an approved URL, valid/default username, valid/default password, or role. The `.env` operation does not replace the required locator, page, and test operations. Include `test-data/testdata.json` or `test-data/credentials.csv` when testcase-specific or negative data is needed.

Allowed operations:

- `createFile`: create a missing feature file.
- `replaceGeneratedFile`: replace a file proven generator-owned for the same selected IDs.
- `registerFixture`: add one missing fixture import and entry without returning the complete fixture file.
- `addPackageScript`: add one missing script without returning the complete package file.

Generated `.env` is allowed as a `createFile` or `replaceGeneratedFile` operation when it contains only approved base URL and valid/default runtime credentials. Generated test-data files are required when tests reference test-data keys and are allowed for invalid credentials and testcase-specific inputs.

Do not delete files. Do not return a complete `fixtures/test.js` or `package.json` for merge operations.

For every approved step, coverage must contain `testCaseId`, `stepNumber`, `actionMethod`, `assertionMethod`, and `selectorStatus`. Map every selected step exactly once.

## Completion gates

Return `ready` only when:

1. Every requested ID exists in approved input.
2. Exactly one generated test maps to each selected ID.
3. Every action is implemented and every expected result has an assertion.
4. Every selector is verified.
5. All generated paths remain inside the selected client Hybrid framework root, not the reference framework path.
6. JavaScript parses and imports resolve.
7. Fixture names match test destructuring.
10. URLs and credentials from approved testcase data are present only in `.env`; generated JS files read environment variables.
11. Every `testData` object path referenced by generated tests exists in the generated or updated `test-data/testdata.json`.
12. Generated test-data files contain selected testcase IDs/data only and do not carry stale unrelated testcase rows.
13. No fixed waits or immediate boolean visibility assertions are used.
14. `npm run test:list` succeeds after applying operations.

Return `needs_exploration` when behavior is complete but selectors or assertion states are unverified; this response must still include runnable `pageObjects/*.js`, `pages/*.js`, and `tests/*.test.js` operations. Return `blocked` only when required approved steps, expectations, routes, safe data references, or framework files are missing so badly that runnable feature files cannot be produced.




