<template>
  <div class="max-w-2xl mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>{{ isEditMode ? 'Edit Property' : 'Add New Property' }}</CardTitle>
      </CardHeader>

      <CardContent>
        <div v-if="error" class="rounded-lg bg-destructive/15 p-4 text-destructive mb-6">
          {{ error }}
        </div>

        <div v-if="successMessage" class="rounded-lg bg-primary/15 p-4 text-primary mb-6">
          {{ successMessage }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <Label for="name">Property Name *</Label>
            <Input
              id="name"
              v-model="formData.name"
              type="text"
              required
              placeholder="Enter property name"
            />
            <div v-if="errors.name" class="text-sm text-destructive">
              {{ errors.name }}
            </div>
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <textarea
              id="description"
              v-model="formData.description"
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter property description"
            />
            <div v-if="errors.description" class="text-sm text-destructive">
              {{ errors.description }}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="propertyType">Property Type *</Label>
              <select
                id="propertyType"
                v-model="formData.propertyType"
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="land">Land</option>
                <option value="mixed-use">Mixed Use</option>
              </select>
              <div v-if="errors.propertyType" class="text-sm text-destructive">
                {{ errors.propertyType }}
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
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
                <option value="sold">Sold</option>
              </select>
              <div v-if="errors.status" class="text-sm text-destructive">
                {{ errors.status }}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="purchasePrice">Purchase Price</Label>
              <Input
                id="purchasePrice"
                v-model.number="formData.purchasePrice"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
              <div v-if="errors.purchasePrice" class="text-sm text-destructive">
                {{ errors.purchasePrice }}
              </div>
            </div>

            <div class="space-y-2">
              <Label for="currentValue">Current Value</Label>
              <Input
                id="currentValue"
                v-model.number="formData.currentValue"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
              <div v-if="errors.currentValue" class="text-sm text-destructive">
                {{ errors.currentValue }}
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="purchaseDate">Purchase Date</Label>
            <Input id="purchaseDate" v-model="formData.purchaseDate" type="date" />
            <div v-if="errors.purchaseDate" class="text-sm text-destructive">
              {{ errors.purchaseDate }}
            </div>
          </div>

          <div class="space-y-2">
            <Label for="agentId">Agent ID</Label>
            <Input
              id="agentId"
              v-model="formData.agentId"
              type="text"
              placeholder="Enter agent UUID"
            />
            <div v-if="errors.agentId" class="text-sm text-destructive">
              {{ errors.agentId }}
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <Button type="submit" :disabled="loading">
              <Save class="mr-2 h-4 w-4" v-if="!loading" />
              <Loader2 class="mr-2 h-4 w-4 animate-spin" v-else />
              {{ loading ? 'Saving...' : isEditMode ? 'Update Property' : 'Create Property' }}
            </Button>
            <router-link to="/properties">
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
import { Save, X, Loader2 } from 'lucide-vue-next'
import { usePropertyStore } from '@/stores/property.store'
import { CreatePropertySchema } from '@/types/property'
import { propertyService } from '@/api/property.service'
import { ZodError } from 'zod'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'

const router = useRouter()
const route = useRoute()
const propertyStore = usePropertyStore()

const isEditMode = computed(() => !!route.params.id)
const loading = computed(() => propertyStore.loading)
const error = computed(() => propertyStore.error)

const formData = reactive({
  name: '',
  description: '' as string | undefined,
  propertyType: '' as any,
  status: 'available' as 'available' | 'occupied' | 'maintenance' | 'sold',
  purchasePrice: undefined as number | undefined,
  currentValue: undefined as number | undefined,
  purchaseDate: '' as string | undefined,
  addressId: undefined as string | undefined,
  agentId: undefined as string | undefined,
})

const errors = reactive({
  name: '',
  description: '',
  propertyType: '',
  status: '',
  purchasePrice: '',
  currentValue: '',
  purchaseDate: '',
  addressId: '',
  agentId: '',
})

const successMessage = ref('')

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const property = await propertyService.getPropertyById(route.params.id as string)
      formData.name = property.name
      formData.description = property.description
      formData.propertyType = property.propertyType
      formData.status = property.status
      formData.purchasePrice = property.purchasePrice
      formData.currentValue = property.currentValue
      formData.purchaseDate = property.purchaseDate
        ? new Date(property.purchaseDate).toISOString().split('T')[0]
        : ''
      formData.addressId = property.addressId
      formData.agentId = property.agentId
    } catch (err) {
      console.error('Failed to fetch property:', err)
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
    CreatePropertySchema.parse(formData)
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
      purchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate) : undefined,
    }

    if (isEditMode.value) {
      await propertyStore.updateProperty(route.params.id as string, dto)
      successMessage.value = 'Property updated successfully!'
    } else {
      await propertyStore.createProperty(dto)
      successMessage.value = 'Property created successfully!'

      // Reset form
      formData.name = ''
      formData.description = ''
      formData.propertyType = '' as any
      formData.status = 'available'
      formData.purchasePrice = undefined
      formData.currentValue = undefined
      formData.purchaseDate = ''
      formData.addressId = undefined
      formData.agentId = undefined
    }

    // Redirect to list after 1.5 seconds
    setTimeout(() => {
      router.push('/properties')
    }, 1500)
  } catch (err) {
    console.error('Failed to save property:', err)
  }
}
</script>
