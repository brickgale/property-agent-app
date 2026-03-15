# Property Agent Frontend

Frontend application for Property Management built with Vue 3, TypeScript, and Vite.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 🌐 Access

Once running, open [http://localhost:5173](http://localhost:5173) in your browser.

## ✨ Features

- **Agent List View**: Display all property agents in a table
- **Create Agent**: Form to add new agents
- **Edit Agent**: Update existing agent information
- **Delete Agent**: Remove agents with confirmation
- **Form Validation**: Real-time validation for all fields
- **Responsive Design**: Works on desktop and mobile
- **State Management**: Pinia store for centralized state
- **API Integration**: Axios-based service layer

## 🏗️ Project Structure

```
src/
├── api/              # API service layer
│   └── agent.service.ts
├── components/       # Reusable components (currently empty)
├── router/          # Vue Router configuration
│   └── index.ts
├── stores/          # Pinia stores
│   └── agent.store.ts
├── types/           # TypeScript interfaces
│   └── agent.ts
├── views/           # Page components
│   ├── AgentList.vue
│   └── AgentForm.vue
├── App.vue          # Root component
├── main.ts          # Application entry point
└── style.css        # Global styles
```

## 🎨 Technologies

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **Vue Router** - Official router for Vue.js
- **Pinia** - Intuitive store for Vue
- **Axios** - Promise-based HTTP client

## 🔌 API Integration

The frontend communicates with the backend API through a service layer:

```typescript
// Example: Creating an agent
import { agentService } from '@/api/agent.service'

const agent = await agentService.createAgent({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  mobileNumber: '09123456789',
})
```

## 📱 Pages

### Agent List (`/`)

- Displays all agents in a table
- Shows: Name, Email, Mobile, Created Date
- Actions: Edit and Delete buttons
- "Add New Agent" button

### Create Agent (`/agents/new`)

- Form with fields for agent information
- Real-time validation
- Success message on creation
- Cancel button returns to list

### Edit Agent (`/agents/:id/edit`)

- Pre-populated form with agent data
- Update functionality
- Validation on save
- Cancel button returns to list

## 🎯 State Management

The application uses Pinia for state management with the following store:

```typescript
// Agent Store
- agents: PropertyAgent[]
- loading: boolean
- error: string | null
- fetchAgents()
- createAgent(data)
- updateAgent(id, data)
- deleteAgent(id)
```

## ✅ Validation

Client-side validation includes:

- Required field checks
- Email format validation
- Mobile number format (10-15 digits)
- Real-time error messages

## 🛠️ Configuration

### Vite Config

The app is configured to proxy API requests:

```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

### Path Aliases

TypeScript path alias configured for cleaner imports:

```typescript
import Component from '@/components/Component.vue'
```

## 📦 Dependencies

### Production

- vue - Progressive JavaScript framework
- vue-router - Official router
- pinia - State management
- axios - HTTP client

### Development

- @vitejs/plugin-vue - Vite plugin for Vue
- typescript - TypeScript compiler
- vite - Build tool
- vue-tsc - TypeScript checker for Vue

## 🎨 Styling

The application uses custom CSS with:

- Responsive layout
- Modern button styles
- Form components
- Table styles
- Card layouts
- Utility classes

## 🚀 Building for Production

```bash
# Build the application
pnpm run build

# Preview the production build
pnpm run preview
```

The built files will be in the `dist/` directory.

## 🔧 Development Tips

- Hot Module Replacement (HMR) is enabled
- TypeScript strict mode is enabled
- Use the Vue DevTools browser extension for debugging
- Check browser console for any errors

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Type Definitions

```typescript
interface PropertyAgent {
  id: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  createdAt: string
  updatedAt: string
}
```
