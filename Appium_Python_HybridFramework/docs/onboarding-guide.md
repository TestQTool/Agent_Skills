# Appium Python Hybrid Framework Mobile Onboarding Guide

## Skill Set

| Skill | Purpose |
|-------|---------|
| `explore` | Explore Android/iOS app screens and capture locators, gestures, screenshots, and flows |
| `generate-tests` | Generate exactly 30 mobile test cases from requirements/context |
| `build-scripts` | Convert approved mobile test cases into runnable automation |
| `run-ready-framework` | Verify Android and iOS run readiness |
| `heal` | Repair broken Android/iOS locators |

## Required Mobile Setup

- Appium server available locally or in CI/cloud.
- Android SDK/emulator or connected Android device.
- Xcode/iOS simulator or connected iOS device for iOS execution.
- App artifacts or installed-app identifiers configured without hardcoded local paths.

## Expected Commands

Android:

```bash
pytest -m smoke --platform Android
```

iOS:

```bash
pytest -m smoke --platform iOS
```

## Safety Rules

- Use environment variables for app paths, cloud credentials, device ids, and server URL.
- Keep platform capabilities in config files.
- Keep locators platform-aware.
- Capture permission alerts and native/webview context switching rules in app context.
