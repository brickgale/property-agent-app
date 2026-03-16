import { v4 as uuidv4 } from 'uuid'
import {
  Ticket as ITicket,
  CreateTicketDTO,
  UpdateTicketDTO,
  TicketSchema,
  CreateTicketSchema,
  UpdateTicketSchema,
} from '@shared'

// Class-based model with methods, getters, and mutations
export class Ticket implements ITicket {
  constructor(
    public id: string,
    public title: string,
    public description: string | undefined,
    public type: 'reminder' | 'note' | 'maintenance' | 'inspection' | 'payment' | 'other',
    public priority: 'low' | 'medium' | 'high' | 'urgent',
    public status: 'open' | 'in-progress' | 'closed' | 'cancelled',
    public dueDate: Date | undefined,
    public propertyId: string,
    public assignedTo: string | undefined,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  // Factory method with validation
  static create(data: CreateTicketDTO): Ticket {
    // Validate using Zod
    const validated = CreateTicketSchema.parse(data)

    const now = new Date()
    return new Ticket(
      uuidv4(),
      validated.title,
      validated.description,
      validated.type,
      validated.priority,
      validated.status,
      validated.dueDate,
      validated.propertyId,
      validated.assignedTo,
      now,
      now
    )
  }

  // Getters
  get isOverdue(): boolean {
    if (!this.dueDate) return false
    if (this.status === 'closed' || this.status === 'cancelled') return false
    return new Date() > this.dueDate
  }

  get isOpen(): boolean {
    return this.status === 'open' || this.status === 'in-progress'
  }

  // Update method with validation
  update(data: UpdateTicketDTO): void {
    // Validate using Zod
    const validated = UpdateTicketSchema.parse(data)

    // Update only provided fields
    Object.assign(this, validated)
    this.updatedAt = new Date()
  }

  // Validate current instance
  validate(): void {
    TicketSchema.parse({
      id: this.id,
      title: this.title,
      description: this.description,
      type: this.type,
      priority: this.priority,
      status: this.status,
      dueDate: this.dueDate,
      propertyId: this.propertyId,
      assignedTo: this.assignedTo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    })
  }

  // Serialization for JSON responses
  toJSON(): ITicket {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      type: this.type,
      priority: this.priority,
      status: this.status,
      dueDate: this.dueDate,
      propertyId: this.propertyId,
      assignedTo: this.assignedTo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

// Re-export types for convenience
export type { ITicket, CreateTicketDTO, UpdateTicketDTO }
