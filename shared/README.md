# Shared Types Package

This package contains shared types and Zod validation schemas used by both the backend and frontend applications.

## 📁 Structure

```
shared/
├── src/
│   ├── schemas/
│   │   └── agent.schema.ts      # Zod validation schemas
│   ├── types/
│   │   ├── agent.types.ts       # PropertyAgent types
│   │   ├── api.types.ts         # API response types
│   │   └── index.ts             # Type exports
│   └── index.ts                 # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Purpose

- **Single Source of Truth**: Types defined once, shared everywhere
- **Runtime Validation**: Zod schemas provide runtime type checking
- **Type Safety**: TypeScript types automatically inferred from schemas
- **Consistent Validation**: Same rules on client and server
- **API Contracts**: Shared error and response types

## 📦 What's Included

### Schemas (`@shared/schemas`)

Zod validation schemas for runtime validation:

- `PropertyAgentSchema` - Full agent validation
- `CreatePropertyAgentSchema` - Create agent (omits id, timestamps)
- `UpdatePropertyAgentSchema` - Update agent (partial fields)

### Types (`@shared/types`)

#### Agent Types

- `PropertyAgent` - Backend type with Date objects
- `PropertyAgentResponse` - API response type with string dates
- `CreatePropertyAgentDTO` - DTO for creating agents
- `UpdatePropertyAgentDTO` - DTO for updating agents

#### API Types

- `ApiErrorResponse` - Standard error response `{ error: string }`
- `ApiValidationErrorResponse` - Zod validation errors with details
- `ValidationError` - Single validation error (field + message)
- `ApiResponse<T>` - Generic response wrapper
- `PaginationMeta` - Pagination metadata
- `PaginatedResponse<T>` - Paginated response wrapper

## 🚀 Usage

### Backend

```typescript
// Import schemas for validation
import {
  PropertyAgentSchema,
  CreatePropertyAgentSchema,
  UpdatePropertyAgentSchema,
} from '@shared/schemas'

// Import types
import type {
  PropertyAgent,
  CreatePropertyAgentDTO,
  ApiValidationErrorResponse,
} from '@shared/types'

// Validate data
const validated = CreatePropertyAgentSchema.parse(data) // Throws ZodError if invalid
```

### Frontend

```typescript
// Import types for API responses
import type { PropertyAgentResponse, CreatePropertyAgentDTO, ApiErrorResponse } from '@shared/types'

// Import schemas for client-side validation
import { CreatePropertyAgentSchema } from '@shared/schemas'

// Client-side validation
try {
  CreatePropertyAgentSchema.parse(formData)
} catch (error) {
  if (error instanceof ZodError) {
    // Handle validation errors
  }
}
```

### Import Paths

```typescript
// Import everything
import { PropertyAgentSchema, PropertyAgent, ApiErrorResponse } from '@shared'

// Import specific submodules
import { PropertyAgentSchema } from '@shared/schemas'
import type { PropertyAgent, ApiErrorResponse } from '@shared/types'
```

## ⚙️ Configuration

**backend/tsconfig.json & frontend/tsconfig.json:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared": ["../shared/src/index.ts"],
      "@shared/schemas": ["../shared/src/schemas/agent.schema.ts"],
      "@shared/types": ["../shared/src/types/index.ts"]
    }
  }
}
```

**frontend/vite.config.ts:**

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src/index.ts'),
      '@shared/schemas': path.resolve(__dirname, '../shared/src/schemas/agent.schema.ts'),
      '@shared/types': path.resolve(__dirname, '../shared/src/types/index.ts'),
    },
  },
})
```

## 📋 Validation Rules

- `firstName`: Required, minimum 1 character
- `lastName`: Required, minimum 1 character
- `email`: Valid email format
- `mobileNumber`: 10-15 digits (spaces/dashes auto-removed)

## 🎨 API Response Examples

### Success Response

```typescript
const agent: PropertyAgentResponse = {
  id: '...',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  mobileNumber: '1234567890',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}
```

### Error Responses

```typescript
// Simple error
const error: ApiErrorResponse = {
  error: 'Agent not found',
}

// Validation error
const validationError: ApiValidationErrorResponse = {
  error: 'Validation failed',
  details: [
    { field: 'email', message: 'Invalid email format' },
    { field: 'firstName', message: 'First name is required' },
  ],
}
```

## 📚 Benefits

1. **DRY**: Define once, use everywhere
2. **Type Safety**: Compile-time + runtime validation
3. **Consistency**: Same validation everywhere
4. **Error Types**: Standardized responses
5. **Maintainability**: Single source of truth
6. **Scalability**: Easy to extend

## 🛠️ Dependencies

- `zod` ^3.23.8 - Schema validation
- `typescript` ^5.3.3 - TypeScript compiler
