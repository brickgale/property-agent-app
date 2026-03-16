import { z } from 'zod'

/**
 * Zod schemas for PropertyTenant validation
 * Junction table for property-tenant relationships
 */

export const PropertyTenantSchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  tenantId: z.string().uuid(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  isActive: z.boolean().default(true),
  rentAmount: z.number().positive().optional(),
  depositAmount: z.number().positive().optional(),
  notes: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreatePropertyTenantSchema = PropertyTenantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdatePropertyTenantSchema = PropertyTenantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  propertyId: true,
  tenantId: true,
}).partial()
