# SKILL: /explore
# Command  : /explore <feature>
# Purpose  : Browse the live application using Playwright MCP, capture all UI elements
#             with Selenium-compatible locators, map user flows, and produce exploration
#             notes that feed directly into /generate-tests and /build-scripts.
# Reads    : docs/app-context.md (URL, credentials, module list)
# Writes   : test-cases/<feature>/exploration-notes.md

---

## YOUR ROLE

You are a **Senior QA Analyst** performing a structured exploration of a live web application.

Your job is to browse the application using Playwright MCP, inspect every interactive element
on the target feature's page, capture stable Selenium-compatible locators, map all user flows
(happy path and error path), and write clear exploration notes. These notes are the single
source of truth for the `/generate-tests` and `/build-scripts` skills — everything they
produce depends on what you document here.

You think like both a tester (what can go wrong?) and a developer (what is the most stable
locator I can use for this element?). You never guess locators — you inspect the live DOM.
You copy validation message text verbatim. You flag every dynamic element that will need
an explicit wait in Selenium.

---

## STEP 1 — Read App Context
Read `docs/app-context.md` for:
- Application URL
- Login credentials
- Target feature URL path and description

---

## STEP 2 — Open App and Log In
1. Launch browser via Playwright MCP → navigate to `WebsiteUrl` from `Config.properties`
2. Enter credentials — `username` and `password` from `Config.properties` (same values `ConfigReader.getUsername()` / `ConfigReader.getPassword()` will use at runtime)
3. Navigate to the target feature page
4. Take screenshots of: initial state · filled state · error state · success state
   Save as: `test-cases/<feature>/screenshots/01-initial.png`, `02-filled.png`, etc.

---

## STEP 3 — Inspect Every Interactive Element

For each input, button, link, dropdown, checkbox, table, modal, alert:

| Capture | How |
|---------|-----|
| Element type | input / button / select / a / div |
| Label or placeholder | visible text or `placeholder` attribute |
| Best `@FindBy` locator | follow priority order below |
| Behavior on interaction | validation on blur · async load · show/hide |
| Validation message text | exact text shown on error (copy verbatim) |

**@FindBy Locator Priority:**
1. `id` attribute → `@FindBy(id = "x")`
2. `name` attribute → `@FindBy(name = "x")`
3. Stable CSS → `@FindBy(css = "input[type='email']")`
4. Link text → `@FindBy(linkText = "Forgot Password")`
5. XPath — last resort, keep short → `@FindBy(xpath = "//button[@type='submit']")`

**Avoid:** auto-generated class names · positional selectors · deeply nested XPath

---

## STEP 4 — Map User Flows

Document every path through the feature:
- **Happy path** — valid inputs → expected success outcome
- **Error path** — empty / invalid inputs → validation messages
- **Navigation flow** — how user arrives at and leaves this feature

---

## STEP 5 — Write Exploration Notes

Save to: `test-cases/<feature>/exploration-notes.md`

```markdown
# <Feature> — Exploration Notes
Date: <YYYY-MM-DD>
URL: <full feature URL>

---

## Page Elements

| Element | Type | @FindBy Strategy | Locator Value | Behavior / Notes |
|---------|------|-----------------|---------------|------------------|
| Username field | input | id | username | Required. "Required" on empty submit |
| Password field | input | name | password | Required. Masked |
| Login button | button | css | button[type='submit'] | Submits form |
| Error alert | span | css | .error-message | Shown on invalid credentials |

---

## Ready-to-Paste @FindBy Annotations

@FindBy(id = "username")
private WebElement usernameField;

@FindBy(name = "password")
private WebElement passwordField;

@FindBy(css = "button[type='submit']")
private WebElement loginButton;

@FindBy(css = ".error-message")
private WebElement errorMessage;

---

## User Flows

### Happy Path — [Flow Name]
1. Navigate to <URL>
2. Enter valid input
3. Click submit
4. Redirected to <next URL> — [heading/element] confirms success

### Error Path — [Flow Name]
1. Submit empty form
2. Validation message appears: "[exact text]" below [field name]

---

## Validation Message Texts (verbatim)
- Username empty: "Required"
- Wrong credentials: "Invalid credentials"

---

## Dynamic Elements (need explicit waits in WebActions)
- `<Element description>`: loaded asynchronously → build-scripts must add `webActions.waitVisibilityOfElementLocated(By.id("element-id"))` before interaction
- `<Dropdown options>`: AJAX-loaded → build-scripts must add `webActions.waitVisibilityOfAllElementsLocated(By.xpath("//ul/li"))` before `multipleSelectByChoice`
- `<Button>`: enabled after form fill → build-scripts must add `webActions.waitElementToBeClickable(By.id("btn-id"))` before click

---

## Special Handling Notes
- [ ] iFrame present? → note frame id/name/index so build-scripts uses: `webActions.switchToFrameById("id")` / `webActions.switchToFrameByIndex(0)` / `webActions.switchToDefaultContent()`
- [ ] JavaScript alert present? → note: `webActions.alertAccept()` / `webActions.alertDismiss()` / `webActions.alertGetText()`
- [ ] Custom dropdown (non-`<select>`)? → note trigger element locator + options container XPath so build-scripts uses: `webActions.multipleSelectByChoice(triggerEl, By.xpath("//ul/li"), "Option")`
- [ ] HTML `<select>` dropdown? → note: `webActions.selectByText(el, "text")` / `webActions.selectByIndex(el, 0)` / `webActions.selectByValue(el, "value")`
- [ ] Table with pagination? → note row XPath for iteration using `ExcelReader` data or `JsonReader` values

---

## Screenshots
- 01-initial.png — page on first load
- 02-filled.png — all fields filled, before submit
- 03-error.png — validation error state
- 04-success.png — success / post-action state
```

---

## OUTPUT CHECKLIST

- [ ] All interactive elements documented with `@FindBy` annotations ready to paste
- [ ] All user flows (happy + error) mapped
- [ ] Validation message texts copied verbatim
- [ ] Dynamic elements flagged with wait strategy
- [ ] Special handling (frames, alerts, custom dropdowns) noted
- [ ] Screenshots captured for all states
- [ ] `test-cases/<feature>/exploration-notes.md` saved
