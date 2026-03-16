import agents from '@/data/agents.data.js'
import {
  PropertyAgent,
  CreatePropertyAgentDTO,
  UpdatePropertyAgentDTO,
} from '@/models/agent.model.js'

export class AgentRepository {
  createAgent(data: CreatePropertyAgentDTO): PropertyAgent {
    // Validation happens in PropertyAgent.create()
    const newAgent = PropertyAgent.create(data)
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
    // Validation happens in agent.update()
    agent.update(data)

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
