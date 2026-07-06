# WakuLaw — GitHub Workflow Guide

The standard open-source contribution loop this project follows. Every change — even a one-line fix — goes through this loop.

## The loop

```
Pick an issue → assign yourself → create a branch → commit small, clear changes
→ push → open a Pull Request (Closes #N) → teammate reviews → merge → delete branch
```

## 1. Pick an issue
- Work in milestone order (M0 → M9). Issues labeled `status: ready` are unblocked.
- Assign yourself so work isn't duplicated: `gh issue edit N --add-assignee @me` (or via the web UI).
- If something isn't an issue yet, create the issue first — every PR should trace back to one.

## 2. Branch
Never commit to `main`. Branch from up-to-date `main`:

```bash
git checkout main && git pull
git checkout -b <type>/<issue#>-short-title     # e.g. backend/16-fastapi-init
```

Types: `docs/`, `frontend/`, `backend/`, `ai/`, `test/`, `chore/`.

## 3. Commit
- Small, focused commits. One logical change per commit.
- Conventional messages: `feat: add document upload endpoint`, `fix: handle empty PDF`, `docs: define MVP scope`, `test: ...`, `chore: ...`, `refactor: ...`
- Never: "update", "final", "changes", "done".
- Never commit secrets, `.env`, datasets, DB files, or model artifacts.

## 4. Verify before pushing
- Frontend: `npm run build` (must pass)
- Backend: `pytest` (must pass)

## 5. Pull Request
```bash
git push -u origin <branch>
gh pr create
```
- Title in the same conventional style as commits.
- Body follows the PR template: what changed, why, how it was tested, `Closes #N`.
- Keep PRs small (ideally < 400 lines of diff). Big features = several sequential PRs.

## 6. Review & merge
- The other team member reviews every PR — comments, requests changes, or approves.
- Address review comments with new commits (don't force-push during review).
- Merge with **"Squash and merge"** to keep `main` history clean (one commit per PR).
- Delete the branch after merge.

## 7. Issues hygiene
- `Closes #N` in the PR body auto-closes the issue on merge.
- Use labels (`type:`, `priority:`, `status:`) and milestones on every issue.
- Discuss design decisions in issue comments so decisions are documented publicly.

## Why this matters
This is the same workflow used by professional open-source projects. Followed consistently, the repository's history — issues, branches, reviewed PRs, clean commits — becomes evidence of professional engineering practice for both team members' public profiles and the FYP evaluation.
