# Appium Java BDD Cucumber Mobile Standards

## File Outputs Per Feature

```text
src/main/java/pageObjects/<Feature>MobileObjects.java
src/main/java/screens/<Feature>Screen.java
src/test/java/stepDefinitions/<Feature>Steps.java
```

## Locator Rules

- Locator files contain selectors only.
- Store Android and iOS locators separately when they differ.
- Prefer accessibility id/content-desc/name on both platforms.
- Android fallback priority: accessibility id, resource-id, UiAutomator text/description, XPath last.
- iOS fallback priority: accessibility id/name, iOS predicate, iOS class chain, XPath last.
- Never use brittle absolute XPath or coordinate-only locators as the default.

Example:

```text
public static final By LOGIN_BUTTON_ANDROID = AppiumBy.accessibilityId("login");
public static final By LOGIN_BUTTON_IOS = AppiumBy.iOSNsPredicateString("name == \"login\"");
```

## Screen/Page Rules

- Screen files contain actions, waits, gestures, assertions, and platform locator resolution.
- Use helper methods for tap, type, swipe, scroll, long press, hide keyboard, context switch, permission handling, and app reset.
- Assertions must wait for stable mobile state before reading text or visibility.

Example action:

```text
public void tapLogin() { tap(platformLocator(LOGIN_BUTTON_ANDROID, LOGIN_BUTTON_IOS)); }
```

## Test Rules

- Tests orchestrate screen methods only.
- Every test includes TC-ID and smoke/regression tag.
- Tests must run for Android and iOS unless explicitly platform-specific.
- Avoid test order dependencies and shared mutable device state.

Example:

```text
@When("the user logs in on mobile")
public void userLogsInOnMobile() {
    loginScreen.loginAs("Admin");
}
```

## Capabilities Rules

Required Android keys: `platformName`, `automationName=UiAutomator2`, `deviceName`, `app` or `appPackage/appActivity`.

Required iOS keys: `platformName`, `automationName=XCUITest`, `deviceName` or `udid`, `platformVersion`, `app` or `bundleId`.

Do not commit real UDIDs, cloud access keys, app file paths, or signing secrets.
