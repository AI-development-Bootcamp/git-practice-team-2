# Tasks

## Backend (`server/`)
- [ ] **Data Model**: Update `Todo` type definition (if using TS/JSDoc) to include `priority`.
- [ ] **Service**: Update `todoService.js` `create` method to handle `priority` (default to 'medium').
- [ ] **Service**: Update `todoService.js` `update` method to allow modifying `priority`.
- [ ] **API**: Update `POST /` validation to accept valid `priority` values.
- [ ] **API**: Update `PUT /:id` validation to accept valid `priority` values.
- [ ] **Persistence**: Ensure `todos.json` correctly saves the new field.

## Frontend (`client/`)

### Phase 1: Convert Add Todo to Modal (DO THIS FIRST) ✅ COMPLETED
- [x] **Component**: Create `AddTodoModal` component with basic structure (modal backdrop, container, close button).
- [x] **Component**: Move title input field from `AddTodo` to `AddTodoModal`.
- [x] **Component**: Add form validation and submit handler to `AddTodoModal`.
- [x] **Component**: Add modal open/close state management.
- [x] **Styling**: Style the modal (centered, backdrop, responsive).
- [x] **UI**: Replace `AddTodo` inline form with a button to trigger modal.
- [x] **UI**: Integrate modal into App component.

### Phase 2: Add Priority Feature to Modal
- [ ] **Types**: Update client-side `Todo` interface with `priority: 'low' | 'medium' | 'high'`.
- [ ] **Component**: Create `PrioritySelector` component (select/dropdown with low, medium, high options).
- [ ] **Component**: Set default priority value to 'medium' in `PrioritySelector`.
- [ ] **Modal**: Add `PrioritySelector` to `AddTodoModal` form.
- [ ] **Modal**: Update submit handler to include priority in todo creation.
- [ ] **Service**: Update API service to pass `priority` field in Create calls.

### Phase 3: Display Priority in Todo List
- [ ] **Component**: Create `PriorityBadge` component with color coding (high=red, medium=yellow, low=green).
- [ ] **UI**: Add `PriorityBadge` to `TodoItem` component.
- [ ] **UI**: Add background color or border color to `TodoItem` based on priority.

### Phase 4: Sort Todos by Priority
- [ ] **Logic**: Implement sorting function to order todos by priority (high → medium → low).
- [ ] **UI**: Apply sorting to todo list display in `TodoList` or `App` component.
