export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Property Agent Management API',
    version: '1.0.0',
    description: 'A simple REST API for managing property agents',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  paths: {
    '/agents': {
      get: {
        summary: 'Get all property agents',
        tags: ['Agents'],
        responses: {
          '200': {
            description: 'List of all agents',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/PropertyAgent' },
                },
              },
            },
          },
          '500': { description: 'Internal server error' },
        },
      },
      post: {
        summary: 'Create a new property agent',
        tags: ['Agents'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreatePropertyAgent' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Agent created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PropertyAgent' },
              },
            },
          },
          '400': {
            description: 'Invalid input',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': { description: 'Internal server error' },
        },
      },
    },
    '/agents/{id}': {
      get: {
        summary: 'Get a property agent by ID',
        tags: ['Agents'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Agent ID',
          },
        ],
        responses: {
          '200': {
            description: 'Agent found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PropertyAgent' },
              },
            },
          },
          '404': {
            description: 'Agent not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': { description: 'Internal server error' },
        },
      },
      put: {
        summary: 'Update a property agent',
        tags: ['Agents'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Agent ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdatePropertyAgent' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Agent updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PropertyAgent' },
              },
            },
          },
          '400': {
            description: 'Invalid input',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '404': {
            description: 'Agent not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': { description: 'Internal server error' },
        },
      },
      delete: {
        summary: 'Delete a property agent',
        tags: ['Agents'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Agent ID',
          },
        ],
        responses: {
          '204': { description: 'Agent deleted successfully' },
          '404': {
            description: 'Agent not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': { description: 'Internal server error' },
        },
      },
    },
  },
  components: {
    schemas: {
      PropertyAgent: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Unique identifier for the agent',
          },
          firstName: { type: 'string', description: 'First name of the agent' },
          lastName: { type: 'string', description: 'Last name of the agent' },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address of the agent',
          },
          mobileNumber: { type: 'string', description: 'Mobile phone number of the agent' },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the agent was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the agent was last updated',
          },
        },
      },
      CreatePropertyAgent: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'mobileNumber'],
        properties: {
          firstName: { type: 'string', description: 'First name of the agent', example: 'John' },
          lastName: { type: 'string', description: 'Last name of the agent', example: 'Doe' },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address of the agent',
            example: 'john.doe@example.com',
          },
          mobileNumber: {
            type: 'string',
            description: 'Mobile phone number of the agent',
            example: '09123456789',
          },
        },
      },
      UpdatePropertyAgent: {
        type: 'object',
        properties: {
          firstName: { type: 'string', description: 'First name of the agent' },
          lastName: { type: 'string', description: 'Last name of the agent' },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address of the agent',
          },
          mobileNumber: { type: 'string', description: 'Mobile phone number of the agent' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', description: 'Error message' },
        },
      },
    },
  },
}
