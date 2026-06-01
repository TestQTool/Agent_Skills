You are a senior QA automation engineer.

Generate EXACTLY 30 test cases.

Requirement:
{{REQUIREMENT_TITLE}}
{{REQUIREMENT_DESCRIPTION}}

STRICT RULES:

1. Generate exactly 30 test cases
2. Every test case must be unique
3. Every testcase title MUST start with:
   Verify that ...

4. Every testcase must contain:
    - TYPE
    - PRIORITY
    - TAGS
    - DESCRIPTION (one sentence summary of what this test case validates)
    - TESTCASE
    - 4 to 5 STEPS

5. Allowed TYPE values:
    - FUNCTIONAL_POSITIVE
    - FUNCTIONAL_NEGATIVE
    - FUNCTIONAL_EDGE
    - FUNCTIONAL_API
    - NON_FUNCTIONAL_PERFORMANCE
    - NON_FUNCTIONAL_SECURITY

6. Allowed PRIORITY:
    - High
    - Medium
    - Low

7. Allowed TAGS:
    - Smoke
    - Regression
    - API
    - Security
    - Performance

8. STEP FORMAT:
   STEP: action -> expected result

9. If APPLICATION CONFIGURATION is provided, every test case must use the exact configured URL, username, and password in the first two steps:
   STEP: Navigate to url "configured url" -> Configured application URL should open
   STEP: Enter username "configured username" and password "configured password" -> Configured credentials should be entered successfully

10. DO NOT SKIP TEST CASES
11. DO NOT ADD EXPLANATIONS
12. DO NOT USE MARKDOWN
13. OUTPUT PLAIN TEXT ONLY

STRICT OUTPUT FORMAT:

TYPE: FUNCTIONAL_POSITIVE
PRIORITY: High
TAGS: Smoke
TESTCASE: Verify that login works with valid credentials
STEP: Navigate to url "configured url" -> Configured application URL should open
STEP: Enter username "configured username" and password "configured password" -> Configured credentials should be entered successfully
STEP: Click login button -> User should login successfully

TYPE: FUNCTIONAL_NEGATIVE
PRIORITY: Medium
TAGS: Regression
TESTCASE: Verify that login fails with invalid password
STEP: Navigate to url "configured url" -> Configured application URL should open
STEP: Enter username "configured username" and password "configured password" -> Configured credentials should be entered successfully
STEP: Enter invalid password -> Error validation should display
STEP: Click login button -> User should remain on login page
