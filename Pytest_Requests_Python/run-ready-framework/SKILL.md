# Run-Ready API Framework Skill

Verify the generated `pytest-requests-python` framework is cloneable and runnable.

## Required Files

```text
requirements.txt
config/config.yaml
tests/test_<feature>_api.py
clients/<feature>_client.py
schemas/
test-data/
```

## Checks

- Dependencies are declared.
- Base URL and auth are environment-driven.
- Smoke tests can run without real secrets committed.
- Reports are generated.
- Destructive tests are tagged and opt-in.

## Output Contract

```json
{
  "files": [],
  "missingStaticFiles": [],
  "runCommands": ["python -m venv .venv", "pip install -r requirements.txt", "pytest -m smoke"],
  "warnings": []
}
```
