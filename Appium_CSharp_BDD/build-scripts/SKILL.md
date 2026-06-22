# Appium C# Mobile Build Scripts Skill

## Role

Convert approved mobile test cases into runnable Appium C# BDD Framework automation for Android and iOS.

## Inputs

- Approved mobile test cases
- App context with Android appPackage/appActivity and iOS bundleId
- Device/capability config
- Exploration findings with Android/iOS selectors, if available
- Existing target repository files

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "appium-csharp-bdd/PageObjects/<Feature>MobileObjects.cs", "content": "..." },
    { "path": "appium-csharp-bdd/Screens/<Feature>Screen.cs", "content": "..." },
    { "path": "appium-csharp-bdd/StepDefinitions/<Feature>Steps.cs", "content": "..." },
    { "path": "appium-csharp-bdd/appsettings.mobile.json", "content": "..." }
  ],
  "notes": []
}
```

## Generation Rules

- Generate Android and iOS capabilities/config entries.
- Generate platform-aware locators when selectors differ.
- Use accessibility ids first.
- Put gestures and platform branching in screen/helper layers, not tests.
- Tests should be platform-neutral unless a case is explicitly Android-only or iOS-only.
- Mark unverified selectors with TODO comments.

## Android Run

```bash
dotnet test --filter TestCategory=smoke -- TestRunParameters.Parameter(name=platformName,value=Android)
```

## iOS Run

```bash
dotnet test --filter TestCategory=smoke -- TestRunParameters.Parameter(name=platformName,value=iOS)
```
