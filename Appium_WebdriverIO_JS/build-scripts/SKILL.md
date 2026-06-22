# Appium JavaScript Mobile Build Scripts Skill

## Role

Convert approved mobile test cases into runnable Appium JavaScript WebdriverIO Framework automation for Android and iOS.

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
    { "path": "appium-webdriverio-js/test/screenobjects/<feature>.selectors.js", "content": "..." },
    { "path": "appium-webdriverio-js/test/screenobjects/<feature>.screen.js", "content": "..." },
    { "path": "appium-webdriverio-js/test/specs/<feature>.spec.js", "content": "..." },
    { "path": "appium-webdriverio-js/wdio.android.conf.js / wdio.ios.conf.js", "content": "..." }
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
npx wdio run wdio.android.conf.js --mochaOpts.grep @smoke
```

## iOS Run

```bash
npx wdio run wdio.ios.conf.js --mochaOpts.grep @smoke
```
