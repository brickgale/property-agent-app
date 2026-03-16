import { z } from 'zod'
import {
  PropertyAgentSchema,
  CreatePropertyAgentSchema,
  UpdatePropertyAgentSchema,
} from '../schemas/agent.schema.js'

/**
 * TypeScript types inferred from Zod schemas
 */

// Backend types (with Date objects)
export type PropertyAgent = z.infer<typeof PropertyAgentSchema>
export type CreatePropertyAgentDTO = z.infer<typeof CreatePropertyAgentSchema>
export type UpdatePropertyAgentDTO = z.infer<typeof UpdatePropertyAgentSchema>

// Frontend types (API responses with dates as strings)
export type PropertyAgentResponse = Omit<PropertyAgent, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}
