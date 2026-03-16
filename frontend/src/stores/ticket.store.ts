import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TicketResponse, CreateTicketDTO, UpdateTicketDTO } from '@/types/ticket'
import { ticketService } from '@/api/ticket.service'

export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref<TicketResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all tickets
  async function fetchTickets(params?: {
    propertyId?: string
    assignedTo?: string
    status?: string
    type?: string
    filter?: 'open' | 'overdue'
  }) {
    loading.value = true
    error.value = null
    try {
      tickets.value = await ticketService.getTickets(params)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch tickets'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create a new ticket
  async function createTicket(data: CreateTicketDTO) {
    loading.value = true
    error.value = null
    try {
      const newTicket = await ticketService.createTicket(data)
      tickets.value.push(newTicket)
      return newTicket
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create ticket'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update a ticket
  async function updateTicket(id: string, data: UpdateTicketDTO) {
    loading.value = true
    error.value = null
    try {
      const updatedTicket = await ticketService.updateTicket(id, data)
      const index = tickets.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tickets.value[index] = updatedTicket
      }
      return updatedTicket
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update ticket'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete a ticket
  async function deleteTicket(id: string) {
    loading.value = true
    error.value = null
    try {
      await ticketService.deleteTicket(id)
      tickets.value = tickets.value.filter(t => t.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete ticket'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    updateTicket,
    deleteTicket,
  }
})
