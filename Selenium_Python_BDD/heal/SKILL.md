# Skill: Heal - Fix Failing Tests and Broken Locators

## When to use this skill

Use when Selenium Python BDD tests fail after UI changes, locator drift, feature/step mismatch, framework upgrade, timing issues, or environment differences.

---

## Triage Process

### Step 1 - Read the failure

Get the exact error from terminal logs and reports:

```text
reports/allure-results/        <- visual report through allure serve
reports/behave-report.json     <- machine-readable if configured
reports/junit/                 <- CI failure details
reports/screenshots/           <- screenshot at failing step
```

Identify the scenario, step text, exception, page, and locator involved.

### Step 2 - Classify the failure

| Exception | Root Cause Category |
|-----------|---------------------|
| `NoSuchElementException` | Locator broken |
| `TimeoutException` | Locator broken or timing issue |
| `StaleElementReferenceException` | Timing / page reload |
| `AssertionError` | Expected value or app behavior changed |
| `Undefined step` | Step text mismatch or missing step definition |
| `AmbiguousStep` | Duplicate step text |
| `AttributeError` on context | Page/context not initialized |
| `SessionNotCreatedException` | Browser/driver/runtime mismatch |

### Step 3 - Heal by category

#### Locator broken

1. Navigate to the failing page state.
2. Re-inspect the element using browser DevTools.
3. Choose a stable locator using `explore/SKILL.md` priority.
4. Update only `page_objects/<feature>_page_objects.py` when the interaction contract is unchanged.
5. Add a comment with the date and previous locator.
6. Do not change steps or page methods unless the UI behavior changed.

#### Step text mismatch

1. Find the failing step in the `.feature` file.
2. Find the closest decorator in `features/steps/`.
3. Either adjust the feature wording to match a reusable business step or update the decorator to match the feature wording.
4. Preserve business language; do not add selectors or implementation details to Gherkin.

#### AssertionError

1. Identify the page assertion that failed.
2. Confirm whether the expected text, status, URL, count, or behavior changed.
3. Update page assertion or test data only after confirming the product expectation.
4. Never weaken assertions just to make the run green.

#### Timing issue

Add explicit waits in the page method, not in the step definition:

```python
# Before
self.click(LeaveManagementPageObjects.SUBMIT_BUTTON)

# After
self.wait_until_clickable(LeaveManagementPageObjects.SUBMIT_BUTTON, timeout=20)
self.click(LeaveManagementPageObjects.SUBMIT_BUTTON)
```

Avoid caching `WebElement` objects across page transitions. Store locators, not elements.

#### Context initialization issue

Verify the page object is initialized before use:

```python
context.leave_management_page = LeaveManagementPage(context.driver)
```

Prefer common Background/login/navigation steps or framework hooks for shared initialization.

---

## Self-Healing Locator Strategy

When an element changes frequently, keep primary and fallback locators in page objects and resolve in the page class:

```python
class LeaveManagementPageObjects:
    SUBMIT_BUTTON = (By.ID, "submitBtn")
    SUBMIT_BUTTON_FALLBACK = (By.CSS_SELECTOR, "button[type='submit']")
```

```python
def _resolve_clickable(self, primary, fallback):
    try:
        self.wait_until_clickable(primary, timeout=5)
        return primary
    except TimeoutException:
        return fallback
```

Use fallback chains sparingly. Prefer fixing unstable locators with better app attributes such as `data-testid`.

---

## Post-Heal Checklist

After fixing:

- Run the specific failing scenario: `behave --tags=@TC-XXX-NNN`.
- Verify it passes repeatedly if the failure looked flaky.
- Run the full feature tag: `behave --tags=@<featureName>`.
- Confirm no locators moved into page classes or step definitions.
- Document any remaining unverified locator.
