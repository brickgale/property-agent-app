import { z } from 'zod'
import {
  PropertySchema,
  CreatePropertySchema,
  UpdatePropertySchema,
  PropertyTypeEnum,
  PropertyStatusEnum,
} from '../schemas/property.schema.js'

/**
 * TypeScript types inferred from Zod schemas
 */

// Re-export schemas
export {
  PropertySchema,
  CreatePropertySchema,
  UpdatePropertySchema,
  PropertyTypeEnum,
  PropertyStatusEnum,
} from '../schemas/property.schema.js'

// Enums
export type PropertyType = z.infer<typeof PropertyTypeEnum>
export type PropertyStatus = z.infer<typeof PropertyStatusEnum>

// Backend types (with Date objects)
export type Property = z.infer<typeof PropertySchema>
export type CreatePropertyDTO = z.infer<typeof CreatePropertySchema>
export type UpdatePropertyDTO = z.infer<typeof UpdatePropertySchema>

// Frontend types (API responses with dates as strings)
export type PropertyResponse = Omit<Property, 'createdAt' | 'updatedAt' | 'purchaseDate'> & {
  createdAt: string
  updatedAt: string
  purchaseDate?: string
}
