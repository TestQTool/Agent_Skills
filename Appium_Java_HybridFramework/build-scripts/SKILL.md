# Appium Java Mobile Build Scripts Skill

## Role

Convert approved mobile test cases into runnable Appium Java Hybrid Framework automation for Android and iOS.

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
    { "path": "appium-java-hybrid/src/main/java/pageObjects/<Feature>MobileObjects.java", "content": "..." },
    { "path": "appium-java-hybrid/src/main/java/screens/<Feature>Screen.java", "content": "..." },
    { "path": "appium-java-hybrid/src/test/java/tests/<Feature>MobileTest.java", "content": "..." },
    { "path": "appium-java-hybrid/src/test/resources/mobile-config.properties", "content": "..." }
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
mvn test -Dgroups=smoke -DplatformName=Android
```

## iOS Run

```bash
mvn test -Dgroups=smoke -DplatformName=iOS
```
