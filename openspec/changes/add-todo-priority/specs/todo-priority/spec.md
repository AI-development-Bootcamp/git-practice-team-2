# Todo Priority Specification

## ADDED Requirements

### Requirement: Priority Field
The Todo data model SHALL include a priority field.

#### Scenario: Priority levels
- **WHEN** checking possible values
- **THEN** valid values are 'low', 'medium', 'high'

#### Scenario: Default priority
- **WHEN** a todo is created without explicit priority
- **THEN** it defaults to 'medium'

### Requirement: Visual Representation
The UI SHALL display visual indicators based on priority.

#### Scenario: High Priority
- **WHEN** a todo is high priority
- **THEN** it is displayed with a distinct colour or icon indicating urgency (typically red).

#### Scenario: Medium Priority
- **WHEN** a todo is medium priority
- **THEN** it is displayed with a neutral/standard indicator (typically yellow or default).

#### Scenario: Low Priority
- **WHEN** a todo is low priority
- **THEN** it is displayed with a "relaxed" indicator (typically green/blue or gray).

### Requirement: Modification
Users SHALL be able to set and change priority.

#### Scenario: Set on create
- **WHEN** creating a todo
- **THEN** the user can select the priority level

#### Scenario: Update priority
- **WHEN** editing a todo (or interacting with priority action)
- **THEN** the priority can be changed and persisted
