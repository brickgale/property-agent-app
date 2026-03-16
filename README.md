# Property Agent Management App

A full-stack property management application built with Node.js/TypeScript backend and Vue 3 frontend, featuring **shared types and Zod validation**.

## 🏗️ Project Structure

```
property-agent-app/
├── shared/              # Shared types and Zod schemas
│   ├── schemas.ts       # PropertyAgent schemas and types
│   └── package.json     # Zod dependency
├── backend/            # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── models/     # Class-based models using shared schemas
│   │   ├── repositories/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── config/     # Swagger/Scalar API docs
│   └── package.json
├── frontend/           # Vue 3 + TypeScript + Vite
│   ├── src/
│   │   ├── views/      # AgentList, AgentForm
│   │   ├── stores/     # Pinia state management
│   │   ├── api/        # Axios API client
│   │   └── types/      # Re-exports from shared
│   └── package.json
└── package.json        # Root scripts for monorepo
```

## ✨ Features

- **Shared Types with Zod**: Single source of truth for types and validation
- **Backend API**: RESTful CRUD endpoints with class-based models
- **Frontend**: Vue 3 with Composition API, Pinia, and Vue Router
- **API Documentation**: Interactive docs at `/api-docs` (Scalar)
- **Type Safety**: Full TypeScript coverage with runtime validation
- **Modern Tooling**: ESLint 9, Prettier, pnpm, tsx

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (install with `npm install -g pnpm`)

### Installation

```bash
# Install all dependencies (root + shared + backend + frontend)
pnpm run install:all
```

### Development

```bash
# Run both backend and frontend concurrently
pnpm run dev

# Backend runs on: http://localhost:3000
# Frontend runs on: http://localhost:5173
# API docs at: http://localhost:3000/api-docs
```

### Available Commands

```bash
# Install dependencies
pnpm run install:all        # Install all packages
pnpm run install:shared     # Install shared package only
pnpm run install:backend    # Install backend only
pnpm run install:frontend   # Install frontend only

# Development
pnpm run dev               # Run both servers concurrently
pnpm run dev:backend       # Run backend only
pnpm run dev:frontend      # Run frontend only

# Build
pnpm run build             # Build both projects
pnpm run build:backend     # Build backend only
pnpm run build:frontend    # Build frontend only

# Code Quality
pnpm run format            # Format all code with Prettier
pnpm run lint              # Lint all code with ESLint
pnpm run lint:fix          # Fix ESLint issues automatically
```

## � Technology Stack

### Shared

- **Zod** 3.23.8 - Runtime validation and type inference
- **TypeScript** 5.3.3

### Backend

- **Node.js** with **TypeScript** 5.3.3
- **Express** 4.18.2
- **UUID** 9.0.1
- **Scalar** 0.4.46 (API documentation)
- **tsx** 4.21.0 (Fast TypeScript execution)
- **ESLint** 9.17.0 + **Prettier** 3.4.2

### Frontend

- **Vue 3** 3.5.26 (Composition API)
- \*\*� API Endpoints

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | /api/agents     | Get all agents   |
| GET    | /api/agents/:id | Get agent by ID  |
| POST   | /api/agents     | Create new agent |
| PUT    | /api/agents/:id | Update agent     |
| DELETE | /api/agents/:id | Delete agent     |

Interactive API documentation: http://localhost:3000/api-docs

## 🎨 Code Style

- **2 spaces** indentation
- **Single quotes** for strings
- **No semicolons**
- **Format on save** enabled in VSCode
- ESLint 9 with flat config

## 📖 Documentation

- [Backend Documentation](./backend/README.md) - API, models, repositories
- [Frontend Documentation](./frontend/README.md) - Components, stores, routing
- [Shared Types Documentation](./shared/README.md) - Schemas, validation, usage

## 🔄 Development Workflow

1. **Modify shared schemas**: Edit `shared/schemas.ts`
2. **Types auto-update**: Backend and frontend get updated types
3. **Validation works everywhere**: Same validation rules apply
4. **Hot reload**: Both servers detect changes automatically

## 🏛️ Architecture

### Backend Architecture

```
Request → Routes → Controller → Repository → In-Memory Storage
                      ↓
                 Validation (Zod)
                      ↓
                  Model Class
```

### Frontend Architecture

```
Component → Pinia Store → API Service → Backend API
     ↓
Validation (Zod)
```

## 📝 Example: Creating an Agent

### Backend Validation

```typescript
// Automatic validation in PropertyAgent.create()
const agent = PropertyAgent.create(data) // Throws ZodError if invalid
```

### Frontend Validation

```typescript
// Client-side validation before API call
try {
  CreatePropertyAgentSchema.parse(formData)
  await agentService.createAgent(formData)
} catch (error) {
  if (error instanceof ZodError) {
    // Show validation errors to user
  }
}
```

## 🤝 Contributing

1. Format code: `pnpm run format`
2. Fix linting: `pnpm run lint:fix`
3. Test endpoints at http://localhost:3000/api-docs

## 📄 License

MIT

---

Built with ❤️ using Vue 3, TypeScript, Express, and Zod
})

export type PropertyAgent = z.infer<typeof PropertyAgentSchema>

````

**Benefits:**

- ✅ Single source of truth for types
- ✅ Runtime validation on backend and frontend
- ✅ Type inference from schemas
- ✅ Consistent validation rules everywhere

## 📝 Available Scripts

```bash
pnpm run install:all      # Install all dependencies
pnpm run dev              # Run both servers concurrently
pnpm run dev:backend      # Run backend only
pnpm run dev:frontend     # Run frontend only
pnpm run build            # Build both projects
pnpm run build:backend    # Build backend only
pnpm run build:frontend   # Build frontend only
pnpm run format           # Format all code with Prettier
pnpm run lint             # Lint backend and frontend
pnpm run lint:fix         # Fix linting issues
````

## 📄 License

ISC

---

Built with ❤️ using Vue 3, TypeScript, and Express
