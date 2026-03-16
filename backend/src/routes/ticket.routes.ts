import { Router } from 'express'
import type { Router as RouterType } from 'express'
import { ticketController } from '@/controllers/ticket.controller.js'

const router: RouterType = Router()

router.post('/tickets', (req, res) => ticketController.createTicket(req, res))
router.get('/tickets', (req, res) => ticketController.getTickets(req, res))
router.get('/tickets/:id', (req, res) => ticketController.getTicketById(req, res))
router.put('/tickets/:id', (req, res) => ticketController.updateTicket(req, res))
router.delete('/tickets/:id', (req, res) => ticketController.deleteTicket(req, res))

export default router
