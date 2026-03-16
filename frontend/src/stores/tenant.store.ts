import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TenantResponse, CreateTenantDTO, UpdateTenantDTO } from '@/types/tenant'
import { tenantService } from '@/api/tenant.service'

export const useTenantStore = defineStore('tenant', () => {
  const tenants = ref<TenantResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all tenants
  async function fetchTenants(params?: { propertyId?: string; status?: string }) {
    loading.value = true
    error.value = null
    try {
      tenants.value = await tenantService.getTenants(params)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch tenants'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create a new tenant
  async function createTenant(data: CreateTenantDTO) {
    loading.value = true
    error.value = null
    try {
      const newTenant = await tenantService.createTenant(data)
      tenants.value.push(newTenant)
      return newTenant
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create tenant'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update a tenant
  async function updateTenant(id: string, data: UpdateTenantDTO) {
    loading.value = true
    error.value = null
    try {
      const updatedTenant = await tenantService.updateTenant(id, data)
      const index = tenants.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tenants.value[index] = updatedTenant
      }
      return updatedTenant
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update tenant'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete a tenant
  async function deleteTenant(id: string) {
    loading.value = true
    error.value = null
    try {
      await tenantService.deleteTenant(id)
      tenants.value = tenants.value.filter(t => t.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete tenant'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    tenants,
    loading,
    error,
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,
  }
})
