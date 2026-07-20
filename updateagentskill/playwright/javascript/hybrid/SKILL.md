---
name: hybrid
description: Generate Playwright JavaScript Hybrid automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation that must create locator modules, page classes, fixtures, and Playwright tests compatible with the matching Hybrid static framework; never use this skill to create test cases or invent business scenarios.
---

# Playwright JavaScript Hybrid Script Generation

Generate feature-specific automation for the Playwright JavaScript Hybrid framework. Treat selected approved test cases as the only behavioral source of truth.

## Required input

Require:

- Framework version and existing target-repository files.
- Selected approved cases containing `id`, `title`, ordered `steps`, and optional approved `tags`, `preconditions`, and `dataReferences`.
- Every step containing `number`, `action`, and `expected`.
- Application routes and safe runtime data references required by those steps.
- Selector evidence when production-ready output is requested.

Use only data that is present in the selected approved test cases. Do not invent URLs, users, passwords, tags, or roles.
When approved test-case steps contain an application URL or credential value, move those values into the generated root `.env` file and consume them through environment variables. Do not hardcode those values in tests, page classes, locators, comments, or step titles.
Reject tokens, cookies, private keys, and platform secrets. Accept test-environment credentials only when they are explicitly present in the approved test case, and store them only in `.env`.

Runtime data rule is mandatory: if a testcase step says `Navigate to url "https://..."`, `Enter username "..."`, or `password "..."`, those literal values must appear only in `.env` and never in any generated `.js` file. Generated tests and page objects must read them from `process.env.BASE_URL`, `process.env.TEST_USERNAME`, and `process.env.TEST_PASSWORD` or framework helpers that expose those environment values.

Do not load or invoke a test-case-generation skill. Do not create, expand, merge, split, reprioritize, or supplement test cases.

## Target framework contract

Target framework root:

```text
web-automation/playwright/javascript/hybrid
```

Generate feature files only:

```text
.env
pageObjects/<Feature>Page.js
tests/<feature>.test.js
```

For every selected runnable test case, the response must include generator-owned operations for both:

```text
pageObjects/<Feature>Page.js
tests/<feature>.test.js
```

Do not return only `.env`, only a page object, only coverage, or an empty operations list when selected testcase steps are present. If selectors are uncertain, still generate the page object and test with best-effort accessible selectors and mark the selector status as `needs_exploration` in coverage/warnings.

Update only when needed:

```text
fixtures/test.js
package.json
```

Never regenerate or replace framework-owned configuration, `core`, utilities, validators, templates, health tests, reporters, or lockfiles.

## Workflow

1. Validate the selected IDs and required step fields.
2. Inspect existing feature files before generating operations.
3. Map every approved action to one page method in `pageObjects/<Feature>Page.js`.
4. Map every approved expected result to a Playwright web-first assertion in the same page object.
5. Use verified selector evidence as the primary selector source.
6. If selector evidence is missing, infer only readable selectors, still return runnable feature files, and mark the response `needs_exploration`.
7. Generate exactly one Playwright test for each selected test-case ID.
8. Reuse existing files and fixtures without removing unrelated content.
9. Write approved runtime URL/credential values to `.env`, then read them through `process.env`.
10. Return deterministic JSON operations and complete step coverage.

Technical navigation required to execute an approved action may be implemented inside a page method. Record it in coverage with `technical: true`; do not turn it into a new business scenario or expectation.

## Page object rules

Keep locators/selectors and page actions/assertions together in one page object file:

```js
export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

Prefer selectors in this order:

1. `getByRole` with accessible name.
2. `getByLabel`.
3. `getByPlaceholder`.
4. `getByTestId`.
5. Stable semantic attributes.
6. Scoped stable CSS.
7. Readable relationship XPath.

Do not use absolute XPath, blind positional selectors, generated classes, or selectors copied without evidence.

## Page and test rules

- Use JavaScript ESM.
- Extend `core/BasePage.js` in page classes.
- Put selectors, business actions, and assertions in `pageObjects/*.js`.
- Use one meaningful action or assertion per page method.
- Register page classes in the existing `fixtures/test.js` using lower-camel-case names.
- Import `test` only from `../fixtures/test.js`.
- Import page classes in tests from `../pageObjects/<Feature>Page.js`.
- Do not create `page-objects/*.locators.js` or `pages/<Feature>Page.js`.
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
- Store application URL in `BASE_URL`.
- Store credentials in `TEST_USERNAME` and `TEST_PASSWORD` unless the testcase clearly requires a role-specific prefix.
- Read the application host from `process.env.BASE_URL` through the framework environment helper.
- Read credentials from `process.env.TEST_USERNAME` and `process.env.TEST_PASSWORD`, or through `utils/secrets.js`.
- In `tests/*.test.js`, never write literal URL, username, password, email, or credential strings from testcase steps. Assign variables only from environment helpers or `process.env`, for example `const username = process.env.TEST_USERNAME;`.
- In `pageObjects/*.js`, never write literal URL, username, password, email, or credential strings from testcase steps. Methods should accept values as parameters or read safe framework environment helpers.
- Do not use literal fallbacks such as `process.env.TEST_PASSWORD || 'demo'`; missing runtime data should fail clearly or be supplied through `.env`.
- Use relative paths in executable navigation after `BASE_URL` is configured.
- Never put a full environment URL, username, password, or secret value in `.test.js`, `pageObjects/*.js`, test titles, step titles, notes, logs, or comments.
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
await loginPage.open(process.env.BASE_URL);
await loginPage.login(username, password);
```

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
  { "type": "createFile", "path": "pageObjects/<Feature>Page.js", "content": "..." },
  { "type": "createFile", "path": "tests/<feature>.test.js", "content": "..." }
]
```

Include `.env` as a generated operation when selected testcase data contains an approved URL, username, password, or role. The `.env` operation does not replace the required page object and test operations.

Allowed operations:

- `createFile`: create a missing feature file.
- `replaceGeneratedFile`: replace a file proven generator-owned for the same selected IDs.
- `registerFixture`: add one missing fixture import and entry without returning the complete fixture file.
- `addPackageScript`: add one missing script without returning the complete package file.

Generated `.env` is allowed as a `createFile` or `replaceGeneratedFile` operation when it contains only approved testcase runtime values.

Do not delete files. Do not return a complete `fixtures/test.js` or `package.json` for merge operations.

For every approved step, coverage must contain `testCaseId`, `stepNumber`, `actionMethod`, `assertionMethod`, and `selectorStatus`. Map every selected step exactly once.

## Completion gates

Return `ready` only when:

1. Every requested ID exists in approved input.
2. Exactly one generated test maps to each selected ID.
3. Every action is implemented and every expected result has an assertion.
4. Every selector is verified.
5. All generated paths remain inside the Hybrid framework root.
6. JavaScript parses and imports resolve.
7. Fixture names match test destructuring.
8. URLs and credentials from approved testcase data are present only in `.env`; generated JS files read environment variables.
9. No fixed waits or immediate boolean visibility assertions are used.
10. `npm run validate` and `npm run test:list` succeed after applying operations.

Return `needs_exploration` when behavior is complete but selectors or assertion states are unverified; this response must still include runnable `pageObjects/*.js` and `tests/*.test.js` operations. Return `blocked` only when required approved steps, expectations, routes, safe data references, or framework files are missing so badly that runnable feature files cannot be produced.

