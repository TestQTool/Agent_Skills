# Robot Framework Robot Mobile Build Scripts Skill

## Role

Convert approved mobile test cases into runnable Robot Framework Robot Appium Library automation for Android and iOS.

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
    { "path": "robotframework-appiumlibrary/resources/locators/<feature>_mobile_locators.resource", "content": "..." },
    { "path": "robotframework-appiumlibrary/resources/pages/<feature>_keywords.resource", "content": "..." },
    { "path": "robotframework-appiumlibrary/tests/<feature>.robot", "content": "..." },
    { "path": "robotframework-appiumlibrary/variables/mobile_config.yaml", "content": "..." }
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
robot -i smoke -v PLATFORM:Android tests
```

## iOS Run

```bash
robot -i smoke -v PLATFORM:iOS tests
```
