# todo-persistence Specification

## Requirements

## MODIFIED Requirements

### Requirement: Todo Data Model
Each todo SHALL have an id, title, status, createdAt, and updatedAt fields.

#### Scenario: New todo structure
- **WHEN** a todo is created
- **THEN** it has id, title, status (**todo|done|in_progress|review**), createdAt, updatedAt

### ADDED Requirements

### Requirement: Status Configuration
The allowed status values SHALL be stored in a configuration file.

#### Scenario: Status file existence
- **WHEN** the server starts
- **THEN** it reads allowed statuses from `data/status.json`

### Requirement: Status Validation
The service MUST ensure valid status values based on configuration.

#### Scenario: Valid status values
- **WHEN** a todo is created or updated
- **THEN** status MUST be one of the values defined in `status.json` (default: todo, in_progress, review, done)

#### Scenario: Case-insensitive validation
- **WHEN** a status is provided with different casing (e.g., "Todo", "IN_PROGRESS")
- **THEN** it accepts the value and normalizes it to lowercase definitions in `status.json`

#### Scenario: Invalid status error
- **WHEN** an invalid status is provided (e.g., "banana")
- **THEN** the operation fails with a 400 Bad Request error and a descriptive message
