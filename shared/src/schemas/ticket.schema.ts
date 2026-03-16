import { z } from 'zod'

/**
 * Zod schemas for Ticket validation
 * Tickets are reminders or notes that can be assigned to properties
 */

export const TicketTypeEnum = z.enum([
  'reminder',
  'note',
  'maintenance',
  'inspection',
  'payment',
  'other',
])

export const TicketPriorityEnum = z.enum(['low', 'medium', 'high', 'urgent'])

export const TicketStatusEnum = z.enum(['open', 'in-progress', 'closed', 'cancelled'])

export const TicketSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: TicketTypeEnum.default('note'),
  priority: TicketPriorityEnum.default('medium'),
  status: TicketStatusEnum.default('open'),
  dueDate: z.coerce.date().optional(),
  propertyId: z.string().uuid(),
  assignedTo: z.string().uuid().optional(), // agentId
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreateTicketSchema = TicketSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateTicketSchema = TicketSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()
