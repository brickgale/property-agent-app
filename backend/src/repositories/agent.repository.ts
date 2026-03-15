import { v4 as uuidv4 } from 'uuid';
import agents from '../data/agents.data.js';
import {
  PropertyAgent,
  CreatePropertyAgentDTO,
  UpdatePropertyAgentDTO,
} from '../models/agent.model.js';

export class AgentRepository {
  createAgent(data: CreatePropertyAgentDTO): PropertyAgent {
    const now = new Date();
    const newAgent: PropertyAgent = {
      id: uuidv4(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    agents.push(newAgent);
    return newAgent;
  }

  getAgents(): PropertyAgent[] {
    return agents;
  }

  getAgentById(id: string): PropertyAgent | undefined {
    return agents.find((agent) => agent.id === id);
  }

  updateAgent(id: string, data: UpdatePropertyAgentDTO): PropertyAgent | null {
    const agentIndex = agents.findIndex((agent) => agent.id === id);
    if (agentIndex === -1) {
      return null;
    }

    const updatedAgent: PropertyAgent = {
      ...agents[agentIndex],
      ...data,
      updatedAt: new Date(),
    };

    agents[agentIndex] = updatedAgent;
    return updatedAgent;
  }

  deleteAgent(id: string): boolean {
    const agentIndex = agents.findIndex((agent) => agent.id === id);
    if (agentIndex === -1) {
      return false;
    }
    agents.splice(agentIndex, 1);
    return true;
  }
}

export const agentRepository = new AgentRepository();
