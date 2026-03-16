import express, { Application } from 'express'
import cors from 'cors'
import { apiReference } from '@scalar/express-api-reference'
import agentRoutes from '@/routes/agent.routes.js'
import propertyRoutes from '@/routes/property.routes.js'
import addressRoutes from '@/routes/address.routes.js'
import tenantRoutes from '@/routes/tenant.routes.js'
import ticketRoutes from '@/routes/ticket.routes.js'
import propertyTenantRoutes from '@/routes/propertyTenant.routes.js'
import { openApiSpec } from '@/config/swagger.js'

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Documentation with Scalar
app.use(
  '/api-docs',
  apiReference({
    spec: {
      content: openApiSpec,
    },
    theme: 'purple',
  })
)

// Serve OpenAPI spec as JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(openApiSpec)
})

// Routes
app.use('/api', agentRoutes)
app.use('/api', propertyRoutes)
app.use('/api', addressRoutes)
app.use('/api', tenantRoutes)
app.use('/api', ticketRoutes)
app.use('/api', propertyTenantRoutes)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

export default app
