import { v4 as uuidv4 } from 'uuid'
import {
  Tenant as ITenant,
  CreateTenantDTO,
  UpdateTenantDTO,
  TenantSchema,
  CreateTenantSchema,
  UpdateTenantSchema,
} from '@shared'

// Class-based model with methods, getters, and mutations
export class Tenant implements ITenant {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public mobileNumber: string,
    public leaseStartDate: Date | undefined,
    public leaseEndDate: Date | undefined,
    public status: 'active' | 'inactive' | 'pending',
    public propertyId: string | undefined,
    public addressId: string | undefined,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  // Factory method with validation
  static create(data: CreateTenantDTO): Tenant {
    // Validate using Zod
    const validated = CreateTenantSchema.parse(data)

    const now = new Date()
    return new Tenant(
      uuidv4(),
      validated.firstName,
      validated.lastName,
      validated.email,
      validated.mobileNumber,
      validated.leaseStartDate,
      validated.leaseEndDate,
      validated.status,
      validated.propertyId,
      validated.addressId,
      now,
      now
    )
  }

  // Getters
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  get isLeaseActive(): boolean {
    if (!this.leaseStartDate || !this.leaseEndDate) return false
    const now = new Date()
    return now >= this.leaseStartDate && now <= this.leaseEndDate
  }

  // Update method with validation
  update(data: UpdateTenantDTO): void {
    // Validate using Zod
    const validated = UpdateTenantSchema.parse(data)

    // Update only provided fields
    Object.assign(this, validated)
    this.updatedAt = new Date()
  }

  // Validate current instance
  validate(): void {
    TenantSchema.parse({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      leaseStartDate: this.leaseStartDate,
      leaseEndDate: this.leaseEndDate,
      status: this.status,
      propertyId: this.propertyId,
      addressId: this.addressId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    })
  }

  // Serialization for JSON responses
  toJSON(): ITenant {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      leaseStartDate: this.leaseStartDate,
      leaseEndDate: this.leaseEndDate,
      status: this.status,
      propertyId: this.propertyId,
      addressId: this.addressId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

// Re-export types for convenience
export type { ITenant, CreateTenantDTO, UpdateTenantDTO }
