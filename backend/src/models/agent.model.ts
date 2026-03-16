import { v4 as uuidv4 } from 'uuid'
import {
  PropertyAgent as IPropertyAgent,
  CreatePropertyAgentDTO,
  UpdatePropertyAgentDTO,
} from '@shared/types'
import {
  PropertyAgentSchema,
  CreatePropertyAgentSchema,
  UpdatePropertyAgentSchema,
} from '@shared/schemas'

// Class-based model with methods, getters, and mutations
export class PropertyAgent implements IPropertyAgent {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public mobileNumber: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  // Factory method with validation
  static create(data: CreatePropertyAgentDTO): PropertyAgent {
    // Validate using Zod
    const validated = CreatePropertyAgentSchema.parse(data)

    const now = new Date()
    return new PropertyAgent(
      uuidv4(),
      validated.firstName,
      validated.lastName,
      validated.email,
      validated.mobileNumber,
      now,
      now
    )
  }

  // Getters
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  // Update method with validation
  update(data: UpdatePropertyAgentDTO): void {
    // Validate using Zod
    const validated = UpdatePropertyAgentSchema.parse(data)

    if (validated.firstName !== undefined) this.firstName = validated.firstName
    if (validated.lastName !== undefined) this.lastName = validated.lastName
    if (validated.email !== undefined) this.email = validated.email
    if (validated.mobileNumber !== undefined) this.mobileNumber = validated.mobileNumber
    this.updatedAt = new Date()
  }

  // Validate current instance
  validate(): void {
    PropertyAgentSchema.parse({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    })
  }

  // Serialization for JSON responses
  toJSON(): IPropertyAgent {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

// Re-export types for convenience
export type { IPropertyAgent, CreatePropertyAgentDTO, UpdatePropertyAgentDTO }
