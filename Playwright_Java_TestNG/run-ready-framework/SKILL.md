# Run-Ready TestNG Framework Skill

Verify the generated Java TestNG framework is complete and runnable.

## Required Files

```text
pom.xml
testng.xml
src/test/resources/config.properties
src/main/java/pageobjects/<Feature>PageObjects.java
src/main/java/pages/<Feature>Page.java
src/test/java/tests/<Feature>Test.java
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
  "runCommands": ["mvn test -Dgroups=smoke -DsuiteXmlFile=testng.xml"],
  "warnings": []
}
```
