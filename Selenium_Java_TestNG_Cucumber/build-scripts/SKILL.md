# Build Scripts Skill - Selenium Java TestNG + Cucumber BDD

## Role

Convert approved test cases into runnable Java TestNG automation for `selenium-java-testng-cucumber`.

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "selenium-java-testng-cucumber/src/main/java/pageObjects/<Feature>PageObjects.java", "content": "..." },
    { "path": "selenium-java-testng-cucumber/src/main/java/pages/<Feature>Page.java", "content": "..." },
    { "path": "selenium-java-testng-cucumber/src/test/java/stepDefinitions/<Feature>Steps.java", "content": "..." },
    { "path": "selenium-java-testng-cucumber/src/test/java/runner/TestNGCucumberRunner.java", "content": "..." },
    { "path": "selenium-java-testng-cucumber/pom.xml", "content": "..." }
  ],
  "notes": []
}
```

## Rules

- JSON only.
- Preserve existing files when supplied.
- Add TestNG groups and DataProviders without removing existing coverage.
- Do not hardcode credentials, tokens, local paths, device IDs, or app paths.
- Do not put selectors/endpoints inside TestNG test classes.
- Every test method must include TC-ID and a TestNG group.

Run:

```bash
mvn test -Dcucumber.filter.tags=@smoke -DsuiteXmlFile=testng.xml
```
