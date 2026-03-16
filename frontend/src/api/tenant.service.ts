import axios from 'axios'
import type { TenantResponse, CreateTenantDTO, UpdateTenantDTO } from '@/types/tenant'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const tenantService = {
  // Create a new tenant
  async createTenant(data: CreateTenantDTO): Promise<TenantResponse> {
    const response = await api.post<TenantResponse>('/tenants', data)
    return response.data
  },

  // Get all tenants
  async getTenants(params?: { propertyId?: string; status?: string }): Promise<TenantResponse[]> {
    const response = await api.get<TenantResponse[]>('/tenants', { params })
    return response.data
  },

  // Get a single tenant by ID
  async getTenantById(id: string): Promise<TenantResponse> {
    const response = await api.get<TenantResponse>(`/tenants/${id}`)
    return response.data
  },

  // Update a tenant
  async updateTenant(id: string, data: UpdateTenantDTO): Promise<TenantResponse> {
    const response = await api.put<TenantResponse>(`/tenants/${id}`, data)
    return response.data
  },

  // Delete a tenant
  async deleteTenant(id: string): Promise<void> {
    await api.delete(`/tenants/${id}`)
  },
}
