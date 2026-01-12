# Design: Statistics Feature

## Context

The statistics feature needs to display aggregate metrics about todos. The team is split: one developer handles backend, one handles frontend. We need clear API contracts and separation of concerns.

## Goals / Non-Goals

### Goals

- Display total task count
- Display count by status (todo vs done)
- Display completion percentage
- Provide navigation between Tasks and Statistics pages
- Keep implementation simple for workshop participants

### Non-Goals

- Historical trends or time-based analytics
- Filtering or date ranges
- Export functionality
- Real-time updates (page refresh required)

## Decisions

### Decision: Server-Side Calculation

**What**: Statistics are calculated on the server, not the client.

**Why**:

- Consistent with existing architecture pattern (Routes → Services → Data)
- Single source of truth for calculations
- Can be optimized/cached in the future if needed
- Reduces client-side computation
- Better separation of concerns (backend handles data aggregation)

**Alternatives considered**:

- Client-side calculation: Would require fetching all todos and calculating locally. Less efficient, duplicates logic.

### Decision: Statistics Endpoint Structure

**What**: New endpoint `GET /api/statistics` returns aggregated metrics.

**Why**:

- Follows RESTful pattern
- Separate from todo CRUD operations
- Can be extended with additional metrics in the future
- Clear separation of concerns

**Alternatives considered**:

- Adding statistics to existing `/api/todos` endpoint: Would mix concerns, less RESTful.

### Decision: Statistics DTO Structure

**What**: Response format:

```json
{
  "total": 10,
  "statsCount": {
    "todo": 6,
    "done": 4
  },
  "completionPercentage": 40.0
}
```

**Why**:

- Grouped structure groups status counts together logically
- All metrics in one response
- Percentage as decimal (0-100) for easy display
- Matches the metrics requested (total, by status, percentage)
- Status counts are nested for better organization and extensibility

**Alternatives considered**:

- Flat structure: Less organized, harder to extend with additional status types
- Separate endpoints per metric: Too many requests, inefficient

### Decision: Navigation Pattern

**What**: Simple state-based navigation in App component with Navigation component for page switching.

**Why**:

- No routing library needed (keeps it simple)
- Fits workshop scope
- Easy to understand and implement
- Can be upgraded to React Router later if needed

**Alternatives considered**:

- React Router: Adds dependency, more complex for simple two-page app

### Decision: Card-Based Display

**What**: Statistics displayed as individual cards, one per metric.

**Why**:

- Clear visual separation
- Easy to scan
- Modern UI pattern
- Can be styled consistently

## Risks / Trade-offs

### Risk: Statistics May Be Stale

**Mitigation**: Statistics are calculated on-demand. Users can refresh the page to get updated metrics. Future enhancement could add real-time updates.

### Trade-off: No Caching

**Current**: Statistics calculated on every request.
**Future**: Can add caching if performance becomes an issue (unlikely with JSON file storage).

## Implementation Notes

### Backend Implementation

- Add `getStatistics()` method to `todoService`
- Create statistics route handler (can be added to existing routes file or separate file)
- Calculate metrics from all todos:
  - `total`: length of todos array
  - `statsCount.todo`: count where status === 'todo'
  - `statsCount.done`: count where status === 'done'
  - `completionPercentage`: (statsCount.done / total) \* 100, handle division by zero

### Frontend Implementation

- Add `statistics` object to API service with `getAll()` method
- Add navigation state to App component (currentPage: 'tasks' | 'statistics')
- Create Navigation component with buttons/links
- Create StatisticsPage component with card layout
- Conditionally render Tasks or Statistics page based on state

## Open Questions

None - design is complete and ready for implementation.
