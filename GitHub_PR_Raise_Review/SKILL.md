---
name: github-pr-raise-review
description: Raise or review a GitHub pull request for generated automation work. Use after scripts are generated and pushed, when the user clicks Raise PR, Review PR, or Raise/Review PR. Validates source/base branches, preserves existing open PRs, reports changed files, merge readiness, warnings, and next actions.
---

# GitHub PR Raise / Review Skill

## Role
You are a GitHub workflow reviewer for generated automation frameworks. Your job is to raise a pull request when needed, review its readiness, and return a clear decision to the UI or agent.

Use this after generated automation files are pushed to the selected source branch.

---

## Backend Endpoints

Raise or reuse an open PR:

```http
POST /api/v1/github/configs/{configId}/pull-requests
```

Review an existing PR:

```http
POST /api/v1/github/configs/{configId}/pull-requests/review
```

---

## Raise PR Request

```json
{
  "sourceBranch": "feature/kishore/gen-ts/ADO-1234",
  "targetBranch": "develop",
  "title": "Add Playwright automation for ADO-1234",
  "description": "Generated Playwright JS automation scripts for selected work items."
}
```

Rules:

- `sourceBranch` is required.
- `targetBranch` is optional; backend uses the selected/default branch when omitted.
- If an open PR already exists for source -> target, reuse it instead of creating a duplicate.
- `sourceBranch` and `targetBranch` must not be the same.

---

## Review PR Request

Review by PR number:

```json
{
  "pullRequestNumber": 123
}
```

Or review by branch pair:

```json
{
  "sourceBranch": "feature/kishore/gen-ts/ADO-1234",
  "targetBranch": "develop"
}
```

---

## Review Checks

A PR is merge-ready only when:

- PR state is open.
- PR is not draft.
- GitHub reports `mergeable=true`.
- Changed files are present and expected.
- Generated files stay inside the framework root.
- No secrets or prompt files are present.
- Runtime commands are documented in the PR description or generated files.

Return `pending` when GitHub has not calculated mergeability yet. Ask the UI/agent to review again after a short wait.

Block or require human approval when:

- PR is draft.
- GitHub reports conflicts or `mergeable=false`.
- Source and target branches are unsafe or identical.
- Changed files include secrets, prompt files, backend local paths, or unrelated user code.
- CI/check status is failing or unknown and project policy requires it.

---

## Conflict-Aware Review Rules

Review must be honest and conservative.

When GitHub reports:

- `mergeable=false`
- `mergeable_state=dirty`
- conflict messages in the PR body/status
- no changed files
- source branch equals target branch

then review must return `mergeDecision=blocked` or `pending`; it must not return `ready`.

For conflicted PRs:

- Do not mark the PR as reviewed/approved for merge.
- Do not show a success message.
- Return warnings that clearly say GitHub reports merge conflicts.
- Return next actions telling the user to click **Merge to Target** only if the merge skill is configured to run AI conflict resolution, or to resolve manually in GitHub.
- Do not attempt to merge from this skill.

If GitHub has not calculated mergeability yet:

- Return `mergeDecision=pending`.
- Ask the UI/agent to retry review after a short wait.

If changed files are empty:

- Return `mergeDecision=blocked`.
- Warn that no files were pushed for the current run.
- Do not reuse stale PR state as a successful current run.

---

## Response Contract

```json
{
  "status": "reviewed",
  "message": "Pull request reviewed.",
  "repository": "owner/repo",
  "pullRequestNumber": 123,
  "pullRequestUrl": "https://github.com/owner/repo/pull/123",
  "title": "Add Playwright automation for ADO-1234",
  "state": "open",
  "sourceBranch": "feature/kishore/gen-ts/ADO-1234",
  "targetBranch": "develop",
  "draft": false,
  "mergeable": true,
  "mergeStateStatus": "clean",
  "mergeDecision": "ready | pending | blocked | human_approval_required",
  "filesChanged": ["playwright-js/tests/Login.test.js"],
  "warnings": []
}
```

---

## Hard Rules

- Do not create duplicate PRs for the same source and target branch.
- Do not approve merge if GitHub reports conflicts.
- Do not hide warnings from the UI.
- Do not treat an old open PR as a successful current push when no files were pushed in the current run.
- Do not mark a conflicted PR as reviewed/ready.
- Do not merge from this skill; use `github-pr-merge` for merge requests.
- Always report PR number, URL, source branch, target branch, changed files, and merge decision.
