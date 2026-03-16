import propertyTenants from '@/data/propertyTenants.data.js'
import {
  PropertyTenant,
  CreatePropertyTenantDTO,
  UpdatePropertyTenantDTO,
} from '@/models/propertyTenant.model.js'

export class PropertyTenantRepository {
  /**
   * Create a new property-tenant relationship with constraints:
   * 1. A tenant can only have 1 active property
   * 2. No duplicate property-tenant pairs (same property + tenant + active)
   */
  createPropertyTenant(data: CreatePropertyTenantDTO): PropertyTenant | { error: string } {
    // Constraint 1: Check if tenant already has an active property
    const existingActiveForTenant = propertyTenants.find(
      pt => pt.tenantId === data.tenantId && pt.isActive
    )

    if (existingActiveForTenant) {
      return {
        error: 'Tenant already has an active property assignment. End the existing tenancy first.',
      }
    }

    // Constraint 2: Check for duplicate property-tenant pair
    const duplicateExists = propertyTenants.find(
      pt => pt.propertyId === data.propertyId && pt.tenantId === data.tenantId && pt.isActive
    )

    if (duplicateExists) {
      return {
        error: 'This property-tenant relationship already exists and is active.',
      }
    }

    // Validation happens in PropertyTenant.create()
    const newPropertyTenant = PropertyTenant.create(data)
    propertyTenants.push(newPropertyTenant)
    return newPropertyTenant
  }

  getPropertyTenants(): PropertyTenant[] {
    return propertyTenants
  }

  getPropertyTenantById(id: string): PropertyTenant | undefined {
    return propertyTenants.find(pt => pt.id === id)
  }

  /**
   * Get all tenants for a specific property
   */
  getTenantsByPropertyId(propertyId: string): PropertyTenant[] {
    return propertyTenants.filter(pt => pt.propertyId === propertyId)
  }

  /**
   * Get all active tenants for a specific property
   */
  getActiveTenantsForProperty(propertyId: string): PropertyTenant[] {
    return propertyTenants.filter(pt => pt.propertyId === propertyId && pt.isActive)
  }

  /**
   * Get property for a specific tenant
   */
  getPropertyByTenantId(tenantId: string): PropertyTenant | undefined {
    return propertyTenants.find(pt => pt.tenantId === tenantId && pt.isActive)
  }

  /**
   * Get all property history for a tenant (active and inactive)
   */
  getPropertyHistoryForTenant(tenantId: string): PropertyTenant[] {
    return propertyTenants.filter(pt => pt.tenantId === tenantId)
  }

  /**
   * Get all active property-tenant relationships
   */
  getActivePropertyTenants(): PropertyTenant[] {
    return propertyTenants.filter(pt => pt.isActive)
  }

  /**
   * Check if a property has any active tenants
   */
  hasActiveTenants(propertyId: string): boolean {
    return propertyTenants.some(pt => pt.propertyId === propertyId && pt.isActive)
  }

  /**
   * Check if a tenant has an active property
   */
  hasActiveProperty(tenantId: string): boolean {
    return propertyTenants.some(pt => pt.tenantId === tenantId && pt.isActive)
  }

  updatePropertyTenant(id: string, data: UpdatePropertyTenantDTO): PropertyTenant | null {
    const ptIndex = propertyTenants.findIndex(pt => pt.id === id)
    if (ptIndex === -1) {
      return null
    }

    const propertyTenant = propertyTenants[ptIndex]

    // If trying to reactivate, check constraints
    if (data.isActive === true && !propertyTenant.isActive) {
      const existingActiveForTenant = propertyTenants.find(
        pt => pt.tenantId === propertyTenant.tenantId && pt.isActive && pt.id !== id
      )

      if (existingActiveForTenant) {
        throw new Error('Cannot reactivate: Tenant already has an active property assignment.')
      }
    }

    // Validation happens in propertyTenant.update()
    propertyTenant.update(data)

    return propertyTenant
  }

  /**
   * End a tenancy relationship
   */
  endTenancy(id: string, endDate?: Date): PropertyTenant | null {
    const propertyTenant = propertyTenants.find(pt => pt.id === id)
    if (!propertyTenant) {
      return null
    }

    propertyTenant.endTenancy(endDate)
    return propertyTenant
  }

  deletePropertyTenant(id: string): boolean {
    const ptIndex = propertyTenants.findIndex(pt => pt.id === id)
    if (ptIndex === -1) {
      return false
    }
    propertyTenants.splice(ptIndex, 1)
    return true
  }
}

export const propertyTenantRepository = new PropertyTenantRepository()
