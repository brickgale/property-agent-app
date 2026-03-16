import axios from 'axios'
import type {
  PropertyAgentResponse,
  CreatePropertyAgentDTO,
  UpdatePropertyAgentDTO,
} from '@/types/agent'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const agentService = {
  // Create a new agent
  async createAgent(data: CreatePropertyAgentDTO): Promise<PropertyAgentResponse> {
    const response = await api.post<PropertyAgentResponse>('/agents', data)
    return response.data
  },

  // Get all agents
  async getAgents(): Promise<PropertyAgentResponse[]> {
    const response = await api.get<PropertyAgentResponse[]>('/agents')
    return response.data
  },

  // Get a single agent by ID
  async getAgentById(id: string): Promise<PropertyAgentResponse> {
    const response = await api.get<PropertyAgentResponse>(`/agents/${id}`)
    return response.data
  },

  // Update an agent
  async updateAgent(id: string, data: UpdatePropertyAgentDTO): Promise<PropertyAgentResponse> {
    const response = await api.put<PropertyAgentResponse>(`/agents/${id}`, data)
    return response.data
  },

  // Delete an agent
  async deleteAgent(id: string): Promise<void> {
    await api.delete(`/agents/${id}`)
  },
}
