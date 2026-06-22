# SKILL: heal
# Purpose: Diagnose broken Android/iOS mobile selectors and return a precise fix.

## INPUT

- Failure details and platform.
- Failed selector.
- Screenshot/page source if available.
- Current locator file content.

## HEALING PRIORITY

Android: accessibility id, resource-id, UiAutomator, scoped XPath.
iOS: accessibility id/name, predicate, class chain, scoped XPath.

Do not rewrite tests, change screen method names, add sleeps, or replace semantic locators with coordinates unless no alternative exists.

## OUTPUT FORMAT

```json
{
  "file": "src/main/java/pageObjects/<Feature>MobileObjects.java",
  "platform": "Android | iOS",
  "line": "<original selector line>",
  "replacement": "<new selector line>",
  "reason": "<one sentence>"
}
```
