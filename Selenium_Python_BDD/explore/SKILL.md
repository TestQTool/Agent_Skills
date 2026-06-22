# Skill: Explore - Discover Locators and Map App Structure

## When to use this skill

Use before generating scripts for a new feature/module, or when the user asks to explore a page, find locators, map a form, inspect a table, or verify selectors.

---

## Goal

Identify reliable, stable locators and produce a ready-to-use `<feature>_page_objects.py` stub with real Selenium locator tuples.

---

## Step-by-Step Process

### Step 1 - Read app context

Read `app-context.md` for app URLs, roles, dynamic ID notes, iframe notes, and Shadow DOM notes.

### Step 2 - Navigate and inspect

Open the target URL from `config/config.yaml` or environment overrides. Inspect every interactive and asserted element. Prioritize locators in this order:

1. `(By.ID, "...")` - most stable when IDs are not dynamic
2. `(By.CSS_SELECTOR, "[data-testid='...']")`
3. `(By.NAME, "...")` - form inputs
4. `(By.CSS_SELECTOR, "[aria-label='...']")`
5. `(By.CSS_SELECTOR, ".stable-class")` - only when class is stable and meaningful
6. `(By.XPATH, "//tag[@attr='value']")` - last resort
7. Never use absolute XPath such as `/html/body/div[3]/div[2]`

### Step 3 - Group locators by UI section

Map discovered locators into:

- Page heading/title
- Form inputs: text, select, date, checkbox, radio
- Buttons: submit, cancel, save, delete, edit, filter
- Error/success messages
- Table: header, row, cell, pagination, no-data message
- Modal/dialog
- Navigation/breadcrumb

### Step 4 - Generate PageObjects file

Output path: `page_objects/<feature>_page_objects.py`

```python
from selenium.webdriver.common.by import By


class <Feature>PageObjects:
    """Locators only. No WebDriver calls, no methods, no assertions."""

    # Page Heading
    PAGE_HEADING = (By.CSS_SELECTOR, "h1")
    PAGE_SUB_HEADING = (By.CSS_SELECTOR, "h2")

    # Form Inputs
    PRIMARY_INPUT = (By.ID, "primaryField")

    # Buttons
    SUBMIT_BUTTON = (By.CSS_SELECTOR, "button[type='submit']")
    CANCEL_BUTTON = (By.CSS_SELECTOR, "button[type='button']")

    # Messages
    SUCCESS_MESSAGE = (By.CSS_SELECTOR, ".success-message")
    ERROR_MESSAGE = (By.CSS_SELECTOR, "[role='alert']")

    # Table
    TABLE_BODY = (By.CSS_SELECTOR, "table tbody")
    TABLE_ROWS = (By.CSS_SELECTOR, "table tbody tr")

    # UNVERIFIED - update after exploration on live app
    # UNKNOWN_ELEMENT = (By.ID, "TODO")
```

### Step 5 - Flag unstable locators

If a locator uses a generated class, dynamic ID, text-only XPath, or brittle hierarchy, add a comment:

```python
# UNSTABLE - verify after each deploy
```

### Step 6 - Output summary

After generating or updating the file, report:

- Locator count per section
- Unverified or unstable locators
- Dynamic elements needing explicit waits, iframe switching, Shadow DOM handling, or JavaScript click fallback
- Recommended page methods for each interaction type
