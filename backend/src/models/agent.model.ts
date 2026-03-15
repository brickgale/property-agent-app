// Base interface for PropertyAgent data structure
export interface IPropertyAgent {
  id: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  createdAt: Date
  updatedAt: Date
}

// DTOs derived using utility types
export type CreatePropertyAgentDTO = Omit<IPropertyAgent, 'id' | 'createdAt' | 'updatedAt'>
export type UpdatePropertyAgentDTO = Partial<Omit<IPropertyAgent, 'id' | 'createdAt' | 'updatedAt'>>

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

  // Getters
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  // Static validation methods
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static validateMobileNumber(mobile: string): boolean {
    const mobileRegex = /^\d{10,15}$/
    return mobileRegex.test(mobile.replace(/[\s-]/g, ''))
  }

  // Instance validation
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!this.firstName?.trim()) {
      errors.push('First name is required')
    }
    if (!this.lastName?.trim()) {
      errors.push('Last name is required')
    }
    if (!PropertyAgent.validateEmail(this.email)) {
      errors.push('Invalid email format')
    }
    if (!PropertyAgent.validateMobileNumber(this.mobileNumber)) {
      errors.push('Invalid mobile number format (10-15 digits required)')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Mutation method with validation
  update(data: UpdatePropertyAgentDTO): void {
    if (data.firstName !== undefined) this.firstName = data.firstName
    if (data.lastName !== undefined) this.lastName = data.lastName
    if (data.email !== undefined) this.email = data.email
    if (data.mobileNumber !== undefined) this.mobileNumber = data.mobileNumber
    this.updatedAt = new Date()
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
