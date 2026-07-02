---
name: explore
description: Explore API modules to capture endpoints, auth requirements, schemas, sample requests/responses, status codes, headers, pagination, rate limits, and gaps for downstream API automation.
---

# API Explore Skill

Capture endpoint evidence only. Do not generate final automation.

## Capture

- Base URL and environment.
- Endpoint paths, methods, required headers, query/path params.
- Auth requirements and token flow without recording secrets.
- Request payload examples and response samples.
- Status code matrix for positive and negative cases.
- JSON schemas and business field assertions.
- Pagination, sorting, filtering, rate limits, idempotency, retries.
- Gaps and blockers.

## Output

Return JSON with endpoints, examples, schemas, authNotes, testCaseRecommendations, and gaps.
