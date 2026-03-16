import { Request, Response } from 'express'
import { propertyTenantRepository } from '@/repositories/propertyTenant.repository.js'
import { CreatePropertyTenantDTO, UpdatePropertyTenantDTO } from '@/models/propertyTenant.model.js'
import { ZodError } from 'zod'

export class PropertyTenantController {
  // POST /property-tenants
  createPropertyTenant(req: Request, res: Response): void {
    try {
      const data: CreatePropertyTenantDTO = req.body
      const result = propertyTenantRepository.createPropertyTenant(data)

      // Check if it's an error object
      if ('error' in result) {
        res.status(400).json(result)
        return
      }

      res.status(201).json(result.toJSON())
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

  // GET /property-tenants
  getPropertyTenants(req: Request, res: Response): void {
    try {
      const { propertyId, tenantId, active } = req.query

      let propertyTenants
      if (propertyId && active === 'true') {
        propertyTenants = propertyTenantRepository.getActiveTenantsForProperty(propertyId as string)
      } else if (propertyId) {
        propertyTenants = propertyTenantRepository.getTenantsByPropertyId(propertyId as string)
      } else if (tenantId) {
        const pt = propertyTenantRepository.getPropertyByTenantId(tenantId as string)
        propertyTenants = pt ? [pt] : []
      } else if (active === 'true') {
        propertyTenants = propertyTenantRepository.getActivePropertyTenants()
      } else {
        propertyTenants = propertyTenantRepository.getPropertyTenants()
      }

      res.status(200).json(propertyTenants.map(pt => pt.toJSON()))
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /property-tenants/:id
  getPropertyTenantById(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const propertyTenant = propertyTenantRepository.getPropertyTenantById(id)

      if (!propertyTenant) {
        res.status(404).json({ error: 'Property-Tenant relationship not found' })
        return
      }

      res.status(200).json(propertyTenant.toJSON())
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /tenants/:tenantId/history
  getTenantPropertyHistory(req: Request, res: Response): void {
    try {
      const { tenantId } = req.params
      const history = propertyTenantRepository.getPropertyHistoryForTenant(tenantId)

      res.status(200).json(history.map(pt => pt.toJSON()))
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // PUT /property-tenants/:id
  updatePropertyTenant(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const updateData: UpdatePropertyTenantDTO = req.body

      const updatedPropertyTenant = propertyTenantRepository.updatePropertyTenant(id, updateData)

      if (!updatedPropertyTenant) {
        res.status(404).json({ error: 'Property-Tenant relationship not found' })
        return
      }

      res.status(200).json(updatedPropertyTenant.toJSON())
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        })
      } else if (error.message) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  // POST /property-tenants/:id/end
  endTenancy(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const { endDate } = req.body

      const date = endDate ? new Date(endDate) : undefined
      const propertyTenant = propertyTenantRepository.endTenancy(id, date)

      if (!propertyTenant) {
        res.status(404).json({ error: 'Property-Tenant relationship not found' })
        return
      }

      res.status(200).json(propertyTenant.toJSON())
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // DELETE /property-tenants/:id
  deletePropertyTenant(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const success = propertyTenantRepository.deletePropertyTenant(id)

      if (!success) {
        res.status(404).json({ error: 'Property-Tenant relationship not found' })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const propertyTenantController = new PropertyTenantController()
