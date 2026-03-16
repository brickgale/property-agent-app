<template>
  <div class="max-w-2xl mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>{{ isEditMode ? 'Edit Tenant' : 'Add New Tenant' }}</CardTitle>
      </CardHeader>

      <CardContent>
        <div v-if="error" class="rounded-lg bg-destructive/15 p-4 text-destructive mb-6">
          {{ error }}
        </div>

        <div v-if="successMessage" class="rounded-lg bg-primary/15 p-4 text-primary mb-6">
          {{ successMessage }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="firstName">First Name *</Label>
              <Input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                required
                placeholder="Enter first name"
              />
              <div v-if="errors.firstName" class="text-sm text-destructive">
                {{ errors.firstName }}
              </div>
            </div>

            <div class="space-y-2">
              <Label for="lastName">Last Name *</Label>
              <Input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                required
                placeholder="Enter last name"
              />
              <div v-if="errors.lastName" class="text-sm text-destructive">
                {{ errors.lastName }}
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="email">Email *</Label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="Enter email address"
            />
            <div v-if="errors.email" class="text-sm text-destructive">
              {{ errors.email }}
            </div>
          </div>

          <div class="space-y-2">
            <Label for="mobileNumber">Mobile Number *</Label>
            <Input
              id="mobileNumber"
              v-model="formData.mobileNumber"
              type="tel"
              required
              placeholder="Enter mobile number"
            />
            <div v-if="errors.mobileNumber" class="text-sm text-destructive">
              {{ errors.mobileNumber }}
            </div>
          </div>

          <div class="space-y-2">
            <Label for="status">Status *</Label>
            <select
              id="status"
              v-model="formData.status"
              required
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <div v-if="errors.status" class="text-sm text-destructive">
              {{ errors.status }}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="leaseStartDate">Lease Start Date</Label>
              <Input id="leaseStartDate" v-model="formData.leaseStartDate" type="date" />
              <div v-if="errors.leaseStartDate" class="text-sm text-destructive">
                {{ errors.leaseStartDate }}
              </div>
            </div>

            <div class="space-y-2">
              <Label for="leaseEndDate">Lease End Date</Label>
              <Input id="leaseEndDate" v-model="formData.leaseEndDate" type="date" />
              <div v-if="errors.leaseEndDate" class="text-sm text-destructive">
                {{ errors.leaseEndDate }}
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="propertyId">Property</Label>
            <select
              id="propertyId"
              v-model="formData.propertyId"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option :value="undefined">Select a property (optional)</option>
              <option v-for="property in properties" :key="property.id" :value="property.id">
                {{ property.name }}
              </option>
            </select>
            <div v-if="errors.propertyId" class="text-sm text-destructive">
              {{ errors.propertyId }}
            </div>
          </div>

          <div class="flex flex-wrap gap-3 pt-4">
            <Button type="submit" :disabled="loading">
              <Save class="mr-2 h-4 w-4" v-if="!loading" />
              <Loader2 class="mr-2 h-4 w-4 animate-spin" v-else />
              {{ loading ? 'Saving...' : isEditMode ? 'Update Tenant' : 'Create Tenant' }}
            </Button>
            <Button
              type="button"
              variant="secondary"
              @click="() => Object.assign(formData, generateTenantData())"
            >
              <Shuffle class="mr-2 h-4 w-4" />
              Fill Random Data
            </Button>
            <router-link to="/tenants">
              <Button type="button" variant="outline">
                <X class="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </router-link>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Save, X, Loader2, Shuffle } from 'lucide-vue-next'
import { useTenantStore } from '@/stores/tenant.store'
import { usePropertyStore } from '@/stores/property.store'
import { CreateTenantSchema } from '@/types/tenant'
import { tenantService } from '@/api/tenant.service'
import { ZodError } from 'zod'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { useFormGenerator } from '@/composables/useFormGenerator'

const router = useRouter()
const route = useRoute()
const tenantStore = useTenantStore()
const propertyStore = usePropertyStore()
const { generateTenantData } = useFormGenerator()

const isEditMode = computed(() => !!route.params.id)
const loading = computed(() => tenantStore.loading)
const error = computed(() => tenantStore.error)
const properties = computed(() => propertyStore.properties)

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  leaseStartDate: '' as string | undefined,
  leaseEndDate: '' as string | undefined,
  status: 'pending' as 'active' | 'inactive' | 'pending',
  propertyId: undefined as string | undefined,
  addressId: undefined as string | undefined,
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  leaseStartDate: '',
  leaseEndDate: '',
  status: '',
  propertyId: '',
  addressId: '',
})

const successMessage = ref('')

onMounted(async () => {
  // Load properties for dropdown
  try {
    await propertyStore.fetchProperties()
  } catch (err) {
    console.error('Failed to fetch properties:', err)
  }

  if (isEditMode.value) {
    try {
      const tenant = await tenantService.getTenantById(route.params.id as string)
      formData.firstName = tenant.firstName
      formData.lastName = tenant.lastName
      formData.email = tenant.email
      formData.mobileNumber = tenant.mobileNumber
      formData.status = tenant.status
      formData.leaseStartDate = tenant.leaseStartDate
        ? new Date(tenant.leaseStartDate).toISOString().split('T')[0]
        : ''
      formData.leaseEndDate = tenant.leaseEndDate
        ? new Date(tenant.leaseEndDate).toISOString().split('T')[0]
        : ''
      formData.propertyId = tenant.propertyId
      formData.addressId = tenant.addressId
    } catch (err) {
      console.error('Failed to fetch tenant:', err)
    }
  }
})

function validateForm(): boolean {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  try {
    // Validate using Zod schema
    CreateTenantSchema.parse(formData)
    return true
  } catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach(err => {
        const field = err.path[0] as keyof typeof errors
        if (field in errors) {
          errors[field] = err.message
        }
      })
    }
    return false
  }
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  successMessage.value = ''

  try {
    // Convert form data to DTO format with proper Date types
    const dto = {
      ...formData,
      leaseStartDate: formData.leaseStartDate ? new Date(formData.leaseStartDate) : undefined,
      leaseEndDate: formData.leaseEndDate ? new Date(formData.leaseEndDate) : undefined,
    }

    if (isEditMode.value) {
      await tenantStore.updateTenant(route.params.id as string, dto)
      successMessage.value = 'Tenant updated successfully!'
    } else {
      await tenantStore.createTenant(dto)
      successMessage.value = 'Tenant created successfully!'

      // Reset form
      formData.firstName = ''
      formData.lastName = ''
      formData.email = ''
      formData.mobileNumber = ''
      formData.status = 'pending'
      formData.leaseStartDate = ''
      formData.leaseEndDate = ''
      formData.propertyId = undefined
      formData.addressId = undefined
    }

    // Redirect to list after 1.5 seconds
    setTimeout(() => {
      router.push('/tenants')
    }, 1500)
  } catch (err) {
    console.error('Failed to save tenant:', err)
  }
}
</script>
