/**
 * Status Constants - Single Source of Truth
 * 
 * All status values used in the application.
 * DO NOT add or modify statuses without updating this file.
 */

export const STATUSES = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    REVIEW: 'review',
    DONE: 'done'
};

export const VALID_STATUSES = Object.values(STATUSES);
export const DEFAULT_STATUS = STATUSES.TODO;

/**
 * Status display configuration
 * Contains label, color, and icon for each status
 */
export const STATUS_CONFIG = {
    [STATUSES.TODO]: {
        label: 'To Do',
        icon: '○',
        color: '#6b7280',
        bgColor: '#f3f4f6'
    },
    [STATUSES.IN_PROGRESS]: {
        label: 'In Progress',
        icon: '⟳',
        color: '#1d4ed8',
        bgColor: '#dbeafe'
    },
    [STATUSES.REVIEW]: {
        label: 'Review',
        icon: '👁',
        color: '#d97706',
        bgColor: '#fef3c7'
    },
    [STATUSES.DONE]: {
        label: 'Done',
        icon: '✓',
        color: '#047857',
        bgColor: '#d1fae5'
    }
};

/**
 * Validates a status value.
 * Returns the status if valid, or DEFAULT_STATUS with a warning if invalid.
 * 
 * @param {string} status - The status to validate
 * @returns {string} - Valid status value
 */
export function validateStatus(status) {
    if (VALID_STATUSES.includes(status)) {
        return status;
    }

    console.warn(`Invalid status "${status}" - falling back to "${DEFAULT_STATUS}"`);
    return DEFAULT_STATUS;
}

/**
 * Migrates old todo format to new status format.
 * Handles backward compatibility with boolean 'done' field.
 * 
 * @param {object} todo - Todo object to migrate
 * @returns {object} - Todo with valid status
 */
export function migrateStatus(todo) {
    // Already has valid status
    if (todo.status && VALID_STATUSES.includes(todo.status)) {
        return todo;
    }

    // Migrate from boolean 'done' field
    if (todo.done === true) {
        return { ...todo, status: STATUSES.DONE };
    }

    // Default to TODO
    return { ...todo, status: STATUSES.TODO };
}