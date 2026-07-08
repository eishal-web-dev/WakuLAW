# WakuLaw — Development Process (BDD + TDD)

Adopted 2026-07-08. Applies to every new feature and every change to existing behavior.

## The loop

```
1. SPECIFY  — write/extend a Gherkin .feature file describing behavior in user terms
2. RED      — write failing step definitions / tests that encode the spec
3. GREEN    — implement the minimum code to pass
4. REFACTOR — clean up with tests staying green
5. VERIFY   — full suite + build must pass before commit
```

## Backend (pytest + pytest-bdd)

- Feature specs: `apps/api/features/*.feature` — Gherkin, written for a non-programmer reader (they double as FYP documentation of behavior).
- Step definitions: `apps/api/tests/steps/test_<feature>_steps.py` binding scenarios via `scenarios()`.
- Unit-level tests (pure functions, edge cases) stay as plain pytest in `apps/api/tests/`.
- Heavy models are faked in tests via env flags: `FAKE_EMBEDDINGS=1`, `FAKE_NLI=1` (deterministic substitutes, no downloads). Every AI change is ALSO verified manually once against the real models.
- Run: `pytest` (all) · `pytest tests/steps` (BDD only).

## Frontend (Vitest + Testing Library)

- Component tests colocated as `src/**/*.test.tsx`; API calls mocked at the `lib/api` boundary.
- Minimum per live screen: renders with data, loading/empty/error states, key interaction.
- Run: `npm test` · type-safety gate: `npm run build`.

## Rules

1. No new endpoint or screen behavior without a scenario in a `.feature` file.
2. Tests are written BEFORE implementation (red first — commit may include both, but the diff must show real assertions, not tests written to match code).
3. Bug fixes start with a failing regression test reproducing the bug.
4. Existing features are covered retroactively: when touching an untested behavior, add its scenario first.
5. PR description lists which scenarios were added/changed under "Testing".
