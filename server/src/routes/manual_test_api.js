import Fastify from 'fastify';
import todosRoutes from './todos.js';
import { todoService } from '../services/todoService.js';

async function runTests() {
    const fastify = Fastify();
    fastify.register(todosRoutes, { prefix: '/api/todos' });

    console.log('--- Starting Manual API Test ---');

    // Test 1: POST with valid priority
    console.log('\n1. POST /api/todos with priority "high"');
    const res1 = await fastify.inject({
        method: 'POST',
        url: '/api/todos',
        payload: { title: 'Valid Priority', priority: 'high' }
    });
    if (res1.statusCode === 201 && JSON.parse(res1.body).priority === 'high') {
        console.log('PASS: Created with priority "high"');
    } else {
        console.error('FAIL: Status', res1.statusCode, 'Body', res1.body);
    }

    // Test 2: POST with invalid priority
    console.log('\n2. POST /api/todos with priority "urgent" (Invalid)');
    const res2 = await fastify.inject({
        method: 'POST',
        url: '/api/todos',
        payload: { title: 'Invalid Priority', priority: 'urgent' }
    });
    if (res2.statusCode === 400 && JSON.parse(res2.body).error === 'Invalid priority') {
        console.log('PASS: Rejected invalid priority');
    } else {
        console.error('FAIL: Status', res2.statusCode, 'Body', res2.body);
    }

    // Test 3: PUT with invalid priority
    // First get the ID of the valid one
    const todoId = JSON.parse(res1.body).id;
    console.log(`\n3. PUT /api/todos/${todoId} with priority "super-low" (Invalid)`);
    const res3 = await fastify.inject({
        method: 'PUT',
        url: `/api/todos/${todoId}`,
        payload: { priority: 'super-low' }
    });
    if (res3.statusCode === 400 && JSON.parse(res3.body).error === 'Invalid priority') {
        console.log('PASS: Rejected invalid priority update');
    } else {
        console.error('FAIL: Status', res3.statusCode, 'Body', res3.body);
    }

    console.log('\n--- Test Complete ---');
    // Cleanup
    todoService.delete(todoId);
    console.log('Cleanup: Deleted test todo');
}

runTests();
