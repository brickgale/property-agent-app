import { z } from 'zod'

/**
 * Zod schemas for PropertyAgent validation
 */

export const PropertyAgentSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  mobileNumber: z
    .string()
    .regex(/^\d{10,15}$/, 'Mobile number must be 10-15 digits')
    .transform(val => val.replace(/[\s-]/g, '')),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreatePropertyAgentSchema = PropertyAgentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdatePropertyAgentSchema = PropertyAgentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()
