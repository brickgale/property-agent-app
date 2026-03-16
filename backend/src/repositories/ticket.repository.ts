import tickets from '@/data/tickets.data.js'
import { Ticket, CreateTicketDTO, UpdateTicketDTO } from '@/models/ticket.model.js'

export class TicketRepository {
  createTicket(data: CreateTicketDTO): Ticket {
    // Validation happens in Ticket.create()
    const newTicket = Ticket.create(data)
    tickets.push(newTicket)
    return newTicket
  }

  getTickets(): Ticket[] {
    return tickets
  }

  getTicketById(id: string): Ticket | undefined {
    return tickets.find(ticket => ticket.id === id)
  }

  getTicketsByPropertyId(propertyId: string): Ticket[] {
    return tickets.filter(ticket => ticket.propertyId === propertyId)
  }

  getTicketsByAssignee(agentId: string): Ticket[] {
    return tickets.filter(ticket => ticket.assignedTo === agentId)
  }

  getTicketsByStatus(status: Ticket['status']): Ticket[] {
    return tickets.filter(ticket => ticket.status === status)
  }

  getOpenTickets(): Ticket[] {
    return tickets.filter(ticket => ticket.isOpen)
  }

  getOverdueTickets(): Ticket[] {
    return tickets.filter(ticket => ticket.isOverdue)
  }

  getTicketsByType(type: Ticket['type']): Ticket[] {
    return tickets.filter(ticket => ticket.type === type)
  }

  updateTicket(id: string, data: UpdateTicketDTO): Ticket | null {
    const ticketIndex = tickets.findIndex(ticket => ticket.id === id)
    if (ticketIndex === -1) {
      return null
    }

    const ticket = tickets[ticketIndex]
    // Validation happens in ticket.update()
    ticket.update(data)

    return ticket
  }

  deleteTicket(id: string): boolean {
    const ticketIndex = tickets.findIndex(ticket => ticket.id === id)
    if (ticketIndex === -1) {
      return false
    }
    tickets.splice(ticketIndex, 1)
    return true
  }
}

export const ticketRepository = new TicketRepository()
