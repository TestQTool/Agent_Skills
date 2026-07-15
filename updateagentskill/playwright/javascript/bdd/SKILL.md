---
name: bdd
description: Generate Playwright JavaScript BDD automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation that must create Gherkin scenarios, playwright-bdd step definitions, locator modules, page classes, and fixtures compatible with the matching BDD static framework; never use this skill to create test cases or invent business scenarios.
---

# Playwright JavaScript BDD Script Generation

Generate feature-specific automation for the Playwright JavaScript BDD framework using `playwright-bdd`. Treat selected approved test cases as the only behavioral source of truth.

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
web-automation/playwright/javascript/bdd
```

Generate feature files only:

```text
features/<feature>.feature
step-definitions/<feature>.steps.js
page-objects/<feature>.locators.js
pages/<Feature>Page.js
```

Update only when needed:

```text
fixtures/test.js
package.json
```

Never edit `.features-gen`; `bddgen` owns it. Never regenerate or replace framework-owned configuration, `core`, utilities, BDD bootstrap fixture, validators, templates, health files, reporters, or lockfiles.

## Workflow

1. Validate the selected IDs and required step fields.
2. Inspect existing feature, step, page, locator, and fixture files.
3. Map exactly one selected test-case ID to one tagged Gherkin scenario.
4. Preserve approved behavior and order while applying minimal Gherkin grammar normalization.
5. Map each Gherkin step to exactly one step definition and page method.
6. Map every approved expected result to a Playwright web-first assertion.
7. Use verified selector evidence as the primary selector source.
8. If selector evidence is missing, infer only readable selectors and return `needs_exploration`.
9. Reuse step definitions only when wording, behavior, and data meaning are identical.
10. Return deterministic JSON operations and complete step coverage.

Technical navigation required to execute an approved action may be implemented inside a page method. Record it in coverage with `technical: true`; do not create a new scenario or expected result.

## Gherkin rules

- Add a sanitized test-case tag such as `@TC_1802`.
- Add only approved suite tags such as `@smoke` or `@regression`.
- Use the approved title as the Scenario title with minimal grammar normalization.
- Use `Given` for approved preconditions or starting state.
- Use `When` for approved user actions.
- Use `Then` for approved expected results.
- Use `And` only to continue the same semantic phase.
- Use a Scenario Outline only when the selected approved case explicitly contains a data matrix.
- Do not add Background, Examples, hooks, or scenarios unless explicitly required by selected cases or framework execution.
- Never place full environment URLs or secret values in feature text.

## Step, locator, and page rules

- Use JavaScript ESM.
- Import Given/When/Then only from `../fixtures/bdd.js`.
- Keep step definitions thin: validate parameters and call page methods.
- Use Cucumber expressions for approved variable data.
- Avoid ambiguous or overly generic step expressions.
- Keep locators only in `page-objects/*.locators.js` as locator factory functions.
- Extend `core/BasePage.js` in page classes.
- Put business actions and web-first assertions in `pages/*.js`.
- Register page classes in `fixtures/test.js`, which must extend the `test` exported by `playwright-bdd`.
- Do not create another Playwright or BDD test instance.
- Do not use fixed sleeps or immediate boolean visibility assertions.

Prefer selectors in this order: role, label, placeholder, test ID, stable semantic attribute, scoped stable CSS, then readable relationship XPath. Do not use absolute XPath, blind positional selectors, or generated classes.

## Configuration and security

- Read the application host from `BASE_URL`.
- Use relative paths for navigation.
- Resolve credentials and tokens at runtime from environment or a secret provider.
- Never put a full environment URL or secret value in Gherkin, source, test data, notes, logs, or output JSON.
- Never emit local absolute paths, backend paths, prompt-repository paths, or GitHub tokens.

## Output contract

Return strict JSON only:

```json
{
  "status": "ready | needs_exploration | blocked",
  "tool": "playwright",
  "language": "javascript",
  "frameworkType": "bdd",
  "frameworkVersion": "1.0.0",
  "testCaseIds": ["TC-001"],
  "operations": [],
  "coverage": [],
  "warnings": []
}
```

Allowed operations:

- `createFile`: create a missing feature-owned source file.
- `replaceGeneratedFile`: replace a file proven generator-owned for the same selected IDs.
- `upsertScenario`: add or replace exactly one scenario identified by its test-case tag.
- `registerFixture`: add one missing fixture import and entry without returning the complete fixture file.
- `addPackageScript`: add one missing script without returning the complete package file.

Do not delete source files. Do not edit `.features-gen`. Do not return complete fixture or package files for merge operations.

For every approved step, coverage must contain `testCaseId`, `stepNumber`, `gherkinStep`, `stepDefinition`, `pageMethod`, and `selectorStatus`. Map every selected step exactly once.

## Completion gates

Return `ready` only when:

1. Every requested ID exists in approved input.
2. Exactly one tagged Scenario maps to each selected ID.
3. Approved actions and expected results preserve their order and meaning.
4. Every Gherkin step has exactly one matching definition.
5. Every expected result reaches a web-first assertion.
6. Every selector is verified.
7. All paths remain inside the BDD framework root and `.features-gen` is untouched.
8. JavaScript parses, imports resolve, and fixtures extend the playwright-bdd test instance.
9. No secret, full URL, local path, backend path, or prompt path is present.
10. No fixed waits or immediate boolean visibility assertions are used.
11. `npm run validate`, `npm run bddgen`, and `npm run test:list` succeed after applying operations.

Return `needs_exploration` when behavior is complete but selectors or assertion states are unverified. Return `blocked` when required approved steps, expectations, routes, safe data references, or framework files are missing.

