import { Request, Response } from 'express'
import { ticketRepository } from '@/repositories/ticket.repository.js'
import { CreateTicketDTO, UpdateTicketDTO } from '@/models/ticket.model.js'
import { ZodError } from 'zod'

export class TicketController {
  // POST /tickets
  createTicket(req: Request, res: Response): void {
    try {
      const data: CreateTicketDTO = req.body
      const ticket = ticketRepository.createTicket(data)
      res.status(201).json(ticket.toJSON())
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  // GET /tickets
  getTickets(req: Request, res: Response): void {
    try {
      const { propertyId, assignedTo, status, type, filter } = req.query

      let tickets
      if (propertyId) {
        tickets = ticketRepository.getTicketsByPropertyId(propertyId as string)
      } else if (assignedTo) {
        tickets = ticketRepository.getTicketsByAssignee(assignedTo as string)
      } else if (filter === 'open') {
        tickets = ticketRepository.getOpenTickets()
      } else if (filter === 'overdue') {
        tickets = ticketRepository.getOverdueTickets()
      } else if (status) {
        tickets = ticketRepository.getTicketsByStatus(status as any)
      } else if (type) {
        tickets = ticketRepository.getTicketsByType(type as any)
      } else {
        tickets = ticketRepository.getTickets()
      }

      res.status(200).json(tickets.map(ticket => ticket.toJSON()))
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /tickets/:id
  getTicketById(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const ticket = ticketRepository.getTicketById(id)

      if (!ticket) {
        res.status(404).json({ error: 'Ticket not found' })
        return
      }

      res.status(200).json(ticket.toJSON())
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // PUT /tickets/:id
  updateTicket(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const updateData: UpdateTicketDTO = req.body

      const updatedTicket = ticketRepository.updateTicket(id, updateData)

      if (!updatedTicket) {
        res.status(404).json({ error: 'Ticket not found' })
        return
      }

      res.status(200).json(updatedTicket.toJSON())
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  // DELETE /tickets/:id
  deleteTicket(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const success = ticketRepository.deleteTicket(id)

      if (!success) {
        res.status(404).json({ error: 'Ticket not found' })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const ticketController = new TicketController()
