import { v4 as uuidv4 } from 'uuid'
import {
  Property as IProperty,
  CreatePropertyDTO,
  UpdatePropertyDTO,
  PropertySchema,
  CreatePropertySchema,
  UpdatePropertySchema,
} from '@shared'

// Class-based model with methods, getters, and mutations
export class Property implements IProperty {
  constructor(
    public id: string,
    public name: string,
    public description: string | undefined,
    public propertyType: 'residential' | 'commercial' | 'industrial' | 'land' | 'mixed-use',
    public status: 'available' | 'occupied' | 'maintenance' | 'sold',
    public purchasePrice: number | undefined,
    public currentValue: number | undefined,
    public purchaseDate: Date | undefined,
    public addressId: string | undefined,
    public agentId: string | undefined,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  // Factory method with validation
  static create(data: CreatePropertyDTO): Property {
    // Validate using Zod
    const validated = CreatePropertySchema.parse(data)

    const now = new Date()
    return new Property(
      uuidv4(),
      validated.name,
      validated.description,
      validated.propertyType,
      validated.status,
      validated.purchasePrice,
      validated.currentValue,
      validated.purchaseDate,
      validated.addressId,
      validated.agentId,
      now,
      now
    )
  }

  // Update method with validation
  update(data: UpdatePropertyDTO): void {
    // Validate using Zod
    const validated = UpdatePropertySchema.parse(data)

    // Update only provided fields
    Object.assign(this, validated)
    this.updatedAt = new Date()
  }

  // Validate current instance
  validate(): void {
    PropertySchema.parse({
      id: this.id,
      name: this.name,
      description: this.description,
      propertyType: this.propertyType,
      status: this.status,
      purchasePrice: this.purchasePrice,
      currentValue: this.currentValue,
      purchaseDate: this.purchaseDate,
      addressId: this.addressId,
      agentId: this.agentId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    })
  }

  // Serialization for JSON responses
  toJSON(): IProperty {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      propertyType: this.propertyType,
      status: this.status,
      purchasePrice: this.purchasePrice,
      currentValue: this.currentValue,
      purchaseDate: this.purchaseDate,
      addressId: this.addressId,
      agentId: this.agentId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

// Re-export types for convenience
export type { IProperty, CreatePropertyDTO, UpdatePropertyDTO }
