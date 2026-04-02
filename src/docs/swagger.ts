import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from '../config/env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PathPoint API',
      version: '1.0.0',
      description: 'Authentication and user management API for PathPoint application'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT access token'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
          description: 'JWT refresh token stored in HTTP-only cookie'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 25,
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              example: 'user'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message description'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 25,
              example: 'John Doe',
              description: 'User full name'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
              description: 'User email address'
            },
            password: {
              type: 'string',
              minLength: 6,
              maxLength: 64,
              example: 'password123',
              description: 'User password'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
              description: 'User email address'
            },
            password: {
              type: 'string',
              example: 'password123',
              description: 'User password'
            }
          }
        },
        RefreshTokenRequest: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: 'JWT refresh token'
            }
          }
        },
        Resume: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            userId: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            title: {
              type: 'string',
              example: 'My CV.pdf'
            },
            url: {
              type: 'string',
              format: 'uri',
              example: 'https://res.cloudinary.com/.../resumes/abc123.pdf'
            },
            publicId: {
              type: 'string',
              example: 'resumes/abc123'
            },
            fileName: {
              type: 'string',
              example: 'My CV.pdf'
            },
            fileSize: {
              type: 'number',
              example: 1024567
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Profile: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            userId: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            profileType: {
              type: 'string',
              enum: ['user', 'hr'],
              example: 'user'
            },
            bio: {
              type: 'string',
              maxLength: 500,
              example: 'Software developer with 5 years experience'
            },
            location: {
              type: 'string',
              example: 'Cairo, Egypt'
            },
            avatar: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  format: 'uri'
                },
                publicId: {
                  type: 'string'
                }
              }
            },
            social: {
              type: 'object',
              properties: {
                youtube: { type: 'string' },
                twitter: { type: 'string' },
                facebook: { type: 'string' },
                linkedin: { type: 'string' },
                instagram: { type: 'string' },
                github: { type: 'string' },
                website: { type: 'string' }
              }
            },
            isOwner: {
              type: 'boolean',
              description: 'True if the requesting user owns this profile'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        HRProfile: {
          allOf: [
            { $ref: '#/components/schemas/Profile' },
            {
              type: 'object',
              properties: {
                profileType: {
                  type: 'string',
                  enum: ['hr']
                },
                companyName: {
                  type: 'string',
                  example: 'Tech Corp'
                },
                companyWebsite: {
                  type: 'string',
                  format: 'uri'
                },
                companySize: {
                  type: 'string',
                  example: '50-200 employees'
                },
                industry: {
                  type: 'string',
                  example: 'Information Technology'
                },
                companyDescription: {
                  type: 'string'
                },
                resume: {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      format: 'uri'
                    },
                    publicId: {
                      type: 'string'
                    }
                  }
                },
                averageRating: {
                  type: 'number',
                  example: 4.5
                },
                totalRatings: {
                  type: 'number',
                  example: 12
                }
              }
            }
          ]
        },
        Rating: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            userId: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            targetType: {
              type: 'string',
              enum: ['hr', 'user', 'course'],
              example: 'hr'
            },
            targetId: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              example: 4
            },
            comment: {
              type: 'string',
              maxLength: 500,
              example: 'Great HR professional!'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        VerifyCodeRequest: {
          type: 'object',
          required: ['email', 'code'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
              description: 'User email address'
            },
            code: {
              type: 'string',
              example: '12345',
              description: 'Reset password verification code'
            }
          }
        },
        UpdatePasswordRequest: {
          type: 'object',
          required: ['email', 'code', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
              description: 'User email address'
            },
            code: {
              type: 'string',
              example: '123456',
              description: 'Password update verification code'
            },
            password: {
              type: 'string',
              minLength: 6,
              maxLength: 64,
              example: 'newpassword123',
              description: 'New user password'
            }
          }
        }
      },
      tags: [
        {
          name: 'Authentication',
          description: 'User authentication and authorization endpoints'
        },
        {
          name: 'Payments',
          description: 'Payment processing with Paymob integration'
        },
        {
          name: 'HR',
          description: 'HR profiles and booking endpoints'
        }
      ]
    }
  },
  apis: [
    './src/modules/auth/*.ts', 
    './src/modules/auth/*.js',
    './src/docs/*.ts',
    './src/docs/*.js'
  ]
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
