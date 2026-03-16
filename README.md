# Property Agent Management App

A full-stack property management application with Node.js/TypeScript backend and Vue 3 frontend, featuring **shared Zod schemas** for type-safe validation.

## 🏗️ Project Structure

```
property-agent-app/
├── docs/               # Documentation (ERD, database schema)
├── shared/             # Shared Zod schemas and TypeScript types
├── backend/            # Express API with Swagger docs
├── frontend/           # Vue 3 + Pinia + Radix UI
└── package.json        # Monorepo scripts
```

## ✨ Features

- **6 Entity Types**: Agents, Properties, Tenants, Tickets, Addresses, Property-Tenant relationships
- **Shared Validation**: Single source of truth with Zod schemas
- **Auto-Assignment**: Tickets inherit agent from property
- **Polymorphic Addresses**: Flexible address system for all entities
- **Form Utilities**: Random test data generator for quick testing
- **API Documentation**: Interactive Scalar docs at `/api-docs`
- **Type Safety**: Full TypeScript coverage with runtime validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Development

```bash
# Install all dependencies
pnpm run install:all

# Run backend + frontend concurrently
pnpm run dev
```

**Access Points:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api-docs

### Common Commands

```bash
pnpm run install:all       # Install all dependencies
pnpm run dev               # Run both servers
pnpm run dev:backend       # Backend only
pnpm run dev:frontend      # Frontend only
pnpm run build             # Build both projects
pnpm run format            # Format code
pnpm run lint:fix          # Fix linting issues
```

## 🗄️ Database Schema

Six main entities with relationships:

- **PropertyAgent** → manages Properties, assigned to Tickets
- **Property** → has Tickets, Tenants, Addresses
- **Tenant** → rents Properties via PropertyTenant junction
- **Ticket** → linked to Property, auto-assigned to Agent
- **Address** → polymorphic (Property/Tenant/Agent)
- **PropertyTenant** → many-to-many Property↔Tenant

📄 [Full ERD & Schema Documentation](./docs/database-schema.md)

## 🔧 Technology Stack

**Backend:** Node.js, Express, TypeScript, Zod, Scalar  
**Frontend:** Vue 3, Pinia, Vue Router, Radix Vue, Tailwind CSS  
**Shared:** Zod schemas, TypeScript types  
**Tooling:** pnpm, tsx, ESLint 9, Prettier

## 📖 Documentation

- [Database Schema](./docs/database-schema.md) - ERD, tables, relationships
- [Backend README](./backend/README.md) - API details, models
- [Frontend README](./frontend/README.md) - Components, stores
- [Shared README](./shared/README.md) - Schemas, validation

## 📄 License

MIT

---

Built with ❤️ using Vue 3, TypeScript, Express, and Zod
