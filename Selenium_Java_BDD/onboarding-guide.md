# Onboarding Guide — Selenium Java BDD

## Prerequisites

| Tool            | Version     | Install                                      |
|-----------------|-------------|----------------------------------------------|
| Java            | 17+         | https://adoptium.net                         |
| Maven           | 3.9+        | https://maven.apache.org/download.cgi        |
| Git             | Any         | https://git-scm.com                          |
| Chrome          | Latest      | Auto-managed by WebDriverManager             |
| IntelliJ / VS   | Any         | Optional — agent works from CLI              |

No manual chromedriver download needed. WebDriverManager handles it automatically.

---

## Step 1 — Clone the Static Framework into Client Repo

```bash
# Clone StaticFrameworks
git clone https://github.com/TestQTool/StaticFrameworks.git

# Copy the BDD framework to your client project
cp -r StaticFrameworks/Web\ Automation/selenium-java-bdd/ <client-project>/
cd <client-project>/selenium-java-bdd
```

## Step 2 — Configure

```bash
# Copy env template
cp .env.template .env

# Edit config
nano config/config.properties
```

Set at minimum:
```properties
BASE_URL=https://your-app.com
BROWSER=chrome
```

## Step 3 — Install

```bash
mvn install -DskipTests
```

This downloads all dependencies. WebDriverManager handles browser drivers automatically.

## Step 4 — Run

```bash
# All tests
mvn test

# Smoke only
mvn test -P smoke

# Regression only
mvn test -P regression

# Specific feature tag
mvn test -Dcucumber.filter.tags="@login"

# Specific test case
mvn test -Dcucumber.filter.tags="@TC-LM-001"

# Specific browser
mvn test -Dbrowser=firefox
```

## Step 5 — View Reports

```bash
# Allure report (opens in browser)
mvn allure:serve

# ExtentReports — open manually
open reports/extent-report-<timestamp>.html

# Cucumber HTML
open target/cucumber-reports/index.html
```

---

## Verify Framework Is Working

```bash
mvn test -P smoke -Dcucumber.filter.tags="@TC-TPL-001"
```

Expected: 1 scenario runs, generates reports in `target/cucumber-reports/` and `reports/`.

---

## Folder Map — What the Agent Generates vs What Exists

```
selenium-java-bdd/
├── src/main/java/com/qualitymatrix/
│   ├── base/           ← DO NOT TOUCH (framework)
│   ├── utils/          ← DO NOT TOUCH (framework)
│   ├── hooks/          ← DO NOT TOUCH (framework)
│   ├── reporting/      ← DO NOT TOUCH (framework)
│   ├── pageObjects/    ← AGENT GENERATES HERE
│   └── pages/          ← AGENT GENERATES HERE
└── src/test/java/
    ├── features/       ← AGENT GENERATES HERE
    ├── stepDefinitions/← AGENT GENERATES HERE
    └── runner/         ← DO NOT TOUCH (framework)
```
