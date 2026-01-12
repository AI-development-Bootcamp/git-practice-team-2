## ADDED Requirements

### Requirement: Navigation Component
The application SHALL provide navigation to switch between Tasks and Statistics pages.

#### Scenario: Display navigation
- **WHEN** the application loads
- **THEN** navigation component displays "Tasks" and "Statistics" options

#### Scenario: Switch to statistics page
- **WHEN** user clicks "Statistics" in navigation
- **THEN** statistics page is displayed

#### Scenario: Switch to tasks page
- **WHEN** user clicks "Tasks" in navigation
- **THEN** tasks page is displayed

### Requirement: Statistics Page Component
The application SHALL display statistics metrics in a card-based layout.

#### Scenario: Display statistics cards
- **WHEN** statistics page loads
- **THEN** four cards are displayed showing total tasks, todo count, done count, and completion percentage

#### Scenario: Loading state
- **WHEN** statistics are being fetched
- **THEN** loading indicator is displayed

#### Scenario: Error state
- **WHEN** statistics fetch fails
- **THEN** error message is displayed

#### Scenario: Statistics data display
- **WHEN** statistics are loaded successfully
- **THEN** each card displays the correct metric value
