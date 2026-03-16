import axios from 'axios'
import type { PropertyResponse, CreatePropertyDTO, UpdatePropertyDTO } from '@/types/property'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const propertyService = {
  // Create a new property
  async createProperty(data: CreatePropertyDTO): Promise<PropertyResponse> {
    const response = await api.post<PropertyResponse>('/properties', data)
    return response.data
  },

  // Get all properties
  async getProperties(params?: { agentId?: string; status?: string }): Promise<PropertyResponse[]> {
    const response = await api.get<PropertyResponse[]>('/properties', { params })
    return response.data
  },

  // Get a single property by ID
  async getPropertyById(id: string): Promise<PropertyResponse> {
    const response = await api.get<PropertyResponse>(`/properties/${id}`)
    return response.data
  },

  // Update a property
  async updateProperty(id: string, data: UpdatePropertyDTO): Promise<PropertyResponse> {
    const response = await api.put<PropertyResponse>(`/properties/${id}`, data)
    return response.data
  },

  // Delete a property
  async deleteProperty(id: string): Promise<void> {
    await api.delete(`/properties/${id}`)
  },
}
