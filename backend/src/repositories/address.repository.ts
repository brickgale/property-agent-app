import addresses from '@/data/addresses.data.js'
import { Address, CreateAddressDTO, UpdateAddressDTO } from '@/models/address.model.js'

export class AddressRepository {
  createAddress(data: CreateAddressDTO): Address {
    // Validation happens in Address.create()
    const newAddress = Address.create(data)
    addresses.push(newAddress)
    return newAddress
  }

  getAddresses(): Address[] {
    return addresses
  }

  getAddressById(id: string): Address | undefined {
    return addresses.find(address => address.id === id)
  }

  getAddressByAddressable(
    addressableType: Address['addressableType'],
    addressableId: string
  ): Address | undefined {
    return addresses.find(
      address =>
        address.addressableType === addressableType && address.addressableId === addressableId
    )
  }

  getAddressesByType(addressableType: Address['addressableType']): Address[] {
    return addresses.filter(address => address.addressableType === addressableType)
  }

  updateAddress(id: string, data: UpdateAddressDTO): Address | null {
    const addressIndex = addresses.findIndex(address => address.id === id)
    if (addressIndex === -1) {
      return null
    }

    const address = addresses[addressIndex]
    // Validation happens in address.update()
    address.update(data)

    return address
  }

  deleteAddress(id: string): boolean {
    const addressIndex = addresses.findIndex(address => address.id === id)
    if (addressIndex === -1) {
      return false
    }
    addresses.splice(addressIndex, 1)
    return true
  }
}

export const addressRepository = new AddressRepository()
