import tenants from '@/data/tenants.data.js'
import { Tenant, CreateTenantDTO, UpdateTenantDTO } from '@/models/tenant.model.js'

export class TenantRepository {
  createTenant(data: CreateTenantDTO): Tenant {
    // Validation happens in Tenant.create()
    const newTenant = Tenant.create(data)
    tenants.push(newTenant)
    return newTenant
  }

  getTenants(): Tenant[] {
    return tenants
  }

  getTenantById(id: string): Tenant | undefined {
    return tenants.find(tenant => tenant.id === id)
  }

  getTenantsByPropertyId(propertyId: string): Tenant[] {
    return tenants.filter(tenant => tenant.propertyId === propertyId)
  }

  getTenantsByStatus(status: Tenant['status']): Tenant[] {
    return tenants.filter(tenant => tenant.status === status)
  }

  getActiveTenants(): Tenant[] {
    return tenants.filter(tenant => tenant.status === 'active')
  }

  updateTenant(id: string, data: UpdateTenantDTO): Tenant | null {
    const tenantIndex = tenants.findIndex(tenant => tenant.id === id)
    if (tenantIndex === -1) {
      return null
    }

    const tenant = tenants[tenantIndex]
    // Validation happens in tenant.update()
    tenant.update(data)

    return tenant
  }

  deleteTenant(id: string): boolean {
    const tenantIndex = tenants.findIndex(tenant => tenant.id === id)
    if (tenantIndex === -1) {
      return false
    }
    tenants.splice(tenantIndex, 1)
    return true
  }
}

export const tenantRepository = new TenantRepository()
