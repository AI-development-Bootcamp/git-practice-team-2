## 1. Backend: Statistics Service Method

- [x] 1.1 Add `getStatistics()` method to `server/src/services/todoService.js`
- [x] 1.2 Calculate total count (all todos)
- [x] 1.3 Calculate todo count (status === 'todo')
- [x] 1.4 Calculate done count (status === 'done')
- [x] 1.5 Calculate completion percentage ((done / total) \* 100, handle zero division)
- [x] 1.6 Return statistics object with all metrics

## 2. Backend: Statistics API Endpoint

- [x] 2.1 Add GET `/api/statistics` route handler
- [x] 2.2 Call `todoService.getStatistics()`
- [x] 2.3 Return statistics as JSON response
- [x] 2.4 Register route in server (can add to existing todos routes or create separate file)

## 3. Frontend: API Service Extension

- [x] 3.1 Add `statistics` object to `client/src/services/api.js`
- [x] 3.2 Add `getAll()` method that calls `GET /api/statistics`
- [x] 3.3 Handle errors appropriately

## 4. Frontend: Navigation Component
- [x] 4.1 Create `client/src/components/Navigation.jsx`
- [x] 4.2 Add buttons/links for "Tasks" and "Statistics" pages
- [x] 4.3 Accept `currentPage` and `onPageChange` props
- [x] 4.4 Style navigation appropriately

## 5. Frontend: Statistics Page Component
- [x] 5.1 Create `client/src/components/StatisticsPage.jsx`
- [x] 5.2 Add state for statistics data, loading, and error
- [x] 5.3 Fetch statistics on mount using `api.statistics.getAll()`
- [x] 5.4 Create card components for each metric:
  - [x] 5.4.1 Total tasks card
  - [x] 5.4.2 Todo count card
  - [x] 5.4.3 Done count card
  - [x] 5.4.4 Completion percentage card
- [x] 5.5 Display loading state
- [x] 5.6 Display error state
- [x] 5.7 Style cards appropriately

## 6. Frontend: App Component Updates
- [x] 6.1 Add `currentPage` state ('tasks' | 'statistics')
- [x] 6.2 Add `handlePageChange` function
- [x] 6.3 Import Navigation component
- [x] 6.4 Import StatisticsPage component
- [x] 6.5 Render Navigation component
- [x] 6.6 Conditionally render Tasks view or StatisticsPage based on `currentPage`
- [x] 6.7 Ensure existing Tasks functionality still works

## 7. Validation

- [ ] 7.1 Test statistics endpoint returns correct data
- [ ] 7.2 Test navigation switches between pages
- [ ] 7.3 Test statistics page displays all metrics correctly
- [ ] 7.4 Test edge cases (no todos, all done, all todo)
- [ ] 7.5 Verify statistics update after todo changes (refresh page)
