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
updatedplaywrightjshybrid/fixtures/**
updatedplaywrightjshybrid/utils/**
updatedplaywrightjshybrid/package.json
updatedplaywrightjshybrid/playwright.config.js
```

Framework-owned support files can be read for context but must not be rewritten during healing unless the user explicitly asks for framework maintenance.

## Healing Flow

1. Read the failed run logs, selected script path, generated files, screenshot/error context if available, and current `.env`/test-data files.
2. Classify the failure before editing anything.
3. Heal only automation defects that are strongly supported by the evidence.
4. Apply the smallest patch to generated files in the isolated workspace.
5. Rerun the same selected script in headless mode.
6. Push healed code back to the selected generated branch only after the rerun passes.
7. If rerun fails, do not push the patch. Report the remaining failure and the attempted fix.

Maximum auto-heal attempts: `2` per selected script.

## Failure Classification

Treat as healable automation defects:

- Locator not found.
- Locator strict mode violation caused by weak/generated selector.
- Incorrect locator definition or page method selector.
- Test references a missing key in `test-data/testdata.json` or `credentials.csv`.
- Test uses stale generated data from another testcase ID.
- Test hardcodes URL or credentials that should come from `.env` or test data.
- Test imports a generated page class with wrong casing or wrong path.

Treat as genuine app/test failure and do not heal:

- Application returns a real validation error expected by the testcase outcome.
- Login fails with provided valid credentials and selectors are correct.
- Page/API returns 4xx/5xx caused by application behavior.
- Approved testcase expectation is not met after successful interaction.
- Required testcase data is not available in approved input, `.env`, or test data.
- Environment URL is unreachable or redirects to an unrelated page.

When uncertain, stop and report `needs_manual_review` instead of guessing.

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

// Good
this.usernameInput = page.locator('#username').or(page.locator('input[name="username"]'));
```

For common login controls, use evidence-based resilient selectors when available:

```js
this.usernameInput = page.locator('#username').or(page.locator('input[name="username"]'));
this.passwordInput = page.locator('#password').or(page.locator('input[name="password"]'));
this.loginButton = page.locator('#loginbtn').or(page.locator('button[type="submit"]'));
```

Only include fallback selectors that are supported by DOM evidence or stable semantic attributes. Do not add random class names, absolute XPath, nth-child selectors, or positional selectors.

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

Do not invent usernames, passwords, messages, URLs, or business data. If data is missing from approved testcase input, return `needs_manual_review`.

## Runtime Data Rules

`.env` is only for base URL and approved valid/default credentials:

```text
BASE_URL=...
TEST_USERNAME=...
TEST_PASSWORD=...
```

Invalid credentials, empty values, alternate users, form inputs, expected messages, and testcase-specific values belong in test data, not `.env`.

Generated JavaScript in tests, pages, and pageObjects must not contain literal runtime URLs, usernames, passwords, or tokens from testcase steps. It must read them through `process.env`, framework helpers, or test data.

## Patch Output Contract

Return strict JSON only when asked to produce healing operations:

```json
{
  "status": "healed | needs_manual_review | genuine_failure",
  "reason": "short reason",
  "operations": [
    {
      "type": "replaceGeneratedFile",
      "path": "updatedplaywrightjshybrid/pages/LoginPage.js",
      "content": "..."
    }
  ],
  "rerunRequired": true,
  "pushPolicy": "push_only_after_rerun_passes"
}
```

Operation paths must stay inside the selected generated client framework root. Never output paths inside the skill repo or static framework repo.

## Completion Gate

A heal is complete only when:

1. The patch changes only generated client files.
2. The reason is supported by run logs, screenshots, error context, DOM evidence, or selected testcase data.
3. The same script is rerun headlessly.
4. The rerun passes.
5. Only then the healed files are pushed to the selected generated branch.
