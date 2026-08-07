# Selenium Java BDD Run Healing

Use this file when generated `Selenium_Java_BDD` automation fails during Run Automation. These rules repair generated client automation only. They do not create new business test cases and they do not modify reference framework files.

## Scope

Apply these healing rules only when all are true:

- Tool/framework is `Selenium`.
- Language is `Java`.
- Framework type is `BDD`.
- Failure comes from a generated client run in the selected framework root.
- The patch can be applied inside the isolated Run Automation workspace and rerun before push.

Allowed generated files to patch:

- `src/test/java/**/*`
- `src/test/resources/**/*`
- `src/main/java/**/*`
- `test-data/**/*`
- `pom.xml`

Do not modify:

- `D:\skills\Agent_Skills`
- `D:\frameworks\StaticFrameworks`
- Reference framework folders.
- Framework-owned drivers, bootstraps, global hooks, report listeners, build wrappers, lockfiles, or package managers unless explicitly requested.
- Files outside the selected generated client framework root.

## Healing Flow

1. Read failed run logs, selected script path, generated files, error context, screenshots/traces when available, and current environment/test-data files.
2. Classify the failure before editing anything.
3. Heal only automation defects strongly supported by evidence.
4. Apply the smallest patch to generated files inside the isolated workspace.
5. Rerun the same selected script/spec/scenario in headless/non-interactive mode.
6. Push healed code back to the selected generated branch only after rerun passes.
7. If rerun fails, do not push. Return manual review or report the remaining failure.

Maximum auto-heal attempts: `1` per selected script.

## Healable Automation Defects

Treat as healable:

- Locator/object not found because generated selector or object mapping is wrong.
- Strict/ambiguous locator caused by weak generated selector.
- Missing generated method, keyword, fixture, page/screen class, step definition, request client, or helper that the selected test calls.
- Missing or stale generated test-data key, CSV row/header, environment variable, or request body used by the selected test.
- Wrong generated import path, class casing, package/module name, or file placement.
- Generated code hardcodes runtime data that should come from environment/config/test data.

Treat as healable when the run reports no discovered tests, for example `NoTestsDiscoveredException: Suite [runner.SmokeRunner] did not discover any tests`:

- Missing generated `.feature` file for a selected test case → create `src/test/java/features/<Feature>.feature` with the selected testcase scenario(s), the test case ID tag, and a runnable runner tag.
- Generated feature file lacks the runnable runner tag required by the failing runner (`@smoke` for SmokeRunner, `@regression` for RegressionRunner) → add the missing runnable tag from the selected test case `tags`, never invent business tags.
- Generated feature file carries only `@template` → that tag is filtered out by every runner; replace it with the test case ID tag plus a runnable runner tag.
- Step definitions do not verbatim-match the Gherkin step text → align the `@Given`/`@When`/`@Then` annotation text to the feature file, or align the feature text to the approved testcase step wording, keeping one source of truth.
- Page class missing `import base.BasePage;`, not extending `BasePage`, or missing the `(WebDriver driver)` constructor → patch the generated page class.
- Page object class missing Selenium `By` locators or declaring methods → keep `pageObjects` as `public static final By` fields only.

When a run discovers zero tests, inspect the generated branch before patching: confirm whether feature/step/page/page-object files exist and whether the selected runner's tag filter matches the generated tags. Patch the smallest missing piece. Do not remove or rewrite the framework-owned runner filters or `pom.xml` feature copying to force discovery.

Treat as genuine app/test/environment failure and do not heal:

- Application/API/mobile app behavior genuinely violates the approved expected result.
- Valid credentials fail while selectors/requests are correct.
- Environment URL, device, server, network, auth service, or test account is unavailable.
- Required approved testcase data is absent from input, environment, or existing test data.
- The safe fix would require changing business expectations or inventing data.

When uncertain, return `manual_review` with a clear reason.

## Evidence Rules

