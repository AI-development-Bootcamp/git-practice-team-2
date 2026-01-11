# Extended Statuses – Tasks

## Summary
רשימת משימות ליישום פיצ'ר Extended Statuses - הרחבה מ-2 סטטוסים ל-4.

---

## Task 1: Create Status Constants (Single Source of Truth)

**Priority**: 🔴 High (Blocking)  
**Estimated Time**: 15 min  
**Dependencies**: None

### Description
יצירת קובץ constants מרכזי להגדרת הסטטוסים.

### Acceptance Criteria
- [ ] קובץ `shared/constants/statuses.js` נוצר
- [ ] מכיל: `STATUSES`, `VALID_STATUSES`, `DEFAULT_STATUS`
- [ ] מכיל: `STATUS_CONFIG` עם label וצבע לכל סטטוס
- [ ] מכיל: פונקציית `validateStatus()`
- [ ] מכיל: פונקציית `migrateStatus()`

### Files
| File | Action |
|------|--------|
| `shared/constants/statuses.js` | CREATE |

---

## Task 2: Update Server - Todo Service

**Priority**: 🔴 High  
**Estimated Time**: 30 min  
**Dependencies**: Task 1

### Description
עדכון שירות ה-todos בשרת לתמוך ב-4 סטטוסים עם validation.

### Acceptance Criteria
- [ ] Import של constants מ-Task 1
- [ ] וולידציה של סטטוס בעדכון משימה
- [ ] מיגרציה של משימות ישנות בעת טעינה
- [ ] סטטוס לא חוקי מחזיר שגיאה / fallback

### Files
| File | Action |
|------|--------|
| `server/src/services/todoService.js` | MODIFY |

---

## Task 3: Update Server - API Routes

**Priority**: 🔴 High  
**Estimated Time**: 20 min  
**Dependencies**: Task 1, Task 2

### Description
עדכון ה-route של PATCH לוולידציה של סטטוס.

### Acceptance Criteria
- [ ] PATCH `/api/todos/:id` מקבל status עם 4 ערכים אפשריים
- [ ] סטטוס לא חוקי מחזיר 400 Bad Request
- [ ] הודעת שגיאה ברורה: "Invalid status. Must be one of: todo, in-progress, review, done"

### Files
| File | Action |
|------|--------|
| `server/src/routes/todos.js` | MODIFY |

---

## Task 4: Update Client - TodoList Component

**Priority**: 🟡 Medium  
**Estimated Time**: 30 min  
**Dependencies**: Task 1

### Description
עדכון הקומפוננטה להציג 4 קבוצות במקום 2.

### Acceptance Criteria
- [ ] Import של constants
- [ ] 4 קבוצות: TO DO, IN PROGRESS, REVIEW, DONE
- [ ] כל קבוצה מציגה count
- [ ] סדר הקבוצות קבוע

### Files
| File | Action |
|------|--------|
| `client/src/components/TodoList.jsx` | MODIFY |

---

## Task 5: Update Client - TodoItem Component

**Priority**: 🟡 Medium  
**Estimated Time**: 45 min  
**Dependencies**: Task 1, Task 4

### Description
החלפת כפתור ה-toggle ב-dropdown לבחירת סטטוס.

### Acceptance Criteria
- [ ] Toggle קיים מוחלף ב-dropdown/select
- [ ] Dropdown מציג את 4 הסטטוסים
- [ ] בחירת סטטוס מפעילה את ה-callback
- [ ] Keyboard accessible
- [ ] סטטוס מוצג עם צבע מתאים

### Files
| File | Action |
|------|--------|
| `client/src/components/TodoItem.jsx` | MODIFY |

---

## Task 6: Add Status CSS Styles

**Priority**: 🟢 Low  
**Estimated Time**: 20 min  
**Dependencies**: None

### Description
הוספת CSS לצבעים ועיצוב הסטטוסים.

### Acceptance Criteria
- [ ] Class לכל סטטוס: `.status-todo`, `.status-in-progress`, `.status-review`, `.status-done`
- [ ] צבעים לפי ה-design
- [ ] עיצוב ל-dropdown
- [ ] Hover states

### Files
| File | Action |
|------|--------|
| `client/src/index.css` | MODIFY |

---

## Task 7: Manual QA Testing

**Priority**: 🟡 Medium  
**Estimated Time**: 30 min  
**Dependencies**: All previous tasks

### Description
בדיקה ידנית של כל התרחישים.

### Test Cases
- [ ] יצירת משימה חדשה → סטטוס `todo`
- [ ] שינוי סטטוס ל-`in-progress`
- [ ] שינוי סטטוס ל-`review`
- [ ] שינוי סטטוס ל-`done`
- [ ] החזרת סטטוס אחורה (done → review)
- [ ] משימות קיימות נטענות נכון
- [ ] צבעים מוצגים נכון
- [ ] Keyboard navigation עובדת

---

## Implementation Order

```
Task 1 (Constants) ──┬──> Task 2 (Service) ──> Task 3 (Routes)
                     │
                     └──> Task 4 (TodoList) ──> Task 5 (TodoItem)
                     
Task 6 (CSS) ────────────────────────────────────────────────────>

                                                            Task 7 (QA)
```

| Order | Task | Can Start After |
|-------|------|-----------------|
| 1 | Task 1: Constants | - |
| 1 | Task 6: CSS | - |
| 2 | Task 2: Service | Task 1 |
| 2 | Task 4: TodoList | Task 1 |
| 3 | Task 3: Routes | Task 1, 2 |
| 3 | Task 5: TodoItem | Task 1, 4 |
| 4 | Task 7: QA | All |

---

## Total Estimated Time

| Task | Time |
|------|------|
| Task 1: Constants | 15 min |
| Task 2: Service | 30 min |
| Task 3: Routes | 20 min |
| Task 4: TodoList | 30 min |
| Task 5: TodoItem | 45 min |
| Task 6: CSS | 20 min |
| Task 7: QA | 30 min |
| **Total** | **~3 hours** |
