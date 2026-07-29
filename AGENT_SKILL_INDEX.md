# Agent Skill Index

Skill folders follow Tool_Language_Framework naming where they represent automation frameworks. Non-framework workflow skills keep their backend-compatible historical names. The nested updateagentskill/playwright/javascript/hybrid folder remains protected as the source reference, and TestCaseGeneration-Skills is intentionally excluded from this automation-skill pass.

| Folder | Tool | Language | Framework type | Domain |
| --- | --- | --- | --- | --- |
| Appium_CSharp_BDD | Appium | CSharp | BDD Cucumber | Mobile Automation |
| Appium_Java_BDD_Cucumber | Appium | Java | BDD Cucumber | Mobile Automation |
| Appium_Java_Hybrid | Appium | Java | Hybrid | Mobile Automation |
| Appium_Java_TestNG | Appium | Java | TestNG | Mobile Automation |
| Appium_JS_WebdriverIO | Appium | JS | WebdriverIO | Mobile Automation |
| Appium_Python_BDD | Appium | Python | BDD Cucumber | Mobile Automation |
| Appium_Python_Hybrid | Appium | Python | Hybrid | Mobile Automation |
| Appium_TS_WebdriverIO | Appium | TS | WebdriverIO | Mobile Automation |
| Cypress_JS_BDD_Cucumber | Cypress | JS | BDD Cucumber | Web Automation |
| Cypress_JS_Standard | Cypress | JS | Standard | Web Automation |
| Cypress_TS_Standard | Cypress | TS | Standard | Web Automation |
| GitHub_PR_Merge | GitHub | N/A | PR Merge | Repository Workflow |
| GitHub_PR_Raise_Review | GitHub | N/A | PR Raise Review | Repository Workflow |
| GitHub_Workflow | GitHub | N/A | Workflow | Repository Workflow |
| Karate_Java_Standard | Karate | Java | Standard | API Automation |
| Playwright_Java_Standard | Playwright | Java | Standard | Web Automation |
| Playwright_JS_BDD_Cucumber | Playwright | JS | BDD Cucumber | Web Automation |
| Playwright_JS_Hybrid | Playwright | JS | Hybrid | Web Automation |
| Playwright_Python_Standard | Playwright | Python | Standard | Web Automation |
| Playwright_TS_Standard | Playwright | TS | Standard | Web Automation |
| PytestRequests_Python_Requests | PytestRequests | Python | Requests | API Automation |
| RestAssured_Java_Prompt | RestAssured | Java | Prompt | API Automation |
| RestAssured_Java_TestNG | RestAssured | Java | TestNG | API Automation |
| RobotFramework_Python_AppiumLibrary | RobotFramework | Python | AppiumLibrary | Mobile Automation |
| RobotFramework_Python_CustomKeywords | RobotFramework | Python | Custom Keywords | Web Automation |
| RobotFramework_Python_SeleniumLibrary | RobotFramework | Python | SeleniumLibrary | Web Automation |
| Selenium_Java_BDD | Selenium | Java | BDD Cucumber | Web Automation |
| Selenium_Java_Hybrid | Selenium | Java | Hybrid | Web Automation |
| Selenium_Java_JUnit | Selenium | Java | JUnit | Web Automation |
| Selenium_Java_POM | Selenium | Java | POM | Web Automation |
| Selenium_Java_TestNG | Selenium | Java | TestNG | Web Automation |
| Selenium_Java_TestNG_Cucumber | Selenium | Java | TestNG Cucumber | Web Automation |
| Selenium_Python_BDD | Selenium | Python | BDD Cucumber | Web Automation |
| Selenium_Python_Behave | Selenium | Python | Behave | Web Automation |
| Selenium_Python_Hybrid | Selenium | Python | Hybrid | Web Automation |
| Selenium_Python_POM | Selenium | Python | POM | Web Automation |
| Selenium_Python_PyTest | Selenium | Python | PyTest | Web Automation |
| Selenium_Python_Standard | Selenium | Python | Standard | Web Automation |
| WebdriverIO_JS_Cucumber_BDD | WebdriverIO | JS | Cucumber BDD | Web Automation |
| WebdriverIO_JS_Standard | WebdriverIO | JS | Standard | Web Automation |
| WebdriverIO_TS_Standard | WebdriverIO | TS | Standard | Web Automation |

## Shared Rules

- Framework skill folder names should identify tool, language, and framework type.
- Repository workflow skills keep backend-compatible historical names.
- Use Playwright_JS_Hybrid and the nested updateagentskill hybrid folder as the Playwright JS Hybrid reference.
- Do not touch TestCaseGeneration-Skills or the nested updateagentskill hybrid reference during broad old-skill updates.
- Preserve each tool, language, framework type, and generated output convention.
