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

Reject plaintext credentials, tokens, cookies, and other secrets. Accept secret references such as `HR_ADMIN`, `TEST_USERNAME`, or a CI secret name.

Do not load or invoke a test-case-generation skill. Do not create, expand, merge, split, reprioritize, or supplement test cases.

## Target framework contract

Target framework root:

```text
web-automation/playwright/javascript/hybrid
```

Generate feature files only:

```text
page-objects/<feature>.locators.js
pages/<Feature>Page.js
tests/<feature>.test.js
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
3. Map every approved action to one page method.
4. Map every approved expected result to a Playwright web-first assertion.
5. Use verified selector evidence as the primary selector source.
6. If selector evidence is missing, infer only readable selectors and return `needs_exploration`.
7. Generate exactly one Playwright test for each selected test-case ID.
8. Reuse existing files and fixtures without removing unrelated content.
9. Return deterministic JSON operations and complete step coverage.

Technical navigation required to execute an approved action may be implemented inside a page method. Record it in coverage with `technical: true`; do not turn it into a new business scenario or expectation.

## Locator rules

Keep locators only in `page-objects/*.locators.js` as factory functions:

```js
export const vacancyLocators = Object.freeze({
  saveButton: (page) => page.getByRole('button', { name: 'Save' })
});
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
- Put business actions and assertions in `pages/*.js`.
- Use one meaningful action or assertion per page method.
- Register page classes in the existing `fixtures/test.js` using lower-camel-case names.
- Import `test` only from `../fixtures/test.js`.
- Include the exact approved ID and title in the test name.
- Include only approved suite tags.
- Wrap every approved action and expected result in `test.step()`.
- Call page methods from tests; do not use raw selectors in tests.
- Use `expect(locator).toBeVisible()`, `toHaveText()`, `toContainText()`, `toHaveValue()`, `toHaveURL()`, or another retrying assertion.
- Do not use fixed sleeps or `expect(await locator.isVisible()).toBeTruthy()`.
- Generate only `*.test.js`; never create a duplicate `.spec.js` implementation.

## Configuration and security

- Read the application host from `BASE_URL`.
- Use relative paths in executable navigation.
- Resolve credentials and tokens at runtime from environment or a secret provider.
- Never put a full environment URL or secret value in source, test titles, step titles, test data, notes, logs, or output JSON.
- Never emit local absolute paths, backend paths, prompt-repository paths, or GitHub tokens.

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

Allowed operations:

- `createFile`: create a missing feature file.
- `replaceGeneratedFile`: replace a file proven generator-owned for the same selected IDs.
- `registerFixture`: add one missing fixture import and entry without returning the complete fixture file.
- `addPackageScript`: add one missing script without returning the complete package file.

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
8. No secret, full URL, local path, backend path, or prompt path is present.
9. No fixed waits or immediate boolean visibility assertions are used.
10. `npm run validate` and `npm run test:list` succeed after applying operations.

Return `needs_exploration` when behavior is complete but selectors or assertion states are unverified. Return `blocked` when required approved steps, expectations, routes, safe data references, or framework files are missing.

