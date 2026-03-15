import { Request, Response } from 'express';
import { agentRepository } from '../repositories/agent.repository.js';
import { CreatePropertyAgentDTO, UpdatePropertyAgentDTO } from '../models/agent.model.js';

// Validation helper
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateMobileNumber(mobile: string): boolean {
  // Simple validation: should be numeric and at least 10 digits
  const mobileRegex = /^\d{10,15}$/;
  return mobileRegex.test(mobile.replace(/[\s-]/g, ''));
}

export class AgentController {
  // POST /agents
  createAgent(req: Request, res: Response): void {
    try {
      const { firstName, lastName, email, mobileNumber }: CreatePropertyAgentDTO = req.body;

      // Validation
      if (!firstName || !lastName || !email || !mobileNumber) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      if (!validateEmail(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      if (!validateMobileNumber(mobileNumber)) {
        res.status(400).json({ error: 'Invalid mobile number format' });
        return;
      }

      const agent = agentRepository.createAgent({
        firstName,
        lastName,
        email,
        mobileNumber,
      });

      res.status(201).json(agent);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /agents
  getAgents(req: Request, res: Response): void {
    try {
      const agents = agentRepository.getAgents();
      res.status(200).json(agents);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /agents/:id
  getAgentById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const agent = agentRepository.getAgentById(id);

      if (!agent) {
        res.status(404).json({ error: 'Agent not found' });
        return;
      }

      res.status(200).json(agent);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT /agents/:id
  updateAgent(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const updateData: UpdatePropertyAgentDTO = req.body;

      // Validate email if provided
      if (updateData.email && !validateEmail(updateData.email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      // Validate mobile if provided
      if (updateData.mobileNumber && !validateMobileNumber(updateData.mobileNumber)) {
        res.status(400).json({ error: 'Invalid mobile number format' });
        return;
      }

      const updatedAgent = agentRepository.updateAgent(id, updateData);

      if (!updatedAgent) {
        res.status(404).json({ error: 'Agent not found' });
        return;
      }

      res.status(200).json(updatedAgent);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // DELETE /agents/:id
  deleteAgent(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const success = agentRepository.deleteAgent(id);

      if (!success) {
        res.status(404).json({ error: 'Agent not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const agentController = new AgentController();
