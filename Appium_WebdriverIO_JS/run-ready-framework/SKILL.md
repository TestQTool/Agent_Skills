# Run-Ready Mobile Framework Skill

## Role

Verify the generated framework can run on Android and iOS locally or in CI/cloud.

## Required Runtime Files

```text
package.json
wdio.android.conf.js / wdio.ios.conf.js
test/screenobjects/<feature>.selectors.js
test/screenobjects/<feature>.screen.js
test/specs/<feature>.spec.js
```

## Verification

- Android capabilities are present and environment-driven.
- iOS capabilities are present and environment-driven.
- Appium server URL is configurable.
- Device identifiers, app paths, and cloud credentials are not committed.
- Tests can select platform from CLI/env/config.
- Reports/screenshots/logs are written to a reports folder.

## Acceptance Commands

Android:

```bash
npx wdio run wdio.android.conf.js --mochaOpts.grep @smoke
```

iOS:

```bash
npx wdio run wdio.ios.conf.js --mochaOpts.grep @smoke
```

## Output Contract

Return strict JSON only:

```json
{
  "files": [],
  "missingStaticFiles": [],
  "androidRunCommands": ["npx wdio run wdio.android.conf.js --mochaOpts.grep @smoke"],
  "iosRunCommands": ["npx wdio run wdio.ios.conf.js --mochaOpts.grep @smoke"],
  "warnings": []
}
```
