# Run-Ready Mobile Framework Skill

## Role

Verify the generated framework can run on Android and iOS locally or in CI/cloud.

## Required Runtime Files

```text
pom.xml
src/test/resources/mobile-config.properties
src/main/java/pageObjects/<Feature>MobileObjects.java
src/main/java/screens/<Feature>Screen.java
src/test/java/tests/<Feature>MobileTest.java
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
mvn test -Dgroups=smoke -DplatformName=Android
```

iOS:

```bash
mvn test -Dgroups=smoke -DplatformName=iOS
```

## Output Contract

Return strict JSON only:

```json
{
  "files": [],
  "missingStaticFiles": [],
  "androidRunCommands": ["mvn test -Dgroups=smoke -DplatformName=Android"],
  "iosRunCommands": ["mvn test -Dgroups=smoke -DplatformName=iOS"],
  "warnings": []
}
```
