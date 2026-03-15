import { v4 as uuidv4 } from 'uuid'
import agents from '../data/agents.data.js'
import {
  PropertyAgent,
  CreatePropertyAgentDTO,
  UpdatePropertyAgentDTO,
} from '../models/agent.model.js'

export class AgentRepository {
  createAgent(data: CreatePropertyAgentDTO): PropertyAgent {
    const now = new Date()
    const newAgent = new PropertyAgent(
      uuidv4(),
      data.firstName,
      data.lastName,
      data.email,
      data.mobileNumber,
      now,
      now
    )

    // Validate before saving
    const validation = newAgent.validate()
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
    }

    agents.push(newAgent)
    return newAgent
  }

  getAgents(): PropertyAgent[] {
    return agents
  }

  getAgentById(id: string): PropertyAgent | undefined {
    return agents.find(agent => agent.id === id)
  }

  updateAgent(id: string, data: UpdatePropertyAgentDTO): PropertyAgent | null {
    const agentIndex = agents.findIndex(agent => agent.id === id)
    if (agentIndex === -1) {
      return null
    }

    const agent = agents[agentIndex]
    agent.update(data)

    // Validate after update
    const validation = agent.validate()
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
    }

    return agent
  }

  deleteAgent(id: string): boolean {
    const agentIndex = agents.findIndex(agent => agent.id === id)
    if (agentIndex === -1) {
      return false
    }
    agents.splice(agentIndex, 1)
    return true
  }
}

export const agentRepository = new AgentRepository()
