/**
 * Composable for generating random test data for forms
 */

export function useFormGenerator() {
  const randomString = (length: number = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  }

  const randomEmail = () => {
    return `${randomString(8).toLowerCase()}@example.com`
  }

  const randomPhone = () => {
    return `${Math.floor(1000000000 + Math.random() * 9000000000)}`
  }

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const randomDate = (startYear: number = 2020, endYear: number = 2026) => {
    const start = new Date(startYear, 0, 1)
    const end = new Date(endYear, 11, 31)
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split('T')[0]
  }

  const randomFutureDate = (daysFromNow: number = 30) => {
    const date = new Date()
    date.setDate(date.getDate() + randomNumber(1, daysFromNow))
    return date.toISOString().split('T')[0]
  }

  const randomFromArray = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // Generate random agent data
  const generateAgentData = () => {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa']
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
    ]

    return {
      firstName: randomFromArray(firstNames),
      lastName: randomFromArray(lastNames),
      email: randomEmail(),
      mobileNumber: randomPhone(),
    }
  }

  // Generate random property data
  const generatePropertyData = () => {
    const propertyTypes = ['residential', 'commercial', 'industrial', 'land', 'mixed-use'] as const
    const statuses = ['available', 'occupied', 'maintenance', 'sold'] as const
    const propertyNames = [
      'Sunset Villa',
      'Ocean View Apartment',
      'Downtown Office Space',
      'Green Valley Estate',
      'Riverside Mansion',
      'City Center Loft',
      'Mountain Retreat',
      'Lakeside Property',
    ]

    return {
      name: randomFromArray(propertyNames),
      description: `Beautiful ${randomFromArray(propertyTypes)} property with excellent amenities and prime location.`,
      propertyType: randomFromArray(propertyTypes),
      status: randomFromArray(statuses),
      purchasePrice: randomNumber(100000, 1000000),
      currentValue: randomNumber(100000, 1200000),
      purchaseDate: randomDate(2018, 2024),
      agentId: undefined as string | undefined,
      addressId: undefined as string | undefined,
    }
  }

  // Generate random tenant data
  const generateTenantData = () => {
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn']
    const lastNames = [
      'Anderson',
      'Thomas',
      'Jackson',
      'White',
      'Harris',
      'Martin',
      'Thompson',
      'Wilson',
    ]
    const statuses = ['active', 'inactive', 'pending'] as const

    return {
      firstName: randomFromArray(firstNames),
      lastName: randomFromArray(lastNames),
      email: randomEmail(),
      mobileNumber: randomPhone(),
      status: randomFromArray(statuses),
      leaseStartDate: randomDate(2023, 2025),
      leaseEndDate: randomDate(2026, 2028),
      propertyId: undefined as string | undefined,
      addressId: undefined as string | undefined,
    }
  }

  // Generate random ticket data
  const generateTicketData = () => {
    const types = ['reminder', 'note', 'maintenance', 'inspection', 'payment', 'other'] as const
    const priorities = ['low', 'medium', 'high', 'urgent'] as const
    const statuses = ['open', 'in-progress', 'closed', 'cancelled'] as const
    const titles = [
      'Fix leaking faucet',
      'Schedule annual inspection',
      'Payment due reminder',
      'HVAC maintenance required',
      'Pest control appointment',
      'Roof repair needed',
      'Paint exterior walls',
      'Replace broken window',
    ]
    const descriptions = [
      'This requires immediate attention.',
      'Please schedule at earliest convenience.',
      'Follow up with tenant regarding this issue.',
      'Contact service provider for quote.',
      'Needs to be completed before end of month.',
    ]

    return {
      title: randomFromArray(titles),
      description: randomFromArray(descriptions),
      type: randomFromArray(types),
      priority: randomFromArray(priorities),
      status: randomFromArray(statuses),
      dueDate: randomFutureDate(60),
      propertyId: '',
      assignedTo: undefined as string | undefined,
    }
  }

  // Generate random address data
  const generateAddressData = () => {
    const streets = ['Main', 'Oak', 'Maple', 'Cedar', 'Pine', 'Elm', 'Washington', 'Lake']
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia']
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH']
    const addressableTypes = ['property', 'agent', 'tenant'] as const

    return {
      street: `${randomNumber(100, 9999)} ${randomFromArray(streets)} Street`,
      city: randomFromArray(cities),
      state: randomFromArray(states),
      zipCode: `${randomNumber(10000, 99999)}`,
      country: 'USA',
      addressableType: randomFromArray(addressableTypes),
      addressableId: randomUUID(),
    }
  }

  // Generate random property-tenant relationship data
  const generatePropertyTenantData = () => {
    const monthlyRents = [800, 1000, 1200, 1500, 1800, 2000, 2500, 3000]
    const depositMultipliers = [1, 1.5, 2]

    const monthlyRent = randomFromArray(monthlyRents)
    const securityDeposit = monthlyRent * randomFromArray(depositMultipliers)

    return {
      propertyId: randomUUID(),
      tenantId: randomUUID(),
      startDate: randomDate(2023, 2025),
      endDate: undefined as string | undefined,
      monthlyRent,
      securityDeposit,
    }
  }

  return {
    generateAgentData,
    generatePropertyData,
    generateTenantData,
    generateTicketData,
    generateAddressData,
    generatePropertyTenantData,
    // Utility functions
    randomString,
    randomEmail,
    randomPhone,
    randomNumber,
    randomDate,
    randomFutureDate,
    randomFromArray,
    randomUUID,
  }
}
