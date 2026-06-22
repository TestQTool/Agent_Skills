# Playwright TypeScript Framework Coding Standards

## File Outputs Per Feature

```text
pageObjects/<feature>PageObjects.ts
pages/<feature>Page.ts
tests/<Feature>.spec.ts
```

Framework wiring files:

```text
package.json
playwright.config.ts
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
export const loginButton: string = '#login';
```

## Page / Keyword Rules

- Page or keyword files contain interactions, waits, and assertions.
- Use framework helper methods instead of low-level driver calls when helpers exist.
- One method should represent one user action or one assertion.
- Credentials must come from role-based helpers or environment-backed test data.

Example action:

```text
async clickLogin(): Promise<void> { await this.waitAndClick(loginButton); }
```

Example assertion:

```text
await expect(this.page.locator(dashboardHeading)).toBeVisible();
```

## Test / Spec / Feature Rules

- Test files orchestrate behavior only.
- Do not hardcode selectors in tests.
- Every automated case must include a TC-ID and suite marker/tag: `@smoke in test title`.
- Use data-driven patterns for repeated flows.
- Keep tests independent and safe for parallel execution unless the framework requires serial execution.

Example:

```text
test('TC-LGN-001 @smoke login with valid credentials', async ({ loginPage }) => { await loginPage.loginAs('Admin'); });
```

## Runtime Rules

Run command:

```bash
npx playwright test --grep @smoke --project=Chrome
```

Do not write absolute local paths, prompt repository URLs, API tokens, GitHub tokens, or secrets into generated files.
