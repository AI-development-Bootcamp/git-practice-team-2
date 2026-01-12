# Proposal: Add Todo Priorities

## Goal
Add priority levels (low, medium, high) to todos, allowing users to set priority on creation, edit it later, and see it visually represented.

## Background
Currently, todos only have a status (todo/done). Users requested a way to distinguish between urgent and non-urgent tasks.

## Proposed Solution
- **Data Model**: Add `priority` field to `Todo` object (enum: 'low', 'medium', 'high').
- **Default**: 'medium'.
- **UI**: 
    - Color coding or icons for simple visual distinction.
    - Selector in "Add Todo" form.
    - Mechanism to toggle/change priority on existing todos.

## Dependencies
- `add-todo-persistence` (existing data handling)
- `add-todo-components` (existing UI)
