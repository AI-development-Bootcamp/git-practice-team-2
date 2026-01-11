# Extended Statuses – Design Document

## Architecture Overview

### Status Values (Single Source of Truth)

הסטטוסים יוגדרו במקום מרכזי אחד בלבד בקוד:

```javascript
// Defined in: shared/constants/statuses.js (or equivalent single location)
export const STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  DONE: 'done'
};

export const VALID_STATUSES = Object.values(STATUSES);
export const DEFAULT_STATUS = STATUSES.TODO;

// Status display configuration
export const STATUS_CONFIG = {
  [STATUSES.TODO]: {
    label: 'To Do',
    color: '#6b7280', // gray
  },
  [STATUSES.IN_PROGRESS]: {
    label: 'In Progress',
    color: '#3b82f6', // blue
  },
  [STATUSES.REVIEW]: {
    label: 'Review',
    color: '#f59e0b', // amber/orange
  },
  [STATUSES.DONE]: {
    label: 'Done',
    color: '#10b981', // green
  }
};
```

---

## Data Model Changes

### Before (Current)
```javascript
{
  id: "uuid",
  title: "Task title",
  status: "todo" | "done",
  createdAt: "ISO date",
  updatedAt: "ISO date"
}
```

### After (Extended)
```javascript
{
  id: "uuid",
  title: "Task title",
  status: "todo" | "in-progress" | "review" | "done",
  createdAt: "ISO date",
  updatedAt: "ISO date"
}
```

---

## Validation

### validateStatus Function
```javascript
/**
 * Validates and normalizes a status value.
 * @param {string} status - The status to validate
 * @returns {string} - Valid status or DEFAULT_STATUS with warning
 */
export function validateStatus(status) {
  if (VALID_STATUSES.includes(status)) {
    return status;
  }
  
  console.warn(`Invalid status "${status}" - falling back to "${DEFAULT_STATUS}"`);
  return DEFAULT_STATUS;
}
```

### Backward Compatibility Migration
```javascript
/**
 * Migrates old boolean-based status to new string status.
 * Called when loading/normalizing existing data.
 */
export function migrateStatus(todo) {
  // Already has valid status
  if (todo.status && VALID_STATUSES.includes(todo.status)) {
    return todo;
  }
  
  // Migrate from boolean 'done' field
  if (todo.done === true) {
    return { ...todo, status: STATUSES.DONE };
  }
  
  // Default to TODO
  return { ...todo, status: STATUSES.TODO };
}
```

---

## UI Changes

### TodoList Component
יציג 4 קבוצות במקום 2:

```
TO DO (count)
IN PROGRESS (count)
REVIEW (count)
DONE (count)
```

### TodoItem Component
- **החלפת Toggle**: הכפתור העגול הקיים יוחלף ב-dropdown/select לבחירת סטטוס
- **Badge ויזואלי**: הסטטוס יוצג כ-badge עם:
  - טקסט (label)
  - צבע רקע לפי הסטטוס
- **Keyboard Accessible**: הרכיב יהיה נגיש למקלדת לפי הסטנדרטים הקיימים

---

## API Contract

### Update Todo Status
```
PATCH /api/todos/:id
Content-Type: application/json

{
  "status": "todo" | "in-progress" | "review" | "done"
}
```

### Success Response
```json
{
  "id": "uuid",
  "title": "Task title",
  "status": "in-progress",
  "createdAt": "2026-01-11T12:00:00Z",
  "updatedAt": "2026-01-11T14:30:00Z"
}
```

### Error Response (Invalid Status)
```json
{
  "error": "Invalid status. Must be one of: todo, in-progress, review, done"
}
```
**HTTP Status**: 400 Bad Request

---

## UI Mockup

```
┌─────────────────────────────────────────┐
│              Todo App                    │
├─────────────────────────────────────────┤
│  [What needs to be done?      ] [Add]   │
│                                          │
│  TO DO (2)                              │
│  ┌─────────────────────────────────────┐│
│  │ Task 1         [▼ To Do      ] 🗑   ││
│  │ Task 2         [▼ To Do      ] 🗑   ││
│  └─────────────────────────────────────┘│
│                                          │
│  IN PROGRESS (1)                        │
│  ┌─────────────────────────────────────┐│
│  │ Task 3         [▼ In Progress] 🗑   ││
│  └─────────────────────────────────────┘│
│                                          │
│  REVIEW (1)                             │
│  ┌─────────────────────────────────────┐│
│  │ Task 4         [▼ Review     ] 🗑   ││
│  └─────────────────────────────────────┘│
│                                          │
│  DONE (1)                               │
│  ┌─────────────────────────────────────┐│
│  │ Task 5         [▼ Done       ] 🗑   ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

---

## Files to Modify

### Shared / Constants
| File | Action | Description |
|------|--------|-------------|
| `shared/constants/statuses.js` | NEW | Single source of truth for status values |

### Server
| File | Action | Description |
|------|--------|-------------|
| `server/src/services/todoService.js` | MODIFY | Add validation, migration logic |
| `server/src/routes/todos.js` | MODIFY | Validate status in PATCH handler |

### Client
| File | Action | Description |
|------|--------|-------------|
| `client/src/components/TodoList.jsx` | MODIFY | 4 groups instead of 2 |
| `client/src/components/TodoItem.jsx` | MODIFY | Replace toggle with dropdown |
| `client/src/index.css` | MODIFY | Add status colors |

---

## CSS Changes

```css
/* Status badge colors */
.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-todo {
  background-color: #f3f4f6;
  color: #6b7280;
}

.status-in-progress {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.status-review {
  background-color: #fef3c7;
  color: #d97706;
}

.status-done {
  background-color: #d1fae5;
  color: #047857;
}
```

---

## Testing Checklist

- [ ] New todo created with status `todo`
- [ ] Status changed to `in-progress` via dropdown
- [ ] Status changed to `review` via dropdown
- [ ] Status changed to `done` via dropdown
- [ ] Status reverted back (e.g., `done` → `in-progress`)
- [ ] Invalid status rejected by API (400 error)
- [ ] Old todos with boolean `done` field migrated correctly
- [ ] Status displayed with correct color
- [ ] Keyboard navigation works on dropdown
