# Property Agent Backend

Backend API for Property Management Application built with Node.js, TypeScript, and Express.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm run dev

# Build for production
pnpm run build

# Run production build
pnpm start
```

## 📋 Environment Variables

Create a `.env` file in the root directory (optional):

```env
PORT=3000
```

## 🔌 API Endpoints

Base URL: `http://localhost:3000/api`

### Agents

- `POST /agents` - Create a new agent
- `GET /agents` - Get all agents
- `GET /agents/:id` - Get agent by ID
- `PUT /agents/:id` - Update agent
- `DELETE /agents/:id` - Delete agent

### Health Check

- `GET /health` - Check server status

### Documentation

- `GET /api-docs` - Interactive API documentation (Scalar UI)
- `GET /api-docs.json` - OpenAPI specification (JSON)

## 🏗️ Project Structure

```
src/
├── config/          # Configuration files
│   └── swagger.ts   # OpenAPI/Swagger configuration
├── controllers/     # Route controllers
│   └── agent.controller.ts
├── data/           # In-memory data store
│   └── agents.data.ts
├── models/         # TypeScript interfaces
│   └── agent.model.ts
├── repositories/    # Data access layer
│   └── agent.repository.ts
├── routes/         # Express routes
│   └── agent.routes.ts
├── app.ts          # Express app configuration
└── server.ts       # Server entry point
```

## 🛠️ Technologies

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express** - Web framework
- **UUID** - ID generation
- **CORS** - Cross-origin resource sharing
- **Swagger JSDoc** - API documentation
- **Scalar** - API documentation UI
- **ts-node-dev** - Development server with hot reload

## 📝 Data Model

```typescript
interface PropertyAgent {
  id: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  createdAt: Date
  updatedAt: Date
}
```

## ✅ Validation Rules

- All fields are required for creation
- Email must be in valid format
- Mobile number must be 10-15 digits

## 🧪 Example Requests

### Create Agent

```bash
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobileNumber": "09123456789"
  }'
```

### Get All Agents

```bash
curl http://localhost:3000/api/agents
```

### Update Agent

```bash
curl -X PUT http://localhost:3000/api/agents/{id} \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Jane"}'
```

### Delete Agent

```bash
curl -X DELETE http://localhost:3000/api/agents/{id}
```

## 📚 API Documentation

Once running, visit:

- **Interactive Docs**: http://localhost:3000/api-docs
- **OpenAPI Spec**: http://localhost:3000/api-docs.json

## 🔒 CORS

CORS is enabled for all origins in development. Update `src/app.ts` for production use.

## 📦 Dependencies

### Production

- express - Web framework
- cors - CORS middleware
- uuid - UUID generation
- swagger-jsdoc - OpenAPI spec generation
- @scalar/express-api-reference - API documentation UI

### Development

- typescript - TypeScript compiler
- ts-node-dev - Development server
- @types/node - Node.js type definitions
- @types/express - Express type definitions
- @types/cors - CORS type definitions
- @types/uuid - UUID type definitions
