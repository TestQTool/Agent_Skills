# Mobile Automation - Appium Java BDD Cucumber Project Memory

## Goal

Generate a self-contained `appium-java-bdd-cucumber` mobile automation framework that supports both Android and iOS.

The final repository must not depend on Agent_Skills, prompt files, or StaticFrameworks at runtime.

## Runtime Layout

```text
appium-java-bdd-cucumber/
  pom.xml
  src/test/resources/mobile-config.properties
  src/main/java/pageObjects/<Feature>MobileObjects.java
  src/main/java/screens/<Feature>Screen.java
  src/test/java/stepDefinitions/<Feature>Steps.java
```

## Android And iOS Requirements

- Android capabilities must support `platformName=Android`, `automationName=UiAutomator2`, `appPackage`, `appActivity`, `deviceName`, and app path or installed app mode.
- iOS capabilities must support `platformName=iOS`, `automationName=XCUITest`, `bundleId`, `udid/deviceName`, `platformVersion`, and app path or installed app mode.
- Tests must allow platform selection by CLI/env/config.
- Locators must be platform-aware when Android and iOS accessibility trees differ.
- Prefer accessibility ids on both platforms. Use Android UIAutomator and iOS predicate/class chain only when accessibility ids are unavailable.
- Mobile gestures must be helper methods: tap, long press, swipe, scroll, hide keyboard, context switch, wait for app state.

## Generated Files Per Feature

- `src/main/java/pageObjects/<Feature>MobileObjects.java`: Android and iOS locators/selectors only.
- `src/main/java/screens/<Feature>Screen.java`: screen actions, waits, gestures, and assertions.
- `src/test/java/stepDefinitions/<Feature>Steps.java`: test orchestration only.

## Runtime Commands

Android:

```bash
mvn test -Dcucumber.filter.tags=@smoke -DplatformName=Android
```

iOS:

```bash
mvn test -Dcucumber.filter.tags=@smoke -DplatformName=iOS
```

## Non-Negotiable Rules

- Do not hardcode credentials, device UDIDs, cloud keys, app paths, or local absolute paths.
- Do not mix Android-only locators into iOS flows or iOS-only locators into Android flows.
- Do not use coordinate taps unless no semantic locator exists and the limitation is documented.
- Do not put locators in test files.
