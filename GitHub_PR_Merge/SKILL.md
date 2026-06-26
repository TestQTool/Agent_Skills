---
name: github-pr-merge
description: Merge a reviewed GitHub pull request for generated automation work. Use when the user clicks Merge Request after a PR has been raised/reviewed. Verifies merge readiness, merges with the requested method, optionally deletes the source branch, and reports merge result.
---

# GitHub PR Merge Skill

## Role
You are a GitHub merge gatekeeper for generated automation work. Your job is to merge only when the pull request is ready and safe.

Use this after PR raise/review says the pull request is ready.

---

## Backend Endpoint

```http
POST /api/v1/github/configs/{configId}/pull-requests/{pullRequestNumber}/merge
```

---

## Merge Request

```json
{
  "commitTitle": "Merge Playwright automation for ADO-1234",
  "commitMessage": "Generated automation scripts for selected work items.",
  "mergeMethod": "squash",
  "deleteSourceBranch": false
}
```

Rules:

- `mergeMethod` can be `merge`, `squash`, or `rebase`.
- Default merge method is `squash`.
- `deleteSourceBranch` is optional and should be false unless the user explicitly requests cleanup.

---

## Merge Gate

Before merging, review the PR and merge only when:

- PR exists and is open.
- PR is not draft.
- GitHub reports `mergeable=true`.
- Merge decision is `ready`.
- Source branch and target branch are correct.
- No conflicts are reported.
- Changed files are expected automation/framework files.
- No secrets, prompt files, backend paths, or local machine paths are present.

Block merge when:

- PR is draft.
- PR is closed or already merged.
- GitHub mergeability is pending/unknown.
- GitHub reports conflicts.
- The PR touches unrelated files.
- Protected branch policy requires human approval or failing checks are present.

---

## AI Conflict Resolution Flow

When the user clicks **Merge to Target** and GitHub reports conflicts, the merge agent must try to resolve safely before returning a blocked state.

Required flow:

1. Verify the backend can run Git on the current host. If a configured absolute Git path does not exist, fall back to `git` from `PATH`.
2. Sync the latest source branch and target branch.
3. Checkout the source branch from `origin/sourceBranch`.
4. Attempt a normal merge from the target branch into the source branch.
5. If Git reports conflicted files, collect only files with unresolved conflict status.
6. For each conflicted file, send the full file content with conflict markers to the AI merge resolver.
7. AI must classify the file before resolving:
   - generated feature file
   - framework wiring file
   - static framework file
   - user-owned custom file
8. AI must return the complete resolved file content only.
9. Backend must reject the AI result if it is blank or still contains conflict markers.
10. Stage resolved files, commit the conflict-resolution commit, push the source branch, then re-check GitHub mergeability.
11. Merge only after GitHub reports the PR is mergeable.

Use the shared rules from `../GitHub_Workflow/SKILL.md` and review rules from `../GitHub_PR_Raise_Review/SKILL.md` while resolving.

---

## AI Conflict Prompt Contract

The merge agent should provide AI with:

- repository name
- source branch
- target branch
- conflicted file path
- loaded GitHub workflow skill context
- the complete conflicted file content

AI response rules:

- Return only the resolved file content.
- Do not return markdown explanations.
- Do not return JSON unless explicitly requested by backend.
- Remove all `<<<<<<<`, `=======`, and `>>>>>>>` markers.
- Preserve user-owned custom code by default.
- Preserve valid generated automation framework files and latest generated tests.
- For wiring files such as `pom.xml`, `package.json`, suite XML, configs, fixtures, and CI files, merge both sides carefully.
- If intent is ambiguous, do not guess; return a conflict report/blocker instead of inventing code.

Backend validation rules:

- Reject blank AI output.
- Reject AI output containing conflict markers.
- Reject files that introduce secrets, local machine paths, backend prompt files, or Agent_Skills content.
- Re-run mergeability review after pushing resolved source branch.

---

## Response Contract

```json
{
  "status": "merged",
  "message": "Pull request merged.",
  "repository": "owner/repo",
  "pullRequestNumber": 123,
  "pullRequestUrl": "https://github.com/owner/repo/pull/123",
  "sourceBranch": "feature/kishore/gen-ts/ADO-1234",
  "targetBranch": "develop",
  "merged": true,
  "mergeMethod": "squash",
  "mergedSha": "abc123",
  "mergeDecision": "merged",
  "filesChanged": ["playwright-js/tests/Login.test.js"],
  "warnings": []
}
```

---

## Hard Rules

- Never merge a PR with unresolved conflicts.
- Never merge a draft PR.
- Never merge when GitHub mergeability is pending; review again later.
- Never delete a source branch unless `deleteSourceBranch=true`.
- Never use `git merge -X ours` or `git merge -X theirs` as the primary conflict strategy for generated automation repositories.
- Never report "merged" unless GitHub merge API confirms the merge.
- Always report merge method, merged SHA, PR URL, and changed files.
