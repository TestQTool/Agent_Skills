# SKILL: generate-tests

Generate EXACTLY 30 structured, non-duplicate test cases. Output plain text only.

## Rules

1. Every title starts with `Verify that ...`.
2. Include TYPE, PRIORITY, TAGS, TESTCASE, and 4 to 5 STEPS.
3. Allowed TYPE values: FUNCTIONAL_POSITIVE, FUNCTIONAL_NEGATIVE, FUNCTIONAL_EDGE, API, SECURITY, PERFORMANCE, MOBILE_PERMISSION, MOBILE_INTERRUPTION.
4. Allowed PRIORITY values: High, Medium, Low.
5. Allowed TAGS values: Smoke, Regression, API, Security, Performance, Android, iOS.
6. STEP FORMAT: `STEP: action -> expected result`.
7. Do not include selectors, source code, backend internals, device IDs, tokens, or local paths.

## Output Example

TYPE: FUNCTIONAL_POSITIVE
PRIORITY: High
TAGS: Smoke
TESTCASE: Verify that user can complete the primary login flow
STEP: Open the target application -> Application should open successfully
STEP: Enter valid role-based credentials -> Credentials should be accepted
STEP: Submit the login request -> Login request should be processed
STEP: Verify the landing page is displayed -> User should land on the expected page
