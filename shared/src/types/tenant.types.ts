import { z } from 'zod'
import {
  TenantSchema,
  CreateTenantSchema,
  UpdateTenantSchema,
  TenantStatusEnum,
} from '../schemas/tenant.schema.js'

/**
 * TypeScript types inferred from Zod schemas
 */

// Enums
export type TenantStatus = z.infer<typeof TenantStatusEnum>

// Backend types (with Date objects)
export type Tenant = z.infer<typeof TenantSchema>
export type CreateTenantDTO = z.infer<typeof CreateTenantSchema>
export type UpdateTenantDTO = z.infer<typeof UpdateTenantSchema>

// Frontend types (API responses with dates as strings)
export type TenantResponse = Omit<
  Tenant,
  'createdAt' | 'updatedAt' | 'leaseStartDate' | 'leaseEndDate'
> & {
  createdAt: string
  updatedAt: string
  leaseStartDate?: string
  leaseEndDate?: string
}
