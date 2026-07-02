# SKILL: generate-tests

Generate EXACTLY 30 structured, non-duplicate API test cases. Output plain text only.

## Rules

1. Every title starts with `Verify that ...`.
2. Include TYPE, PRIORITY, TAGS, TESTCASE, and 4 to 5 STEPS.
3. Allowed TYPE values: API_POSITIVE, API_NEGATIVE, API_EDGE, CONTRACT, AUTHORIZATION, SECURITY, PERFORMANCE.
4. Allowed PRIORITY values: High, Medium, Low.
5. Allowed TAGS values: Smoke, Regression, API, Contract, Security, Performance.
6. STEP FORMAT: `STEP: action -> expected result`.
7. Do not include tokens, real credentials, database internals, or implementation classes.
8. Cover status codes, schemas, auth, invalid payloads, missing fields, permission checks, and rate/timeout behavior where relevant.

## Output Example

TYPE: API_POSITIVE
PRIORITY: High
TAGS: Smoke, API
TESTCASE: Verify that user details are returned for a valid user id
STEP: Send GET request for an existing user id -> Request should be accepted
STEP: Verify response status code is 200 -> API should return success
STEP: Verify response schema and required fields -> Response contract should match expectations
STEP: Verify returned user id matches requested id -> Response should contain correct user data
