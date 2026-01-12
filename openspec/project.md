# Project Context

## Purpose

A simple, clean Todo application for a Git workshop. Teams will extend this base app with new features (Board View, Statistics, etc.) to practice Git workflows.

## Tech Stack

- **Client**: React 18.2.0 with Vite 5.0.0
- **Server**: Node.js (ES modules) with Fastify 4.24.0
- **Database**: JSON file (`server/src/data/todos.json`) - simple file-based persistence
- **Styling**: Plain CSS (clean, minimal)
- **Package Manager**: npm
- **Structure**: Monorepo with `client/` and `server/` directories
- **Development**: concurrently 8.2.0 for running multiple processes
- **CORS**: @fastify/cors 8.4.0 (configured for localhost:5173)

## Project Conventions

### Code Style

- Use ES modules (`"type": "module"` in package.json)
- Functional React components with hooks (useState, useEffect)
- Descriptive variable names (camelCase)
- Minimal comments - code should be self-documenting
- Async/await for asynchronous operations
- Error handling with try/catch blocks
- Use named exports for services, default exports for components

### Architecture Patterns

- **Server**: Routes → Services → Data
  - Routes (`server/src/routes/`) handle HTTP requests/responses
  - Services (`server/src/services/`) contain business logic
  - Data (`server/src/data/`) stores JSON file
- **Client**: Components → Services (API) → Server
  - Components (`client/src/components/`) handle UI and user interactions
  - API service (`client/src/services/api.js`) handles HTTP communication
  - Server provides REST API endpoints
- Single responsibility per file
- No premature abstraction
- Service objects export methods (e.g., `todoService.getAll()`)
- API service uses nested object structure (e.g., `api.todos.getAll()`)

### File Structure

```
todo-workshop/
├── client/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API client
│   │   ├── App.css         # Global styles
│   │   └── main.jsx        # Entry point
│   ├── vite.config.js      # Vite configuration (port 5173)
│   └── package.json
├── server/
│   ├── src/
│   │   ├── routes/         # Fastify route handlers
│   │   ├── services/       # Business logic
│   │   ├── data/           # JSON data file
│   │   └── server.js       # Server entry point
│   └── package.json
└── package.json            # Root workspace config
```

### API Patterns

- Base URL: `http://localhost:3001/api`
- Endpoints follow REST conventions:
  - `GET /api/todos` - Get all todos
  - `GET /api/todos/:id` - Get single todo
  - `POST /api/todos` - Create todo (body: `{ title: string }`)
  - `PUT /api/todos/:id` - Update todo (body: `{ status?: string, title?: string }`)
  - `DELETE /api/todos/:id` - Delete todo
- Error responses: `{ error: string }` with appropriate HTTP status codes
- Success responses: Todo object(s) or `{ success: true }`

### Server Patterns

- Fastify with logger enabled
- CORS configured for `http://localhost:5173`
- Routes registered with prefix `/api/todos`
- File operations use synchronous `readFileSync`/`writeFileSync`
- UUID generation using `crypto.randomUUID()`
- ISO date strings for timestamps (`new Date().toISOString()`)

### Client Patterns

- React functional components
- State management with useState hooks
- Side effects with useEffect hooks
- Loading and error states handled in components
- Optimistic UI updates (update local state immediately, handle errors separately)
- API calls wrapped in try/catch blocks

### Testing Strategy

- Manual testing for this workshop project
- Future: Add Jest for unit tests as teams extend

### Git Workflow

- Feature branches for new features
- Merge conflicts are intentional learning opportunities
- Small, focused commits

## Domain Context

- **Todo**: A task with:
  - `id`: UUID string
  - `title`: string (required, trimmed)
  - `status`: "todo" | "done" (default: "todo")
  - `createdAt`: ISO date string
  - `updatedAt`: ISO date string
- **Status flow**: todo ↔ done (toggle)
- **Persistence**: JSON file on server filesystem (`server/src/data/todos.json`)
- **Validation**: Title must be non-empty string (trimmed)

## Important Constraints

- Keep implementation simple for workshop participants
- No authentication required
- No external database dependencies
- Must work offline (file-based storage)
- Server runs on port 3001
- Client runs on port 5173
- Use Node.js built-in `--watch` flag for server development
- Use Vite dev server for client development

## External Dependencies

- **Server**:
  - `fastify@^4.24.0` - HTTP server framework
  - `@fastify/cors@^8.4.0` - CORS plugin
- **Client**:
  - `react@^18.2.0` - UI library
  - `react-dom@^18.2.0` - React DOM renderer
  - `vite@^5.0.0` - Build tool and dev server
  - `@vitejs/plugin-react@^4.2.0` - Vite React plugin
- **Root**:
  - `concurrently@^8.2.0` - Run multiple npm scripts

## Development Scripts

- `npm run dev` - Run both client and server concurrently
- `npm run server` - Run server only (`cd server && npm run dev`)
- `npm run client` - Run client only (`cd client && npm run dev`)
- `npm run install:all` - Install dependencies in root, client, and server

## Implementation Order

Changes should be implemented in the following order based on dependencies:

| Order | Change                    | Dependencies                          |
| ----- | ------------------------- | ------------------------------------- |
| 1     | `setup-project-structure` | None                                  |
| 2     | `add-server-core`         | None                                  |
| 3     | `add-todo-persistence`    | None                                  |
| 4     | `add-server-api-routes`   | add-server-core, add-todo-persistence |
| 5     | `add-client-setup`        | None                                  |
| 6     | `add-todo-components`     | add-client-setup                      |

Steps 1-3 and 5 can be done in parallel. Step 4 requires 2 and 3. Step 6 requires 5.
