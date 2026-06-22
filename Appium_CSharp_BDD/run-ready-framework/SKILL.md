# Run-Ready Mobile Framework Skill

## Role

Verify the generated framework can run on Android and iOS locally or in CI/cloud.

## Required Runtime Files

```text
*.csproj
appsettings.mobile.json
PageObjects/<Feature>MobileObjects.cs
Screens/<Feature>Screen.cs
StepDefinitions/<Feature>Steps.cs
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
dotnet test --filter TestCategory=smoke -- TestRunParameters.Parameter(name=platformName,value=Android)
```

iOS:

```bash
dotnet test --filter TestCategory=smoke -- TestRunParameters.Parameter(name=platformName,value=iOS)
```

## Output Contract

Return strict JSON only:

```json
{
  "files": [],
  "missingStaticFiles": [],
  "androidRunCommands": ["dotnet test --filter TestCategory=smoke -- TestRunParameters.Parameter(name=platformName,value=Android)"],
  "iosRunCommands": ["dotnet test --filter TestCategory=smoke -- TestRunParameters.Parameter(name=platformName,value=iOS)"],
  "warnings": []
}
```
