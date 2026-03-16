import properties from '@/data/properties.data.js'
import { Property, CreatePropertyDTO, UpdatePropertyDTO } from '@/models/property.model.js'

export class PropertyRepository {
  createProperty(data: CreatePropertyDTO): Property {
    // Validation happens in Property.create()
    const newProperty = Property.create(data)
    properties.push(newProperty)
    return newProperty
  }

  getProperties(): Property[] {
    return properties
  }

  getPropertyById(id: string): Property | undefined {
    return properties.find(property => property.id === id)
  }

  getPropertiesByAgentId(agentId: string): Property[] {
    return properties.filter(property => property.agentId === agentId)
  }

  getPropertiesByStatus(status: Property['status']): Property[] {
    return properties.filter(property => property.status === status)
  }

  updateProperty(id: string, data: UpdatePropertyDTO): Property | null {
    const propertyIndex = properties.findIndex(property => property.id === id)
    if (propertyIndex === -1) {
      return null
    }

    const property = properties[propertyIndex]
    // Validation happens in property.update()
    property.update(data)

    return property
  }

  deleteProperty(id: string): boolean {
    const propertyIndex = properties.findIndex(property => property.id === id)
    if (propertyIndex === -1) {
      return false
    }
    properties.splice(propertyIndex, 1)
    return true
  }
}

export const propertyRepository = new PropertyRepository()
