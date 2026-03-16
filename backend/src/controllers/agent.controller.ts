import { Request, Response } from 'express'
import { agentRepository } from '@/repositories/agent.repository.js'
import { CreatePropertyAgentDTO, UpdatePropertyAgentDTO } from '@/models/agent.model.js'
import type { ApiErrorResponse, ApiValidationErrorResponse } from '@shared/types'
import { ZodError } from 'zod'

export class AgentController {
  // POST /agents
  createAgent(req: Request, res: Response): void {
    try {
      const data: CreatePropertyAgentDTO = req.body

      // Validation happens in agentRepository.createAgent() via PropertyAgent.create()
      const agent = agentRepository.createAgent(data)

      res.status(201).json(agent.toJSON())
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

  // GET /agents
  getAgents(req: Request, res: Response): void {
    try {
      const agents = agentRepository.getAgents()
      res.status(200).json(agents.map(agent => agent.toJSON()))
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /agents/:id
  getAgentById(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const agent = agentRepository.getAgentById(id)

      if (!agent) {
        res.status(404).json({ error: 'Agent not found' })
        return
      }

      res.status(200).json(agent.toJSON())
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // PUT /agents/:id
  updateAgent(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const updateData: UpdatePropertyAgentDTO = req.body

      const updatedAgent = agentRepository.updateAgent(id, updateData)

      if (!updatedAgent) {
        res.status(404).json({ error: 'Agent not found' })
        return
      }

      res.status(200).json(updatedAgent.toJSON())
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

  // DELETE /agents/:id
  deleteAgent(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const success = agentRepository.deleteAgent(id)

      if (!success) {
        res.status(404).json({ error: 'Agent not found' })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const agentController = new AgentController()
