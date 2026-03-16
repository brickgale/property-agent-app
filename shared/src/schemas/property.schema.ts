import { z } from 'zod'

/**
 * Zod schemas for Property validation
 */

export const PropertyTypeEnum = z.enum([
  'residential',
  'commercial',
  'industrial',
  'land',
  'mixed-use',
])

export const PropertyStatusEnum = z.enum(['available', 'occupied', 'maintenance', 'sold'])

export const PropertySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Property name is required'),
  description: z.string().optional(),
  propertyType: PropertyTypeEnum,
  status: PropertyStatusEnum.default('available'),
  purchasePrice: z.number().positive().optional(),
  currentValue: z.number().positive().optional(),
  purchaseDate: z.coerce.date().optional(),
  addressId: z.string().uuid().optional(),
  agentId: z.string().uuid().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreatePropertySchema = PropertySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdatePropertySchema = PropertySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()
