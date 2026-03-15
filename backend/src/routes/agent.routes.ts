import { Router } from 'express'
import { agentController } from '../controllers/agent.controller.js'

const router = Router()

/**
 * @swagger
 * /agents:
 *   post:
 *     summary: Create a new property agent
 *     tags: [Agents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePropertyAgent'
 *     responses:
 *       201:
 *         description: Agent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyAgent'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.post('/agents', (req, res) => agentController.createAgent(req, res))

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Get all property agents
 *     tags: [Agents]
 *     responses:
 *       200:
 *         description: List of all agents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyAgent'
 *       500:
 *         description: Internal server error
 */
router.get('/agents', (req, res) => agentController.getAgents(req, res))

/**
 * @swagger
 * /agents/{id}:
 *   get:
 *     summary: Get a property agent by ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Agent ID
 *     responses:
 *       200:
 *         description: Agent found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyAgent'
 *       404:
 *         description: Agent not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.get('/agents/:id', (req, res) => agentController.getAgentById(req, res))

/**
 * @swagger
 * /agents/{id}:
 *   put:
 *     summary: Update a property agent
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Agent ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePropertyAgent'
 *     responses:
 *       200:
 *         description: Agent updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyAgent'
 *       404:
 *         description: Agent not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.put('/agents/:id', (req, res) => agentController.updateAgent(req, res))

/**
 * @swagger
 * /agents/{id}:
 *   delete:
 *     summary: Delete a property agent
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Agent ID
 *     responses:
 *       204:
 *         description: Agent deleted successfully
 *       404:
 *         description: Agent not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.delete('/agents/:id', (req, res) => agentController.deleteAgent(req, res))

export default router
