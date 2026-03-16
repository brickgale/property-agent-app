import { z } from 'zod'
import {
  AddressSchema,
  CreateAddressSchema,
  UpdateAddressSchema,
  AddressableTypeEnum,
} from '../schemas/address.schema.js'

/**
 * TypeScript types inferred from Zod schemas
 */

// Enums
export type AddressableType = z.infer<typeof AddressableTypeEnum>

// Backend types (with Date objects)
export type Address = z.infer<typeof AddressSchema>
export type CreateAddressDTO = z.infer<typeof CreateAddressSchema>
export type UpdateAddressDTO = z.infer<typeof UpdateAddressSchema>

// Frontend types (API responses with dates as strings)
export type AddressResponse = Omit<Address, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}
