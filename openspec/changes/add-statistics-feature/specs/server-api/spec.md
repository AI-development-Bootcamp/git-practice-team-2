## ADDED Requirements

### Requirement: Statistics Endpoint

The API SHALL provide an endpoint to retrieve aggregated statistics about todos.

#### Scenario: Get statistics with todos

- **WHEN** GET /api/statistics is called
- **THEN** statistics object is returned with total, statsCount.todo, statsCount.done counts and completion percentage

#### Scenario: Get statistics with no todos

- **WHEN** GET /api/statistics is called and no todos exist
- **THEN** statistics object is returned with total as 0, statsCount.todo as 0, statsCount.done as 0, and completion percentage as 0

#### Scenario: Statistics calculation accuracy

- **WHEN** GET /api/statistics is called
- **THEN** total equals sum of statsCount.todo and statsCount.done, and completion percentage equals (statsCount.done / total) \* 100
