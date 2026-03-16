import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PropertyResponse, CreatePropertyDTO, UpdatePropertyDTO } from '@/types/property'
import { propertyService } from '@/api/property.service'

export const usePropertyStore = defineStore('property', () => {
  const properties = ref<PropertyResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all properties
  async function fetchProperties(params?: { agentId?: string; status?: string }) {
    loading.value = true
    error.value = null
    try {
      properties.value = await propertyService.getProperties(params)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch properties'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create a new property
  async function createProperty(data: CreatePropertyDTO) {
    loading.value = true
    error.value = null
    try {
      const newProperty = await propertyService.createProperty(data)
      properties.value.push(newProperty)
      return newProperty
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create property'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update a property
  async function updateProperty(id: string, data: UpdatePropertyDTO) {
    loading.value = true
    error.value = null
    try {
      const updatedProperty = await propertyService.updateProperty(id, data)
      const index = properties.value.findIndex(p => p.id === id)
      if (index !== -1) {
        properties.value[index] = updatedProperty
      }
      return updatedProperty
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update property'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete a property
  async function deleteProperty(id: string) {
    loading.value = true
    error.value = null
    try {
      await propertyService.deleteProperty(id)
      properties.value = properties.value.filter(p => p.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete property'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    properties,
    loading,
    error,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
  }
})
