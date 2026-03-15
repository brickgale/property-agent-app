# Property Management Application

A full-stack property agent management application built with Vue 3, TypeScript, Express, and Node.js.

## 🏗️ Project Structure

```
property-agent-app/
├── backend/          # Node.js + Express + TypeScript API
└── frontend/         # Vue 3 + Vite + TypeScript SPA
```

## 🚀 Quick Start

### One-Command Setup

```bash
# Install all dependencies (backend + frontend)
pnpm run install:all

# Run both servers concurrently
pnpm run dev
```

**That's it!** The backend will run on **http://localhost:3000** and frontend on **http://localhost:5173**

### Manual Setup

If you prefer to run them separately:

```bash
# Backend
pnpm run dev:backend

# Frontend (in another terminal)
pnpm run dev:frontend
```

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm)

## 🎯 Features

- ✅ Full CRUD operations for property agents
- ✅ In-memory data storage (no database required)
- ✅ RESTful API with validation
- ✅ Interactive API documentation (Scalar)
- ✅ Modern Vue 3 + TypeScript frontend
- ✅ State management with Pinia
- ✅ Responsive design

## 📚 Documentation

- **[Backend Documentation](./backend/README.md)** - API endpoints, data models, and backend architecture
- **[Frontend Documentation](./frontend/README.md)** - Components, routing, and state management

## 🔌 Quick Reference

| Service  | URL                            | Description          |
| -------- | ------------------------------ | -------------------- |
| Frontend | http://localhost:5173          | Vue 3 Application    |
| Backend  | http://localhost:3000          | Express API          |
| API Docs | http://localhost:3000/api-docs | Interactive API docs |
| Health   | http://localhost:3000/health   | Server health check  |

## 🎨 Tech Stack

**Backend:** Node.js, TypeScript, Express, UUID, Swagger, Scalar  
**Frontend:** Vue 3, Vite, TypeScript, Vue Router, Pinia, Axios

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
```

## 📄 License

ISC

---

Built with ❤️ using Vue 3, TypeScript, and Express
