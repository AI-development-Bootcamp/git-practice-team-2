# Update Status Enum

## Problem
The current todo status only supports `todo` and `done`. Users need more granular tracking of their tasks, specifically `in_progress` and `review` states.

## Solution
Extend the status field to support 4 values: `todo`, `in_progress`, `review`, `done`.
This change focuses on the database representation (persistence layer) as requested.

## Risks
- Frontend components handling "toggle" status might break if they assume only 2 states.
- Existing data is compatible (todo/done are still valid).
