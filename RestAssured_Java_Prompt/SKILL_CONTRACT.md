# Skill Contract

Skill folder: RestAssured_Java_Prompt
Domain: API Automation
Tool: RestAssured
Language: Java
Framework type: Prompt

## Reference Policy

Use updateagentskill/playwright/javascript/hybrid as a quality reference only. Keep this skill folder name and preserve this tool-specific language, runner, framework type, file paths, and conventions. Do not copy Playwright JavaScript Hybrid output rules blindly into other tools.

## Generation Contract

- Generate automation only from explicitly selected and approved test cases or workflow input.
- Do not create, expand, merge, split, or invent test cases.
- Do not call or depend on TestCaseGeneration-Skills from automation script generation skills.
- Output paths must target the selected client framework root, not D:\skills, D:\frameworks, Agent_Skills, StaticFrameworks, updateagentskill, or Web Automation.
- Every generated test must include or reference existing page, object, fixture, step, helper, and test-data dependencies required by that test.
- Runtime values such as URLs, usernames, passwords, tokens, and keys must not be hardcoded in generated source code.
- Use environment/config files for base URL and valid/default credentials; use test-data files for testcase-specific values, negative credentials, expected messages, and alternate inputs.

## Healing Contract

- Healing repairs generated client automation only.
- Healing must not modify local skill repositories, static framework repositories, backend code, or reference framework files.
- Apply the smallest evidence-backed patch inside the isolated run workspace.
- Return manual review when the failure is application behavior, missing approved data, environment outage, or unsupported without evidence.
- Healed files should be pushed only after the selected script reruns successfully according to the backend run policy.

## Confidence Gate

1. Skill identity matches this folder and tool.
2. Generation paths stay inside the selected client framework root.
3. Tool/language/framework-specific conventions are preserved.
4. Secrets and runtime values are externalized.
5. Healing guidance is compatible with the matching static framework.


