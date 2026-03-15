import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PropertyAgent, CreatePropertyAgentDTO, UpdatePropertyAgentDTO } from '../types/agent'
import { agentService } from '../api/agent.service'

export const useAgentStore = defineStore('agent', () => {
  const agents = ref<PropertyAgent[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all agents
  async function fetchAgents() {
    loading.value = true
    error.value = null
    try {
      agents.value = await agentService.getAgents()
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch agents'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create a new agent
  async function createAgent(data: CreatePropertyAgentDTO) {
    loading.value = true
    error.value = null
    try {
      const newAgent = await agentService.createAgent(data)
      agents.value.push(newAgent)
      return newAgent
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create agent'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update an agent
  async function updateAgent(id: string, data: UpdatePropertyAgentDTO) {
    loading.value = true
    error.value = null
    try {
      const updatedAgent = await agentService.updateAgent(id, data)
      const index = agents.value.findIndex(a => a.id === id)
      if (index !== -1) {
        agents.value[index] = updatedAgent
      }
      return updatedAgent
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update agent'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete an agent
  async function deleteAgent(id: string) {
    loading.value = true
    error.value = null
    try {
      await agentService.deleteAgent(id)
      agents.value = agents.value.filter(a => a.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete agent'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    agents,
    loading,
    error,
    fetchAgents,
    createAgent,
    updateAgent,
    deleteAgent,
  }
})
