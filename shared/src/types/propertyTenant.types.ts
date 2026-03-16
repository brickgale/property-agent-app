import { z } from 'zod'
import {
  PropertyTenantSchema,
  CreatePropertyTenantSchema,
  UpdatePropertyTenantSchema,
} from '../schemas/propertyTenant.schema.js'

/**
 * TypeScript types inferred from Zod schemas
 */

// Re-export schemas
export {
  PropertyTenantSchema,
  CreatePropertyTenantSchema,
  UpdatePropertyTenantSchema,
} from '../schemas/propertyTenant.schema.js'

// Backend types (with Date objects)
export type PropertyTenant = z.infer<typeof PropertyTenantSchema>
export type CreatePropertyTenantDTO = z.infer<typeof CreatePropertyTenantSchema>
export type UpdatePropertyTenantDTO = z.infer<typeof UpdatePropertyTenantSchema>

// Frontend types (API responses with dates as strings)
export type PropertyTenantResponse = Omit<
  PropertyTenant,
  'createdAt' | 'updatedAt' | 'startDate' | 'endDate'
> & {
  createdAt: string
  updatedAt: string
  startDate: string
  endDate?: string
}
