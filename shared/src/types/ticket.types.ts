import { z } from 'zod'
import {
  TicketSchema,
  CreateTicketSchema,
  UpdateTicketSchema,
  TicketTypeEnum,
  TicketPriorityEnum,
  TicketStatusEnum,
} from '../schemas/ticket.schema.js'

/**
 * TypeScript types inferred from Zod schemas
 */

// Re-export schemas
export {
  TicketSchema,
  CreateTicketSchema,
  UpdateTicketSchema,
  TicketTypeEnum,
  TicketPriorityEnum,
  TicketStatusEnum,
} from '../schemas/ticket.schema.js'

// Enums
export type TicketType = z.infer<typeof TicketTypeEnum>
export type TicketPriority = z.infer<typeof TicketPriorityEnum>
export type TicketStatus = z.infer<typeof TicketStatusEnum>

// Backend types (with Date objects)
export type Ticket = z.infer<typeof TicketSchema>
export type CreateTicketDTO = z.infer<typeof CreateTicketSchema>
export type UpdateTicketDTO = z.infer<typeof UpdateTicketSchema>

// Frontend types (API responses with dates as strings)
export type TicketResponse = Omit<Ticket, 'createdAt' | 'updatedAt' | 'dueDate'> & {
  createdAt: string
  updatedAt: string
  dueDate?: string
}
