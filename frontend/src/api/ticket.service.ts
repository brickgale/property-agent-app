import axios from 'axios'
import type { TicketResponse, CreateTicketDTO, UpdateTicketDTO } from '@/types/ticket'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const ticketService = {
  // Create a new ticket
  async createTicket(data: CreateTicketDTO): Promise<TicketResponse> {
    const response = await api.post<TicketResponse>('/tickets', data)
    return response.data
  },

  // Get all tickets
  async getTickets(params?: {
    propertyId?: string
    assignedTo?: string
    status?: string
    type?: string
    filter?: 'open' | 'overdue'
  }): Promise<TicketResponse[]> {
    const response = await api.get<TicketResponse[]>('/tickets', { params })
    return response.data
  },

  // Get a single ticket by ID
  async getTicketById(id: string): Promise<TicketResponse> {
    const response = await api.get<TicketResponse>(`/tickets/${id}`)
    return response.data
  },

  // Update a ticket
  async updateTicket(id: string, data: UpdateTicketDTO): Promise<TicketResponse> {
    const response = await api.put<TicketResponse>(`/tickets/${id}`, data)
    return response.data
  },

  // Delete a ticket
  async deleteTicket(id: string): Promise<void> {
    await api.delete(`/tickets/${id}`)
  },
}
