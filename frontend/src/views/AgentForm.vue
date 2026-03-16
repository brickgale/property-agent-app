<template>
  <div class="max-w-2xl mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>{{ isEditMode ? 'Edit Agent' : 'Add New Agent' }}</CardTitle>
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

          <div class="flex gap-3 pt-4">
            <Button type="submit" :disabled="loading">
              <Save class="mr-2 h-4 w-4" v-if="!loading" />
              <Loader2 class="mr-2 h-4 w-4 animate-spin" v-else />
              {{ loading ? 'Saving...' : isEditMode ? 'Update Agent' : 'Create Agent' }}
            </Button>
            <router-link to="/">
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
import { useAgentStore } from '@/stores/agent.store'
import type { CreatePropertyAgentDTO } from '@/types/agent'
import { CreatePropertyAgentSchema } from '@/types/agent'
import { agentService } from '@/api/agent.service'
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
const agentStore = useAgentStore()

const isEditMode = computed(() => !!route.params.id)
const loading = computed(() => agentStore.loading)
const error = computed(() => agentStore.error)

const formData = reactive<CreatePropertyAgentDTO>({
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
})

const successMessage = ref('')

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const agent = await agentService.getAgentById(route.params.id as string)
      formData.firstName = agent.firstName
      formData.lastName = agent.lastName
      formData.email = agent.email
      formData.mobileNumber = agent.mobileNumber
    } catch (err) {
      console.error('Failed to fetch agent:', err)
    }
  }
})

function validateForm(): boolean {
  // Reset errors
  errors.firstName = ''
  errors.lastName = ''
  errors.email = ''
  errors.mobileNumber = ''

  try {
    // Validate using Zod schema
    CreatePropertyAgentSchema.parse(formData)
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
    if (isEditMode.value) {
      await agentStore.updateAgent(route.params.id as string, formData)
      successMessage.value = 'Agent updated successfully!'
    } else {
      await agentStore.createAgent(formData)
      successMessage.value = 'Agent created successfully!'

      // Reset form
      formData.firstName = ''
      formData.lastName = ''
      formData.email = ''
      formData.mobileNumber = ''
    }

    // Redirect to list after 1.5 seconds
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (err) {
    console.error('Failed to save agent:', err)
  }
}
</script>
