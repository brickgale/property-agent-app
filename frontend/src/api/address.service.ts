import axios from 'axios'
import type { AddressResponse, CreateAddressDTO, UpdateAddressDTO } from '@/types/address'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const addressService = {
  // Create a new address
  async createAddress(data: CreateAddressDTO): Promise<AddressResponse> {
    const response = await api.post<AddressResponse>('/addresses', data)
    return response.data
  },

  // Get all addresses
  async getAddresses(params?: { addressableType?: string }): Promise<AddressResponse[]> {
    const response = await api.get<AddressResponse[]>('/addresses', { params })
    return response.data
  },

  // Get a single address by ID
  async getAddressById(id: string): Promise<AddressResponse> {
    const response = await api.get<AddressResponse>(`/addresses/${id}`)
    return response.data
  },

  // Get address by addressable entity
  async getAddressByAddressable(
    addressableType: string,
    addressableId: string
  ): Promise<AddressResponse> {
    const response = await api.get<AddressResponse>(
      `/addresses/${addressableType}/${addressableId}`
    )
    return response.data
  },

  // Update an address
  async updateAddress(id: string, data: UpdateAddressDTO): Promise<AddressResponse> {
    const response = await api.put<AddressResponse>(`/addresses/${id}`, data)
    return response.data
  },

  // Delete an address
  async deleteAddress(id: string): Promise<void> {
    await api.delete(`/addresses/${id}`)
  },
}
