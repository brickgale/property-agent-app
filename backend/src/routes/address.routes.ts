import { Router } from 'express'
import type { Router as RouterType } from 'express'
import { addressController } from '@/controllers/address.controller.js'

const router: RouterType = Router()

router.post('/addresses', (req, res) => addressController.createAddress(req, res))
router.get('/addresses', (req, res) => addressController.getAddresses(req, res))
router.get('/addresses/:id', (req, res) => addressController.getAddressById(req, res))
router.get('/addresses/:addressableType/:addressableId', (req, res) => addressController.getAddressByAddressable(req, res))
router.put('/addresses/:id', (req, res) => addressController.updateAddress(req, res))
router.delete('/addresses/:id', (req, res) => addressController.deleteAddress(req, res))

export default router
