import { z } from 'zod'

/**
 * Zod schemas for Tenant validation
 */

export const TenantStatusEnum = z.enum(['active', 'inactive', 'pending'])

export const TenantSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  mobileNumber: z
    .string()
    .regex(/^\d{10,15}$/, 'Mobile number must be 10-15 digits')
    .transform(val => val.replace(/[\s-]/g, '')),
  leaseStartDate: z.coerce.date().optional(),
  leaseEndDate: z.coerce.date().optional(),
  status: TenantStatusEnum.default('pending'),
  propertyId: z.string().uuid().optional(),
  addressId: z.string().uuid().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreateTenantSchema = TenantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateTenantSchema = TenantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()
