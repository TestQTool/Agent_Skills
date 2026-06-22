# Run-Ready Mobile Framework Skill

## Role

Verify the generated framework can run on Android and iOS locally or in CI/cloud.

## Required Runtime Files

```text
requirements.txt
config/mobile_config.yaml
page_objects/<feature>_mobile_objects.py
screens/<feature>_screen.py
features/steps/<feature>_steps.py
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
behave --tags=@smoke -D platformName=Android
```

iOS:

```bash
behave --tags=@smoke -D platformName=iOS
```

## Output Contract

Return strict JSON only:

```json
{
  "files": [],
  "missingStaticFiles": [],
  "androidRunCommands": ["behave --tags=@smoke -D platformName=Android"],
  "iosRunCommands": ["behave --tags=@smoke -D platformName=iOS"],
  "warnings": []
}
```
