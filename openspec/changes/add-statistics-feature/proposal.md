# Change: Add Statistics Feature

## Why

Users need visibility into their todo completion progress. A statistics page will display key metrics (total tasks, count by status, completion percentage) to help users track their productivity and understand their task distribution.

## What Changes

- Add statistics API endpoint (`GET /api/statistics`) that calculates metrics server-side
- Add navigation component to switch between Tasks and Statistics pages
- Add Statistics page component displaying metrics as cards
- Extend API service to fetch statistics
- Update App component to support page navigation

## Impact

- Affected specs:
  - `server-api` (new statistics endpoint requirement)
  - `todo-components` (navigation and statistics page components)
- Affected code:
  - `server/src/routes/statistics.js`
  - `server/src/services/todoService.js` (add statistics calculation method)
  - `client/src/services/api.js` (add statistics API method)
  - `client/src/components/App.jsx` (add navigation state)
  - `client/src/components/Navigation.jsx` (new component)
  - `client/src/components/StatisticsPage.jsx` (new component)
- Dependencies: Requires existing `server-api` and `todo-components` capabilities
