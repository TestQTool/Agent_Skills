# Build Scripts Skill - RestAssured Java TestNG Framework

## Role

Convert approved test cases into runnable Java TestNG automation for `restassured-java-testng`.

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "restassured-java-testng/src/main/java/endpoints/<Feature>Endpoints.java", "content": "..." },
    { "path": "restassured-java-testng/src/main/java/clients/<Feature>Client.java", "content": "..." },
    { "path": "restassured-java-testng/src/test/java/tests/<Feature>ApiTest.java", "content": "..." },
    { "path": "restassured-java-testng/testng.xml", "content": "..." },
    { "path": "restassured-java-testng/pom.xml", "content": "..." }
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
mvn test -Dgroups=smoke -DsuiteXmlFile=testng.xml
```
