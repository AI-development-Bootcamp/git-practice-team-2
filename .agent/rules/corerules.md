---
trigger: always_on
glob:
  - "**/*"
description: >
  🧱 HARD RULES v1.0 — Extended Statuses UI (Single Source).
  Mandatory rules for any AI code-generation agent in this repo.
  Implement ONLY the requested change: extend task statuses to
  todo / in-progress / review / done, allow status change,
  validate status, and display it clearly (color/icon).
---

# 🧱 HARD RULES v1.0 — Extended Statuses UI (Single Source)

These rules are **MANDATORY** for any AI code-generation agent working in this repository.

If a rule clearly conflicts with an explicit task request or existing project conventions → **STOP and ask**.

---

## 0) Rule Priority (ABSOLUTE)

1. Explicit task request
2. Existing project conventions / linters / CI / established patterns
3. These rules

If a higher-priority rule conflicts with a lower one:
- Follow the higher priority
- Leave a short note explaining the deviation

---

## 1) Scope (HARD)

The agent MUST implement **ONLY** explicitly requested functionality.

### Requested
- Expand statuses from 2 to 4:
  - `todo`
  - `in-progress`
  - `review`
  - `done`
- Ability to change task status
- Validation that status is valid
- UI displays status clearly (color and/or icon)

### Explicitly Out of Scope
- Drag & drop
- Activity feed / audit trail (unless already exists)
- Filters, search, sorting enhancements
- Users, authentication, roles
- Backend/API redesign
- New persistence mechanisms
- New routes/pages

If scope is unclear → **STOP and ask**.

---

## 2) Stack & Conventions (FOLLOW EXISTING)

MUST:
- Use the **existing** framework, libraries, state management, styling method, icon system, and UI components already present in the codebase.
- Follow existing file structure, naming conventions, and architectural boundaries.
- Follow existing formatting, lint, and CI rules.

MUST NOT:
- Introduce new frameworks, patterns, or architectural layers.
- “Improve” or refactor unrelated code.

---

## 3) Dependencies (STRICT)

The agent MUST NOT:
- Add new dependencies
- Modify `package.json`, lock files, or dependency configuration

Unless explicitly instructed by the user.

---

## 4) Data Model (HARD)

### 4.1 Single Source of Truth

- Status values MUST be defined in **one central place** in the codebase.
- Allowed values (exact strings only):
  - `todo`
  - `in-progress`
  - `review`
  - `done`
- No additional statuses. No aliases.

### 4.2 Validation (MANDATORY)

- Every status update MUST be validated.
- Invalid status MUST NOT be persisted.
- Invalid or corrupted existing data MUST:
  - Fallback to `todo`
  - Emit a dev-visible signal (e.g. `console.warn`)
  - NEVER crash the UI

### 4.3 Backward Compatibility

If existing data uses a boolean or equivalent (e.g. `done: true/false`):

- `true`  → `status: "done"`
- `false` / missing → `status: "todo"`

Migration MUST occur where data is already normalized or loaded.

---

## 5) UI Rules (LOCKED)

### 5.1 Control Replacement

- Replace the existing toggle / circle control with a dropdown or select
  **that already exists in the codebase** (native or custom).
- Control MUST be keyboard accessible according to existing UI standards.

### 5.2 Status Visibility

- Each task MUST display its status clearly using:
  - Label text
  - Color and/or icon (reuse existing system)
- Status → UI mapping MUST be centralized and consistent.

### 5.3 Grouping

- If tasks are already grouped by status (e.g. TODO / DONE),
  they MUST be expanded to 4 groups.
- If tasks are currently a flat list,
  DO NOT introduce grouping unless explicitly requested.

---

## 6) State & Side Effects (HARD)

- Status changes MUST update state immediately.
- Persistence (API / local storage / cache) MUST follow existing patterns.
- No new background sync, retries, or async flows.

---

## 7) Code Organization (HARD)

The agent MUST:
- Touch the minimal number of files required.
- Respect existing separation of concerns.
- Reuse existing helpers and utilities when available.

The agent MUST NOT:
- Reorganize folders
- Rename files broadly
- Perform unrelated refactors

---

## 8) Code Style & Design (HARD)

Principles:
- Readability over cleverness
- Minimal & safe changes
- Consistency with existing code

Rules:
- Follow existing indentation and formatting
- Avoid magic strings outside the SSOT
- Clear, descriptive naming
- Small functions, early returns

If existing code violates these rules → follow existing style and note deviation.

---

## 9) Comments

Allowed:
- Explain **WHY**
- Migration notes
- Constraints and edge cases

Forbidden:
- Obvious comments
- Commented-out code

---

## 10) Error Handling & Logging

- Never silently swallow errors
- Fail fast on invalid inputs
- Logs must be intentional and contain no secrets or PII

---

## 11) Tests & QA (FOLLOW EXISTING)

- Use existing test infrastructure if present.
- Do NOT introduce new testing frameworks.

Minimum expectations (where applicable):
- Status validator correctness
- Backward compatibility mapping
- UI status change behavior

If no tests exist:
- Do NOT add a new test stack
- Rely on manual QA checklist

---

## 12) Acceptance Checklist (MUST PASS)

- [ ] Only 4 statuses exist
- [ ] Status can be changed via dropdown
- [ ] Invalid status is rejected with fallback
- [ ] Status is visually clear (label + color/icon)
- [ ] No new dependencies added
- [ ] No unrelated refactors

---

**These rules override personal preference.  
When unsure → assume the rule applies.  
If a conflict exists → STOP and ask.**
