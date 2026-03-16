import { Request, Response } from 'express'
import { tenantRepository } from '@/repositories/tenant.repository.js'
import { CreateTenantDTO, UpdateTenantDTO } from '@/models/tenant.model.js'
import { ZodError } from 'zod'

export class TenantController {
  // POST /tenants
  createTenant(req: Request, res: Response): void {
    try {
      const data: CreateTenantDTO = req.body
      const tenant = tenantRepository.createTenant(data)
      res.status(201).json(tenant.toJSON())
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

  // GET /tenants
  getTenants(req: Request, res: Response): void {
    try {
      const { propertyId, status } = req.query

      let tenants
      if (propertyId) {
        tenants = tenantRepository.getTenantsByPropertyId(propertyId as string)
      } else if (status === 'active') {
        tenants = tenantRepository.getActiveTenants()
      } else if (status) {
        tenants = tenantRepository.getTenantsByStatus(status as any)
      } else {
        tenants = tenantRepository.getTenants()
      }

      res.status(200).json(tenants.map(tenant => tenant.toJSON()))
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /tenants/:id
  getTenantById(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const tenant = tenantRepository.getTenantById(id)

      if (!tenant) {
        res.status(404).json({ error: 'Tenant not found' })
        return
      }

      res.status(200).json(tenant.toJSON())
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // PUT /tenants/:id
  updateTenant(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const updateData: UpdateTenantDTO = req.body

      const updatedTenant = tenantRepository.updateTenant(id, updateData)

      if (!updatedTenant) {
        res.status(404).json({ error: 'Tenant not found' })
        return
      }

      res.status(200).json(updatedTenant.toJSON())
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

  // DELETE /tenants/:id
  deleteTenant(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const success = tenantRepository.deleteTenant(id)

      if (!success) {
        res.status(404).json({ error: 'Tenant not found' })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const tenantController = new TenantController()
