import { v4 as uuidv4 } from 'uuid'
import {
  Address as IAddress,
  CreateAddressDTO,
  UpdateAddressDTO,
  AddressSchema,
  CreateAddressSchema,
  UpdateAddressSchema,
} from '@shared'

// Class-based model with methods, getters, and mutations
export class Address implements IAddress {
  constructor(
    public id: string,
    public street: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public country: string,
    public addressableType: 'property' | 'tenant' | 'agent',
    public addressableId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  // Factory method with validation
  static create(data: CreateAddressDTO): Address {
    // Validate using Zod
    const validated = CreateAddressSchema.parse(data)

    const now = new Date()
    return new Address(
      uuidv4(),
      validated.street,
      validated.city,
      validated.state,
      validated.zipCode,
      validated.country,
      validated.addressableType,
      validated.addressableId,
      now,
      now
    )
  }

  // Getter for full address
  get fullAddress(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}, ${this.country}`
  }

  // Update method with validation
  update(data: UpdateAddressDTO): void {
    // Validate using Zod
    const validated = UpdateAddressSchema.parse(data)

    // Update only provided fields
    Object.assign(this, validated)
    this.updatedAt = new Date()
  }

  // Validate current instance
  validate(): void {
    AddressSchema.parse({
      id: this.id,
      street: this.street,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      country: this.country,
      addressableType: this.addressableType,
      addressableId: this.addressableId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    })
  }

  // Serialization for JSON responses
  toJSON(): IAddress {
    return {
      id: this.id,
      street: this.street,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      country: this.country,
      addressableType: this.addressableType,
      addressableId: this.addressableId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

// Re-export types for convenience
export type { IAddress, CreateAddressDTO, UpdateAddressDTO }
