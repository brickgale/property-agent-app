import { Request, Response } from 'express'
import { propertyRepository } from '@/repositories/property.repository.js'
import { CreatePropertyDTO, UpdatePropertyDTO } from '@/models/property.model.js'
import { ZodError } from 'zod'

export class PropertyController {
  // POST /properties
  createProperty(req: Request, res: Response): void {
    try {
      const data: CreatePropertyDTO = req.body
      const property = propertyRepository.createProperty(data)
      res.status(201).json(property.toJSON())
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

  // GET /properties
  getProperties(req: Request, res: Response): void {
    try {
      const { agentId, status } = req.query

      let properties
      if (agentId) {
        properties = propertyRepository.getPropertiesByAgentId(agentId as string)
      } else if (status) {
        properties = propertyRepository.getPropertiesByStatus(status as any)
      } else {
        properties = propertyRepository.getProperties()
      }

      res.status(200).json(properties.map(property => property.toJSON()))
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /properties/:id
  getPropertyById(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const property = propertyRepository.getPropertyById(id)

      if (!property) {
        res.status(404).json({ error: 'Property not found' })
        return
      }

      res.status(200).json(property.toJSON())
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // PUT /properties/:id
  updateProperty(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const updateData: UpdatePropertyDTO = req.body

      const updatedProperty = propertyRepository.updateProperty(id, updateData)

      if (!updatedProperty) {
        res.status(404).json({ error: 'Property not found' })
        return
      }

      res.status(200).json(updatedProperty.toJSON())
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

  // DELETE /properties/:id
  deleteProperty(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const success = propertyRepository.deleteProperty(id)

      if (!success) {
        res.status(404).json({ error: 'Property not found' })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const propertyController = new PropertyController()
