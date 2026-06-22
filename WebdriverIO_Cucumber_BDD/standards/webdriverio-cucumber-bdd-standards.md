# WebdriverIO JavaScript/TypeScript Cucumber BDD Framework Coding Standards

## File Outputs Per Feature

```text
test/pageobjects/<feature>.selectors.ts
test/pageobjects/<feature>.page.ts
features/step-definitions/<feature>.steps.ts
```

Framework wiring files:

```text
package.json
wdio.conf.ts
```

## Locator / Selector Rules

- Locator files contain selectors only.
- Do not place WebDriver/browser calls, assertions, waits, or business logic in locator files.
- Group selectors by page area: headings, inputs, buttons, messages, tables, modals, navigation.
- Prefer stable ids, accessibility labels, names, test ids, semantic attributes, readable dynamic XPath, then stable CSS.
- Avoid absolute XPath, generated class names, blind positional selectors, and brittle text-only selectors unless no alternative exists.
- Mark inferred selectors with `TODO: verify selector against live app`.

Example:

```text
export const loginButton = '#login';
```

## Page / Keyword Rules

- Page or keyword files contain interactions, waits, and assertions.
- Use framework helper methods instead of low-level driver calls when helpers exist.
- One method should represent one user action or one assertion.
- Credentials must come from role-based helpers or environment-backed test data.

Example action:

```text
async clickLogin() { await $(loginButton).click(); }
```

Example assertion:

```text
await expect($(dashboardHeading)).toBeDisplayed();
```

## Test / Spec / Feature Rules

- Test files orchestrate behavior only.
- Do not hardcode selectors in tests.
- Every automated case must include a TC-ID and suite marker/tag: `@smoke @TC-XXX-NNN`.
- Use data-driven patterns for repeated flows.
- Keep tests independent and safe for parallel execution unless the framework requires serial execution.

Example:

```text
When('the admin logs in', async () => { await loginPage.loginAs('Admin'); });
```

## Runtime Rules

Run command:

```bash
npx wdio run wdio.conf.ts --cucumberOpts.tags @smoke
```

Do not write absolute local paths, prompt repository URLs, API tokens, GitHub tokens, or secrets into generated files.
