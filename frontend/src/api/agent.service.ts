import axios from 'axios'
import type { PropertyAgent, CreatePropertyAgentDTO, UpdatePropertyAgentDTO } from '../types/agent'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const agentService = {
  // Create a new agent
  async createAgent(data: CreatePropertyAgentDTO): Promise<PropertyAgent> {
    const response = await api.post<PropertyAgent>('/agents', data)
    return response.data
  },

  // Get all agents
  async getAgents(): Promise<PropertyAgent[]> {
    const response = await api.get<PropertyAgent[]>('/agents')
    return response.data
  },

  // Get a single agent by ID
  async getAgentById(id: string): Promise<PropertyAgent> {
    const response = await api.get<PropertyAgent>(`/agents/${id}`)
    return response.data
  },

  // Update an agent
  async updateAgent(id: string, data: UpdatePropertyAgentDTO): Promise<PropertyAgent> {
    const response = await api.put<PropertyAgent>(`/agents/${id}`, data)
    return response.data
  },

  // Delete an agent
  async deleteAgent(id: string): Promise<void> {
    await api.delete(`/agents/${id}`)
  },
}
