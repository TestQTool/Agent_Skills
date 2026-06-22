# Appium Python Mobile Build Scripts Skill

## Role

Convert approved mobile test cases into runnable Appium Python BDD Framework automation for Android and iOS.

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
    { "path": "appium-python-bdd/page_objects/<feature>_mobile_objects.py", "content": "..." },
    { "path": "appium-python-bdd/screens/<feature>_screen.py", "content": "..." },
    { "path": "appium-python-bdd/features/steps/<feature>_steps.py", "content": "..." },
    { "path": "appium-python-bdd/config/mobile_config.yaml", "content": "..." }
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
behave --tags=@smoke -D platformName=Android
```

## iOS Run

```bash
behave --tags=@smoke -D platformName=iOS
```
