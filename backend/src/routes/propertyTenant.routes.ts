import { Router } from 'express'
import type { Router as RouterType } from 'express'
import { propertyTenantController } from '@/controllers/propertyTenant.controller.js'

const router: RouterType = Router()

router.post('/property-tenants', (req, res) => propertyTenantController.createPropertyTenant(req, res))
router.get('/property-tenants', (req, res) => propertyTenantController.getPropertyTenants(req, res))
router.get('/property-tenants/:id', (req, res) => propertyTenantController.getPropertyTenantById(req, res))
router.get('/tenants/:tenantId/history', (req, res) => propertyTenantController.getTenantPropertyHistory(req, res))
router.put('/property-tenants/:id', (req, res) => propertyTenantController.updatePropertyTenant(req, res))
router.post('/property-tenants/:id/end', (req, res) => propertyTenantController.endTenancy(req, res))
router.delete('/property-tenants/:id', (req, res) => propertyTenantController.deletePropertyTenant(req, res))

export default router
