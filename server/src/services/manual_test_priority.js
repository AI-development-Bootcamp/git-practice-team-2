import { todoService } from './todoService.js';

console.log('--- Starting Manual Test for Todo Priority (Service Level) ---');

// Test 1: Create with explicit priority
console.log('\n1. Testing Create with explicit priority "high"...');
const highTodo = todoService.create({ title: 'High Priority Task', priority: 'high' });
if (highTodo.priority === 'high') {
    console.log('PASS: Priority is "high"');
} else {
    console.error('FAIL: Expected "high", got', highTodo.priority);
}

// Test 2: Create with default priority
console.log('\n2. Testing Create with default priority (no field provided)...');
const defaultTodo = todoService.create({ title: 'Default Priority Task' });
if (defaultTodo.priority === 'medium') {
    console.log('PASS: Priority defaulted to "medium"');
} else {
    console.error('FAIL: Expected "medium", got', defaultTodo.priority);
}

// Test 3: Update priority
console.log('\n3. Testing Update priority from "medium" to "low"...');
const updatedTodo = todoService.update(defaultTodo.id, { priority: 'low' });
if (updatedTodo.priority === 'low') {
    console.log('PASS: Priority updated to "low"');
} else {
    console.error('FAIL: Expected "low", got', updatedTodo.priority);
}

// Cleanup
console.log('\n--- Cleanup ---');
todoService.delete(highTodo.id);
todoService.delete(defaultTodo.id);
console.log('Created test todos deleted.');
console.log('--- Test Complete ---');
