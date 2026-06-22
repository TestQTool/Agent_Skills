---
name: explore
description: Explore Android and iOS mobile app screens to capture screenshots, app states, accessibility locators, platform-specific selectors, gestures, permissions, context switches, and gaps for downstream Appium/mobile automation.
---

# Mobile Explore Skill

## Modes

1. Module discovery: map screens, navigation, gestures, permissions, validations, offline states, and platform differences.
2. Test-case-guided exploration: follow selected test cases and capture verified Android/iOS locators and assertions per step.

## Capture

- Platform, device, OS version, app identifier, app state.
- Android selectors: accessibility id, resource-id, UiAutomator, XPath fallback.
- iOS selectors: accessibility id/name, predicate, class chain, XPath fallback.
- Gestures: tap, long press, swipe, scroll, drag/drop, hide keyboard.
- Native alerts, permission dialogs, webview/native context switches.
- Screenshots and gaps.

## Output

Return JSON with pages, elements, Android/iOS selector candidates, recommended selector, wait condition, gesture needed, assertions, business rules, data dependencies, and blockers.
