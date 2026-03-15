import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
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
            firstName: {
              type: 'string',
              description: 'First name of the agent',
            },
            lastName: {
              type: 'string',
              description: 'Last name of the agent',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the agent',
            },
            mobileNumber: {
              type: 'string',
              description: 'Mobile phone number of the agent',
            },
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
            firstName: {
              type: 'string',
              description: 'First name of the agent',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name of the agent',
              example: 'Doe',
            },
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
            firstName: {
              type: 'string',
              description: 'First name of the agent',
            },
            lastName: {
              type: 'string',
              description: 'Last name of the agent',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the agent',
            },
            mobileNumber: {
              type: 'string',
              description: 'Mobile phone number of the agent',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
