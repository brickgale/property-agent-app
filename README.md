# Property Management Application

A full-stack property agent management application built with Vue 3, TypeScript, Express, and Node.js.

## 🏗️ Project Structure

```
property-agent-app/
├── backend/          # Node.js + Express + TypeScript API
└── frontend/         # Vue 3 + Vite + TypeScript SPA
```

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, and Delete property agents
- **In-Memory Storage**: Fast, lightweight data storage (no database required)
- **RESTful API**: Clean and well-documented API endpoints
- **Modern Frontend**: Built with Vue 3 Composition API and TypeScript
- **API Documentation**: Interactive API docs powered by Scalar
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

## 🛠️ Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will run on **http://localhost:3000**

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend app will run on **http://localhost:5173**

## 📚 API Documentation

Once the backend is running, access the interactive API documentation at:

**http://localhost:3000/api-docs**

The API documentation is powered by Scalar and provides a beautiful, interactive interface to explore and test all endpoints.

You can also access the raw OpenAPI specification at:
**http://localhost:3000/api-docs.json**

## 🔌 API Endpoints

All endpoints are prefixed with `/api`

| Method | Endpoint        | Description           |
|--------|----------------|-----------------------|
| POST   | `/agents`      | Create a new agent    |
| GET    | `/agents`      | Get all agents        |
| GET    | `/agents/:id`  | Get a single agent    |
| PUT    | `/agents/:id`  | Update an agent       |
| DELETE | `/agents/:id`  | Delete an agent       |

### Example Requests

#### Create Agent
```bash
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "mobileNumber": "09123456789"
  }'
```

#### Get All Agents
```bash
curl http://localhost:3000/api/agents
```

#### Get Single Agent
```bash
curl http://localhost:3000/api/agents/{agent-id}
```

#### Update Agent
```bash
curl -X PUT http://localhost:3000/api/agents/{agent-id} \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "email": "jane.doe@example.com"
  }'
```

#### Delete Agent
```bash
curl -X DELETE http://localhost:3000/api/agents/{agent-id}
```

## 🗂️ Data Model

### PropertyAgent

```typescript
{
  id: string;              // UUID v4
  firstName: string;
  lastName: string;
  email: string;           // Email format
  mobileNumber: string;    // 10-15 digits
  createdAt: Date;        // Auto-generated
  updatedAt: Date;        // Auto-updated
}
```

## 🎨 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Express** - Web framework
- **UUID** - Unique ID generation
- **CORS** - Cross-origin resource sharing
- **Swagger JSDoc** - API documentation generation
- **Scalar** - Beautiful API documentation UI

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vite** - Fast build tool
- **TypeScript** - Type-safe JavaScript
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Axios** - HTTP client

## 📝 Project Structure Details

### Backend Structure
```
backend/
├── src/
│   ├── config/          # Configuration files (Swagger)
│   ├── controllers/     # Request handlers
│   ├── data/           # In-memory data store
│   ├── models/         # TypeScript interfaces
│   ├── repositories/    # Data access layer
│   ├── routes/         # API routes
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── package.json
└── tsconfig.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── api/            # API service layer
│   ├── components/     # Reusable Vue components
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores
│   ├── types/          # TypeScript type definitions
│   ├── views/          # Page components
│   ├── App.vue         # Root component
│   ├── main.ts         # Application entry point
│   └── style.css       # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🧪 Testing the Application

1. Start the backend server (on port 3000)
2. Start the frontend server (on port 5173)
3. Open http://localhost:5173 in your browser
4. Try creating, editing, and deleting agents
5. View the API documentation at http://localhost:3000/api-docs

## ✨ Bonus Features Implemented

- ✅ **Request Validation**: Both client-side and server-side validation for email and mobile numbers
- ✅ **Reusable API Service**: Centralized Axios-based API client
- ✅ **Improved Error Handling**: Proper error messages and HTTP status codes
- ✅ **API Documentation**: Interactive Scalar documentation with OpenAPI/Swagger

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev    # Start with hot reload
npm run build  # Build for production
npm start      # Run production build
```

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📄 License

ISC

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using Vue 3, TypeScript, and Express
