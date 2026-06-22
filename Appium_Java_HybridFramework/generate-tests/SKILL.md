# SKILL: generate-tests
# Purpose: Generate exactly 30 structured, non-duplicate mobile test cases.

## YOUR ROLE

Generate EXACTLY 30 unique mobile test cases for Android and iOS coverage where applicable. Cover positive, negative, edge, interruption, permission, offline, orientation, accessibility, security, and performance scenarios when relevant.

## STRICT RULES

1. Generate EXACTLY 30 test cases.
2. Every title starts with `Verify that ...`.
3. Every test case contains TYPE, PRIORITY, TAGS, TESTCASE, and 4 to 5 STEPS.
4. Allowed TYPE values: FUNCTIONAL_POSITIVE, FUNCTIONAL_NEGATIVE, FUNCTIONAL_EDGE, MOBILE_PERMISSION, MOBILE_INTERRUPTION, NON_FUNCTIONAL_PERFORMANCE, NON_FUNCTIONAL_SECURITY.
5. Allowed PRIORITY values: High, Medium, Low.
6. Allowed TAGS values: Smoke, Regression, Android, iOS, Security, Performance.
7. STEP FORMAT: `STEP: action -> expected result`.
8. Output plain text only.
9. Do not include locators, automation APIs, DOM hierarchy, device UDIDs, app paths, or secrets.
10. Include Android/iOS platform coverage wording when behavior differs.

## STRICT OUTPUT FORMAT

TYPE: FUNCTIONAL_POSITIVE
PRIORITY: High
TAGS: Smoke, Android, iOS
TESTCASE: Verify that user can login successfully on mobile
STEP: Launch the mobile application on the selected platform -> Application should open successfully
STEP: Enter valid role-based credentials -> Credentials should be accepted
STEP: Submit the login request -> Login request should be processed
STEP: Verify the mobile dashboard is displayed -> User should land on the dashboard screen
