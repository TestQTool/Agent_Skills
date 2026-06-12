# Run-Ready Framework Skill
# Purpose: Ensure generated automation output is a complete framework that users can clone and run locally.

---

## Role
You are the final framework packaging reviewer. Your job is to make sure the target repository contains everything required to execute Playwright tests on a user machine.

This skill is used after `build-scripts` and before pushing files to the user's repository.

---

## Inputs You May Receive

- Static framework file list from `StaticFrameworks/playwright-js`
- Generated files from `build-scripts`
- Existing target repository files
- Selected features/modules
- Target branch and repository path

---

## Required Runtime Files

The target repository must include these files under `playwright-js/`:

```text
package.json
playwright.config.js
CustomReporter.js
global-teardown.js
pages/basePage.js
testFixtures/fixture.js
utils/WebActions.js
utils/testdata.json
test-data/credentials.csv
pageObjects/<feature>Page.js
pages/<feature>Page.js
tests/<Feature>.test.js
```

Recommended:

```text
README.md
.env.template
.gitignore
package-lock.json
```

---

## Merge Rules

1. Copy missing static framework files from StaticFrameworks.
2. Preserve user files already present in the target repository unless they are known generated framework files.
3. Overlay generated feature files from `build-scripts`.
4. Merge `testFixtures/fixture.js` instead of replacing unrelated fixtures.
5. Merge `package.json` scripts instead of replacing unrelated scripts/dependencies.
6. Never push prompt files, Agent_Skills internals, GitHub tokens, local absolute paths, or backend-only configuration.

---

## Fixture Verification

For every generated page class:

- `playwright-js/pages/<feature>Page.js` exists.
- `playwright-js/testFixtures/fixture.js` imports it.
- `fixture.js` exposes `<feature>Page` in `base.extend({ ... })`.
- Tests destructure the same fixture name.

---

## package.json Verification

`playwright-js/package.json` must include:

- Playwright dependency or devDependency.
- Generic `test` script.
- Feature smoke/regression scripts for generated test files.

Example:

```json
"test": "npx playwright test",
"test:Login-Smoke-Chrome": "npx playwright test tests/Login.test.js --grep @smoke --project=Chrome",
"test:Login-Regression-Chrome": "npx playwright test tests/Login.test.js --grep @regression --project=Chrome"
```

---

## Local Run Acceptance Criteria

A user should be able to run:

```bash
git clone <user repo>
cd <repo>/playwright-js
npm install
npx playwright install
npm test
```

A user should also be able to run a generated module script, for example:

```bash
npm run test:Login-Smoke-Chrome
```

---

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "playwright-js/package.json", "content": "..." },
    { "path": "playwright-js/testFixtures/fixture.js", "content": "..." }
  ],
  "missingStaticFiles": ["playwright-js/playwright.config.js"],
  "runCommands": [
    "cd playwright-js",
    "npm install",
    "npx playwright install",
    "npm test"
  ],
  "warnings": []
}
```

If no file changes are required, return an empty `files` array and include the run commands.
