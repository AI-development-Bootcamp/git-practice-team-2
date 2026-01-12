import { todoService } from "../services/todoService.js";

export default async function todosRoutes(fastify, options) {
  // GET /api/todos - Get all todos
  fastify.get("/", async (request, reply) => {
    return todoService.getAll();
  });

  // GET /api/todos/statistics - Get statistics
  fastify.get("/statistics", async (request, reply) => {
    return todoService.getStatistics();
  });

  // GET /api/todos/:id - Get single todo
  fastify.get("/:id", async (request, reply) => {
    const todo = todoService.getById(request.params.id);
    if (!todo) {
      return reply.status(404).send({ error: "Todo not found" });
    }
    return todo;
  });

  // POST /api/todos - Create new todo
  fastify.post('/', async (request, reply) => {
    const { title,status,priority } = request.body;
    if (!title || !title.trim()) {
      return reply.status(400).send({ error: "Title is required" });
    }
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return reply.status(400).send({ error: 'Invalid priority' });
    }
    try {
      const todo = todoService.create({ title: title.trim(), status,priority });
      return reply.status(201).send(todo);
    } catch (error) {
      if (error.statusCode) {
        return reply.status(error.statusCode).send(error);
      }
      throw error;
    }
  });

  // PUT /api/todos/:id - Update todo
  fastify.put('/:id', async (request, reply) => {
    const { priority } = request.body;
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return reply.status(400).send({ error: 'Invalid priority' });
    }
    const todo = todoService.update(request.params.id, request.body);
    if (!todo) {
      return reply.status(404).send({ error: "Todo not found" });
    }
    return todo;
  });

  // DELETE /api/todos/:id - Delete todo
  fastify.delete("/:id", async (request, reply) => {
    const deleted = todoService.delete(request.params.id);
    if (!deleted) {
      return reply.status(404).send({ error: "Todo not found" });
    }
    return { success: true };
  });
}
