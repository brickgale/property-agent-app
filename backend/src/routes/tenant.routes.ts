import { Router } from 'express'
import type { Router as RouterType } from 'express'
import { tenantController } from '@/controllers/tenant.controller.js'

const router: RouterType = Router()

router.post('/tenants', (req, res) => tenantController.createTenant(req, res))
router.get('/tenants', (req, res) => tenantController.getTenants(req, res))
router.get('/tenants/:id', (req, res) => tenantController.getTenantById(req, res))
router.put('/tenants/:id', (req, res) => tenantController.updateTenant(req, res))
router.delete('/tenants/:id', (req, res) => tenantController.deleteTenant(req, res))

export default router
