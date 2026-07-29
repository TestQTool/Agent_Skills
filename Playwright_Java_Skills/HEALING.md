# Playwright Java Standard Run Healing

Use this file when generated `Playwright_Java_Skills` automation fails during Run Automation. These rules repair generated client automation only. They do not create new business test cases and they do not modify reference framework files.

## Scope

Apply these healing rules only when all are true:

- Tool/framework is `Playwright`.
- Language is `Java`.
- Framework type is `Standard`.
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
