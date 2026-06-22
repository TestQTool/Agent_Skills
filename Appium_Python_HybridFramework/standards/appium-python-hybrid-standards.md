# Appium Python Hybrid Framework Mobile Standards

## File Outputs Per Feature

```text
page_objects/<feature>_mobile_objects.py
screens/<feature>_screen.py
tests/test_<feature>_mobile.py
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
LOGIN_BUTTON_ANDROID = (AppiumBy.ACCESSIBILITY_ID, "login")
LOGIN_BUTTON_IOS = (AppiumBy.IOS_CLASS_CHAIN, "**/XCUIElementTypeButton[`name == \"login\"`]")
```

## Screen/Page Rules

- Screen files contain actions, waits, gestures, assertions, and platform locator resolution.
- Use helper methods for tap, type, swipe, scroll, long press, hide keyboard, context switch, permission handling, and app reset.
- Assertions must wait for stable mobile state before reading text or visibility.

Example action:

```text
def tap_login(self):
    self.tap(self.platform_locator(LoginMobileObjects.LOGIN_BUTTON_ANDROID, LoginMobileObjects.LOGIN_BUTTON_IOS))
```

## Test Rules

- Tests orchestrate screen methods only.
- Every test includes TC-ID and smoke/regression tag.
- Tests must run for Android and iOS unless explicitly platform-specific.
- Avoid test order dependencies and shared mutable device state.

Example:

```text
@pytest.mark.smoke
def test_TC_MOB_001_login_on_mobile(login_screen):
    login_screen.login_as("Admin")
```

## Capabilities Rules

Required Android keys: `platformName`, `automationName=UiAutomator2`, `deviceName`, `app` or `appPackage/appActivity`.

Required iOS keys: `platformName`, `automationName=XCUITest`, `deviceName` or `udid`, `platformVersion`, `app` or `bundleId`.

Do not commit real UDIDs, cloud access keys, app file paths, or signing secrets.
