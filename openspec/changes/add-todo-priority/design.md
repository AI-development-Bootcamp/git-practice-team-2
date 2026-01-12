# Design: Todo Priorities

## Backend

### Data Model
**File:** `server/src/data/todos.json`
Update the `Todo` schema to include:
```javascript
{
  "priority": "low" | "medium" | "high" // default: "medium"
}
```

### API Changes
**File:** `server/src/routes/todos.js`

#### POST /api/todos
- **Request Body**:
  ```json
  {
    "title": "Buy milk",
    "priority": "high" // Optional, defaults to "medium"
  }
  ```
- **Validation**:
  - `priority` must be one of `['low', 'medium', 'high']`.

#### PUT /api/todos/:id
- **Request Body**:
  ```json
  {
    "priority": "low", // Optional update
    "status": "done"   // Existing
  }
  ```
- **Logic**:
  - Only updates fields present in the body.
  - Validates `priority` if present.

## Frontend

### Types
**File:** `client/src/types/todo.ts` (or equivalent)
```typescript
export type Priority = 'low' | 'medium' | 'high';
export interface Todo {
  // ...
  priority: Priority;
}
```

### Components
1.  **PriorityBadge**: Small UI element to display priority on `TodoItem`.
    - High: Red/Icon
    - Medium: Yellow/Icon
    - Low: Green/Icon
2.  **PrioritySelector**: Dropdown or Radio group for `AddTodoForm` and `EditMode`.

### API Integration
- Update `todoService.create` to accept `priority`.
- Update `todoService.update` to accept `priority`.

## Open Questions (To Be Decided)
- **Sorting**: Should the main list be sorted by priority automatically?
- **Filtering**: Do you want a filter dropdown to show only "High" priority, etc?
- **Visuals**: Specific colors (Hex codes) or icons?
- **Migration**: How to handle existing todos in `todos.json`? (Assume default 'medium' on read or run a migration script?)
