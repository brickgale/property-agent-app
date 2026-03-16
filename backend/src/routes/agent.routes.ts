import { Router } from 'express'
import { agentController } from '../controllers/agent.controller.js'

const router = Router()

router.post('/agents', (req, res) => agentController.createAgent(req, res))
router.get('/agents', (req, res) => agentController.getAgents(req, res))
router.get('/agents/:id', (req, res) => agentController.getAgentById(req, res))
router.put('/agents/:id', (req, res) => agentController.updateAgent(req, res))
router.delete('/agents/:id', (req, res) => agentController.deleteAgent(req, res))

export default router
