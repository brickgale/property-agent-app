import { z } from 'zod'

/**
 * Zod schemas for Address validation
 * Polymorphic address that can be attached to properties, tenants, or agents
 */

export const AddressableTypeEnum = z.enum(['property', 'tenant', 'agent'])

export const AddressSchema = z.object({
  id: z.string().uuid(),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  country: z.string().min(2, 'Country is required').default('USA'),
  addressableType: AddressableTypeEnum,
  addressableId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreateAddressSchema = AddressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateAddressSchema = AddressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  addressableType: true,
  addressableId: true,
}).partial()
