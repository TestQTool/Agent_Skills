# Run-Ready TestNG Framework Skill

Verify the generated Java TestNG framework is complete and runnable.

## Required Files

```text
pom.xml
src/test/java/runner/TestNGCucumberRunner.java
src/test/resources/config.properties
src/main/java/pageObjects/<Feature>PageObjects.java
src/main/java/pages/<Feature>Page.java
src/test/java/stepDefinitions/<Feature>Steps.java
```

## Checks

- `pom.xml` includes TestNG and stack dependencies.
- `testng.xml` or runner config includes generated tests/groups.
- Smoke/regression groups can be selected from CLI.
- Reports/listeners are configured.
- No secrets, local paths, tokens, device IDs, or app paths are committed.

## Output Contract

```json
{
  "files": [],
  "missingStaticFiles": [],
  "runCommands": ["mvn test -Dcucumber.filter.tags=@smoke -DsuiteXmlFile=testng.xml"],
  "warnings": []
}
```
