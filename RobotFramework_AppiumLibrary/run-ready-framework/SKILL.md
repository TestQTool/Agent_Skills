# Run-Ready Mobile Framework Skill

## Role

Verify the generated framework can run on Android and iOS locally or in CI/cloud.

## Required Runtime Files

```text
requirements.txt
variables/mobile_config.yaml
resources/locators/<feature>_mobile_locators.resource
resources/pages/<feature>_keywords.resource
tests/<feature>.robot
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
robot -i smoke -v PLATFORM:Android tests
```

iOS:

```bash
robot -i smoke -v PLATFORM:iOS tests
```

## Output Contract

Return strict JSON only:

```json
{
  "files": [],
  "missingStaticFiles": [],
  "androidRunCommands": ["robot -i smoke -v PLATFORM:Android tests"],
  "iosRunCommands": ["robot -i smoke -v PLATFORM:iOS tests"],
  "warnings": []
}
```
