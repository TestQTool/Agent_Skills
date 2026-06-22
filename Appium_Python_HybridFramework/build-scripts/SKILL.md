# Appium Python Mobile Build Scripts Skill

## Role

Convert approved mobile test cases into runnable Appium Python Hybrid Framework automation for Android and iOS.

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
    { "path": "appium-python-hybrid/page_objects/<feature>_mobile_objects.py", "content": "..." },
    { "path": "appium-python-hybrid/screens/<feature>_screen.py", "content": "..." },
    { "path": "appium-python-hybrid/tests/test_<feature>_mobile.py", "content": "..." },
    { "path": "appium-python-hybrid/config/mobile_config.yaml", "content": "..." }
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
pytest -m smoke --platform Android
```

## iOS Run

```bash
pytest -m smoke --platform iOS
```
