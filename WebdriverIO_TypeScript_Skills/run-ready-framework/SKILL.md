# Run-Ready Framework Skill
# Purpose: Ensure generated automation output is a complete webdriverio-typescript framework that users can clone and run locally.

## Role

You are the final framework packaging reviewer. Make sure the target repository contains everything required to execute WebdriverIO TypeScript tests on a user machine.

## Required Runtime Files

```text
package.json
wdio.conf.ts
test/pageobjects/<feature>.selectors.ts
test/pageobjects/<feature>.page.ts
test/specs/<feature>.spec.ts
```

Recommended:

```text
README.md
.env.template
.gitignore
reports/.gitkeep
```

## Merge Rules

1. Copy missing static framework files from `StaticFrameworks/webdriverio-typescript`.
2. Preserve user files unless they are known generated framework files.
3. Overlay generated feature files from `build-scripts`.
4. Merge dependency/config/wiring files instead of replacing unrelated content.
5. Never push prompt files, Agent_Skills internals, tokens, local absolute paths, or backend-only configuration.

## Local Run Acceptance Criteria

```bash
npx wdio run wdio.conf.ts --mochaOpts.grep @smoke
```

## Output Contract

Return strict JSON only:

```json
{
  "files": [],
  "missingStaticFiles": [],
  "runCommands": [
    "npx wdio run wdio.conf.ts --mochaOpts.grep @smoke"
  ],
  "warnings": []
}
```
