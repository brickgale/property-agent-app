<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Loader2, Save, X, Shuffle } from 'lucide-vue-next'
import { ZodError } from 'zod'
import { ticketService } from '@/api/ticket.service'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { useTicketStore } from '@/stores/ticket.store'
import { usePropertyStore } from '@/stores/property.store'
import { useAgentStore } from '@/stores/agent.store'
import { CreateTicketSchema } from '@/types/ticket'
import { useFormGenerator } from '@/composables/useFormGenerator'

const router = useRouter()
const route = useRoute()
const ticketStore = useTicketStore()
const propertyStore = usePropertyStore()
const agentStore = useAgentStore()
const { generateTicketData } = useFormGenerator()

const isEditMode = computed(() => !!route.params.id)
const loading = computed(() => ticketStore.loading)
const error = computed(() => ticketStore.error)
const properties = computed(() => propertyStore.properties)
const agents = computed(() => agentStore.agents)

// Auto-assign agent based on selected property
const selectedProperty = computed(() => {
  return properties.value.find(p => p.id === formData.propertyId)
})

const isAgentAutoAssigned = computed(() => {
  return !!selectedProperty.value?.agentId
})

const formData = reactive({
  title: '',
  description: '' as string | undefined,
  type: 'note' as 'reminder' | 'note' | 'maintenance' | 'inspection' | 'payment' | 'other',
  priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
  status: 'open' as 'open' | 'in-progress' | 'closed' | 'cancelled',
  dueDate: '' as string | undefined,
  propertyId: '',
  assignedTo: undefined as string | undefined,
})

const errors = reactive({
  title: '',
  description: '',
  type: '',
  priority: '',
  status: '',
  dueDate: '',
  propertyId: '',
  assignedTo: '',
})

const successMessage = ref('')

// Watch for property changes and auto-assign agent
watch(
  () => formData.propertyId,
  (newPropertyId) => {
    if (newPropertyId && !isEditMode.value) {
      const property = properties.value.find(p => p.id === newPropertyId)
      if (property?.agentId) {
        formData.assignedTo = property.agentId
      } else {
        formData.assignedTo = undefined
      }
    }
  }
)

onMounted(async () => {
  // Load properties and agents for dropdowns
  try {
    await Promise.all([propertyStore.fetchProperties(), agentStore.fetchAgents()])
  } catch (err) {
    console.error('Failed to fetch properties/agents:', err)
  }

  if (isEditMode.value) {
    try {
      const ticket = await ticketService.getTicketById(route.params.id as string)
      formData.title = ticket.title
      formData.description = ticket.description
      formData.type = ticket.type
      formData.priority = ticket.priority
      formData.status = ticket.status
      formData.dueDate = ticket.dueDate ? new Date(ticket.dueDate).toISOString().split('T')[0] : ''
      formData.propertyId = ticket.propertyId
      formData.assignedTo = ticket.assignedTo
    } catch (err) {
      console.error('Failed to fetch ticket:', err)
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
    CreateTicketSchema.parse(formData)
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
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    }

    if (isEditMode.value) {
      await ticketStore.updateTicket(route.params.id as string, dto)
      successMessage.value = 'Ticket updated successfully!'
    } else {
      await ticketStore.createTicket(dto)
      successMessage.value = 'Ticket created successfully!'

      // Reset form
      formData.title = ''
      formData.description = ''
      formData.type = 'note'
      formData.priority = 'medium'
      formData.status = 'open'
      formData.dueDate = ''
      formData.propertyId = ''
      formData.assignedTo = undefined
    }

    // Redirect to list after 1.5 seconds
    setTimeout(() => {
      router.push('/tickets')
    }, 1500)
  } catch (err) {
    console.error('Failed to save ticket:', err)
  }
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <Card>
      <CardHeader>
        <CardTitle>{{ isEditMode ? 'Edit Ticket' : 'Add New Ticket' }}</CardTitle>
      </CardHeader>

      <CardContent>
        <div v-if="error" class="mb-6 rounded-lg bg-destructive/15 p-4 text-destructive">
          {{ error }}
        </div>

        <div v-if="successMessage" class="mb-6 rounded-lg bg-primary/15 p-4 text-primary">
          {{ successMessage }}
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <Label for="title">Title *</Label>
            <Input
              id="title"
              v-model="formData.title"
              type="text"
              required
              placeholder="Enter ticket title"
            />
            <div v-if="errors.title" class="text-sm text-destructive">
              {{ errors.title }}
            </div>
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <textarea
              id="description"
              v-model="formData.description"
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter ticket description"
            />
            <div v-if="errors.description" class="text-sm text-destructive">
              {{ errors.description }}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="type">Type *</Label>
              <select
                id="type"
                v-model="formData.type"
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="reminder">Reminder</option>
                <option value="note">Note</option>
                <option value="maintenance">Maintenance</option>
                <option value="inspection">Inspection</option>
                <option value="payment">Payment</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.type" class="text-sm text-destructive">
                {{ errors.type }}
              </div>
            </div>

            <div class="space-y-2">
              <Label for="priority">Priority *</Label>
              <select
                id="priority"
                v-model="formData.priority"
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <div v-if="errors.priority" class="text-sm text-destructive">
                {{ errors.priority }}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="status">Status *</Label>
              <select
                id="status"
                v-model="formData.status"
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div v-if="errors.status" class="text-sm text-destructive">
                {{ errors.status }}
              </div>
            </div>

            <div class="space-y-2">
              <Label for="dueDate">Due Date</Label>
              <Input id="dueDate" v-model="formData.dueDate" type="date" />
              <div v-if="errors.dueDate" class="text-sm text-destructive">
                {{ errors.dueDate }}
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="propertyId">Property *</Label>
            <select
              id="propertyId"
              v-model="formData.propertyId"
              required
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select a property</option>
              <option v-for="property in properties" :key="property.id" :value="property.id">
                {{ property.name }}
              </option>
            </select>
            <div v-if="errors.propertyId" class="text-sm text-destructive">
              {{ errors.propertyId }}
            </div>
          </div>

          <div class="space-y-2">
            <Label for="assignedTo">Assigned To</Label>
            <select
              id="assignedTo"
              v-model="formData.assignedTo"
              :disabled="isAgentAutoAssigned"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option :value="undefined">Select an agent (optional)</option>
              <option v-for="agent in agents" :key="agent.id" :value="agent.id">
                {{ agent.firstName }} {{ agent.lastName }}
              </option>
            </select>
            <p v-if="isAgentAutoAssigned" class="text-sm text-muted-foreground">
              Auto-assigned from property's agent
            </p>
            <div v-if="errors.assignedTo" class="text-sm text-destructive">
              {{ errors.assignedTo }}
            </div>
          </div>

          <div class="flex flex-wrap gap-3 pt-4">
            <Button type="submit" :disabled="loading">
              <Save v-if="!loading" class="mr-2 h-4 w-4" />
              <Loader2 v-else class="mr-2 h-4 w-4 animate-spin" />
              {{ loading ? 'Saving...' : isEditMode ? 'Update Ticket' : 'Create Ticket' }}
            </Button>
            <Button
              type="button"
              variant="secondary"
              @click="() => Object.assign(formData, generateTicketData())"
            >
              <Shuffle class="mr-2 h-4 w-4" />
              Fill Random Data
            </Button>
            <router-link to="/tickets">
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
