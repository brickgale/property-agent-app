import { Router } from 'express'
import type { Router as RouterType } from 'express'
import { propertyController } from '@/controllers/property.controller.js'

const router: RouterType = Router()

router.post('/properties', (req, res) => propertyController.createProperty(req, res))
router.get('/properties', (req, res) => propertyController.getProperties(req, res))
router.get('/properties/:id', (req, res) => propertyController.getPropertyById(req, res))
router.put('/properties/:id', (req, res) => propertyController.updateProperty(req, res))
router.delete('/properties/:id', (req, res) => propertyController.deleteProperty(req, res))

export default router
