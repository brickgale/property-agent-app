import { v4 as uuidv4 } from 'uuid'
import {
  PropertyTenant as IPropertyTenant,
  CreatePropertyTenantDTO,
  UpdatePropertyTenantDTO,
  PropertyTenantSchema,
  CreatePropertyTenantSchema,
  UpdatePropertyTenantSchema,
} from '@shared'

// Class-based model with methods, getters, and mutations
export class PropertyTenant implements IPropertyTenant {
  constructor(
    public id: string,
    public propertyId: string,
    public tenantId: string,
    public startDate: Date,
    public endDate: Date | undefined,
    public isActive: boolean,
    public rentAmount: number | undefined,
    public depositAmount: number | undefined,
    public notes: string | undefined,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  // Factory method with validation
  static create(data: CreatePropertyTenantDTO): PropertyTenant {
    // Validate using Zod
    const validated = CreatePropertyTenantSchema.parse(data)

    const now = new Date()
    return new PropertyTenant(
      uuidv4(),
      validated.propertyId,
      validated.tenantId,
      validated.startDate,
      validated.endDate,
      validated.isActive,
      validated.rentAmount,
      validated.depositAmount,
      validated.notes,
      now,
      now
    )
  }

  // Getters
  get isCurrentlyActive(): boolean {
    if (!this.isActive) return false
    if (!this.endDate) return true
    return new Date() <= this.endDate
  }

  get duration(): number | null {
    const end = this.endDate || new Date()
    return Math.floor((end.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  // Method to end the tenancy
  endTenancy(endDate?: Date): void {
    this.endDate = endDate || new Date()
    this.isActive = false
    this.updatedAt = new Date()
  }

  // Update method with validation
  update(data: UpdatePropertyTenantDTO): void {
    // Validate using Zod
    const validated = UpdatePropertyTenantSchema.parse(data)

    // Update only provided fields
    Object.assign(this, validated)
    this.updatedAt = new Date()
  }

  // Validate current instance
  validate(): void {
    PropertyTenantSchema.parse({
      id: this.id,
      propertyId: this.propertyId,
      tenantId: this.tenantId,
      startDate: this.startDate,
      endDate: this.endDate,
      isActive: this.isActive,
      rentAmount: this.rentAmount,
      depositAmount: this.depositAmount,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    })
  }

  // Serialization for JSON responses
  toJSON(): IPropertyTenant {
    return {
      id: this.id,
      propertyId: this.propertyId,
      tenantId: this.tenantId,
      startDate: this.startDate,
      endDate: this.endDate,
      isActive: this.isActive,
      rentAmount: this.rentAmount,
      depositAmount: this.depositAmount,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

// Re-export types for convenience
export type { IPropertyTenant, CreatePropertyTenantDTO, UpdatePropertyTenantDTO }
