<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1>{{ isEditMode ? 'Edit Agent' : 'Add New Agent' }}</h1>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="firstName">First Name *</label>
          <input
            id="firstName"
            v-model="formData.firstName"
            type="text"
            required
            placeholder="Enter first name"
          />
          <div v-if="errors.firstName" class="error">{{ errors.firstName }}</div>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input
            id="lastName"
            v-model="formData.lastName"
            type="text"
            required
            placeholder="Enter last name"
          />
          <div v-if="errors.lastName" class="error">{{ errors.lastName }}</div>
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            placeholder="Enter email address"
          />
          <div v-if="errors.email" class="error">{{ errors.email }}</div>
        </div>

        <div class="form-group">
          <label for="mobileNumber">Mobile Number *</label>
          <input
            id="mobileNumber"
            v-model="formData.mobileNumber"
            type="tel"
            required
            placeholder="Enter mobile number"
          />
          <div v-if="errors.mobileNumber" class="error">{{ errors.mobileNumber }}</div>
        </div>

        <div class="flex flex-gap mt-3">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEditMode ? 'Update Agent' : 'Create Agent' }}
          </button>
          <router-link to="/">
            <button type="button" class="btn btn-secondary">Cancel</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAgentStore } from '../stores/agent.store'
import type { CreatePropertyAgentDTO } from '../types/agent'
import { agentService } from '../api/agent.service'

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
  let isValid = true

  // Reset errors
  errors.firstName = ''
  errors.lastName = ''
  errors.email = ''
  errors.mobileNumber = ''

  // Validate first name
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }

  // Validate last name
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Validate mobile number
  const mobileRegex = /^\d{10,15}$/
  const cleanedMobile = formData.mobileNumber.replace(/[\s-]/g, '')
  if (!formData.mobileNumber.trim()) {
    errors.mobileNumber = 'Mobile number is required'
    isValid = false
  } else if (!mobileRegex.test(cleanedMobile)) {
    errors.mobileNumber = 'Please enter a valid mobile number (10-15 digits)'
    isValid = false
  }

  return isValid
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
