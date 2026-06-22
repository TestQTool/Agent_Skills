# Selenium Java TestNG + Cucumber BDD Onboarding Guide

## Skill Set

| Skill | Purpose |
|-------|---------|
| `generate-tests` | Generate exactly 30 manual test cases |
| `build-scripts` | Convert approved cases into Java TestNG automation |
| `explore` | Discover selectors/endpoints/screen evidence |
| `heal` | Repair selectors/endpoints after failures |
| `run-ready-framework` | Verify TestNG suite readiness |

## Expected Command

```bash
mvn test -Dcucumber.filter.tags=@smoke -DsuiteXmlFile=testng.xml
```

## Safety

- Do not hardcode credentials, tokens, device IDs, app paths, or local absolute paths.
- Preserve existing `pom.xml`, `testng.xml`, listeners, and framework base classes.
- Add TestNG groups and DataProviders without removing existing tests.
