import axios from 'axios'
import type {
  PropertyTenantResponse,
  CreatePropertyTenantDTO,
  UpdatePropertyTenantDTO,
} from '@/types/propertyTenant'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const propertyTenantService = {
  // Create a new property-tenant relationship
  async createPropertyTenant(data: CreatePropertyTenantDTO): Promise<PropertyTenantResponse> {
    const response = await api.post<PropertyTenantResponse>('/property-tenants', data)
    return response.data
  },

  // Get all property-tenant relationships
  async getPropertyTenants(params?: {
    propertyId?: string
    tenantId?: string
    active?: boolean
  }): Promise<PropertyTenantResponse[]> {
    const response = await api.get<PropertyTenantResponse[]>('/property-tenants', { params })
    return response.data
  },

  // Get a single property-tenant relationship by ID
  async getPropertyTenantById(id: string): Promise<PropertyTenantResponse> {
    const response = await api.get<PropertyTenantResponse>(`/property-tenants/${id}`)
    return response.data
  },

  // Get tenant property history
  async getTenantPropertyHistory(tenantId: string): Promise<PropertyTenantResponse[]> {
    const response = await api.get<PropertyTenantResponse[]>(`/tenants/${tenantId}/history`)
    return response.data
  },

  // Update a property-tenant relationship
  async updatePropertyTenant(
    id: string,
    data: UpdatePropertyTenantDTO
  ): Promise<PropertyTenantResponse> {
    const response = await api.put<PropertyTenantResponse>(`/property-tenants/${id}`, data)
    return response.data
  },

  // End a tenancy
  async endTenancy(id: string, endDate?: string): Promise<PropertyTenantResponse> {
    const response = await api.post<PropertyTenantResponse>(`/property-tenants/${id}/end`, {
      endDate,
    })
    return response.data
  },

  // Delete a property-tenant relationship
  async deletePropertyTenant(id: string): Promise<void> {
    await api.delete(`/property-tenants/${id}`)
  },
}