- Use run logs and stack traces first.
- Use screenshots, traces, DOM snapshots, mobile page source, API responses, or schema examples when available.
- Prefer stable evidence-backed selectors/object locators/schema fields over guessed wording.
- Do not add absolute XPath, generated classes, positional selectors, random waits, fallback chains that hide ambiguity, or invented credentials.


## Java Compile Healing Rules

For `cannot find symbol: class BasePage` in generated page classes:
- Patch only the generated `src/main/java/pages/<Feature>Page.java` file.
- Ensure the file starts with `package pages;`.
- Add `import base.BasePage;`.
- Add `import org.openqa.selenium.WebDriver;` when constructor uses `WebDriver`.
- Keep the class as `public class <Feature>Page extends BasePage`.
- Keep the constructor as `public <Feature>Page(WebDriver driver) { super(driver); }`.
- Do not create a duplicate `BasePage` class and do not move framework-owned files.
## Test Data Healing Rules

If a test references missing data, patch only the generated test-data/config file and use only selected testcase data or existing approved runtime configuration.

Do not invent usernames, passwords, messages, product names, IDs, URLs, request payload fields, or business values. If data is missing from approved context, return `manual_review`.

## Output Contract

Return strict JSON only. Do not include text outside the JSON object.

```json
{
  "status": "fixed | manual_review",
  "summary": "short explanation",
  "files": [
    {
      "path": "selected-client-root/path/to/File.ext",
      "content": "full updated file content"
    }
  ],
  "reason": "only required for manual_review"
}
```

File paths must stay inside the selected generated client framework root. Never output local absolute paths, backend temp paths, `Agent_Skills/`, `StaticFrameworks/`, or reference repository paths.

## Completion Gate

A heal is complete only when:

1. The patch changes only generated client files.
2. The reason is supported by logs, screenshots, traces, source evidence, API/mobile evidence, or selected testcase data.
3. The same script/spec/scenario is rerun in the isolated workspace.
4. The rerun passes.
5. Only then are healed files pushed to the selected generated branch.

## Qentrix Standard Healing Contract

This healing file is for Selenium_Java_BDD using Selenium / Java / BDD Cucumber. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this tool's own repair patterns and generated file zones.

- Heal generated client automation only.
- Do not patch D:\skills, D:\frameworks, Agent_Skills, StaticFrameworks, updateagentskill, Web Automation, backend code, or reference framework files.
- Apply the smallest evidence-backed patch inside the selected generated client framework root.
- Prefer stable selectors, explicit waits for real state, correct imports, correct data keys, and tool-native patterns.
- Do not hide instability with arbitrary sleeps, broad fallback selectors, swallowed exceptions, or increased retry counts.
- Return manual_review when the safe fix requires missing approved data, application behavior changes, environment repair, or unsupported evidence.
- Healed files are valid for push only after rerun succeeds according to backend run policy.

## Matching Static Framework Healing Boundary

Mapped updated static framework: D:\frameworks\StaticFrameworks\Web Automation\selenium\java\bdd

- Run command: mvn test
- Test pattern: src/test/java/features/**/*.feature
- Generated output must follow this mapped framework structure and file zones.
- Use Playwright JavaScript Hybrid as quality reference only; this mapped framework is the source of truth for paths, runner commands, dependencies, and language syntax.
- Do not generate files for another framework path unless the user explicitly changes the selected tool/language/framework combination.

## Consolidated Legacy Healing Notes

These points were retained from older healing support folders before those folders were removed. Treat them as supporting guidance under the main healing contract above.

From heal\SKILL.md:
- # Skill: Heal â€” Fix Failing Tests and Broken Locators
- ## When to use this skill
- - App UI changes (locators broke)
- - Feature file / step definition mismatch
- - Framework upgrade
- - New environment with different selectors
- ## Triage Process
- ### Step 1 â€” Read the failure
- ### Step 2 â€” Classify the failure
- ### Step 3 â€” Heal by category
- #### Locator broken (NoSuchElementException / TimeoutException)
- 1. Navigate to the URL in the failing step
- 2. Re-inspect the element using browser DevTools
- 3. Find a new stable locator using the priority from `explore/SKILL.md`


