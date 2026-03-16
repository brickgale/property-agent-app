import { Request, Response } from 'express'
import { addressRepository } from '@/repositories/address.repository.js'
import { CreateAddressDTO, UpdateAddressDTO } from '@/models/address.model.js'
import { ZodError } from 'zod'

export class AddressController {
  // POST /addresses
  createAddress(req: Request, res: Response): void {
    try {
      const data: CreateAddressDTO = req.body
      const address = addressRepository.createAddress(data)
      res.status(201).json(address.toJSON())
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

  // GET /addresses
  getAddresses(req: Request, res: Response): void {
    try {
      const { addressableType } = req.query

      let addresses
      if (addressableType) {
        addresses = addressRepository.getAddressesByType(addressableType as any)
      } else {
        addresses = addressRepository.getAddresses()
      }

      res.status(200).json(addresses.map(address => address.toJSON()))
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /addresses/:id
  getAddressById(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const address = addressRepository.getAddressById(id)

      if (!address) {
        res.status(404).json({ error: 'Address not found' })
        return
      }

      res.status(200).json(address.toJSON())
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GET /addresses/:addressableType/:addressableId
  getAddressByAddressable(req: Request, res: Response): void {
    try {
      const { addressableType, addressableId } = req.params
      const address = addressRepository.getAddressByAddressable(
        addressableType as any,
        addressableId
      )

      if (!address) {
        res.status(404).json({ error: 'Address not found' })
        return
      }

      res.status(200).json(address.toJSON())
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // PUT /addresses/:id
  updateAddress(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const updateData: UpdateAddressDTO = req.body

      const updatedAddress = addressRepository.updateAddress(id, updateData)

      if (!updatedAddress) {
        res.status(404).json({ error: 'Address not found' })
        return
      }

      res.status(200).json(updatedAddress.toJSON())
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

  // DELETE /addresses/:id
  deleteAddress(req: Request, res: Response): void {
    try {
      const { id } = req.params
      const success = addressRepository.deleteAddress(id)

      if (!success) {
        res.status(404).json({ error: 'Address not found' })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const addressController = new AddressController()
