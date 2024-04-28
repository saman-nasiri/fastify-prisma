import { expect } from 'chai';
import request from 'supertest';
import { FastifyInstance } from 'fastify';
import createApp from '../app'; // Import your Fastify app creation function
import prisma from '../utils/prisma';

describe('Category Service', () => {
  let app: FastifyInstance;

  before(async () => {
    app = await createApp();
  });

  after(async () => {
    // Clean up any created data after tests
    await prisma.$disconnect();
  });

  describe('POST /categories', () => {
    it('should create a new category', async () => {
      const newCategoryData = {
        // Provide necessary data for creating a new category
        name: 'Test Category',
        ownerId: 1 // Provide a valid ownerId
      };

      const response = await request(app)
        .post('/categories')
        .send(newCategoryData);

      expect(response.status).to.equal(201);
      // Add more assertions to check the response body or database state if needed
    });
  });

  describe('GET /categories', () => {
    it('should get all categories', async () => {
      const response = await request(app).get('/categories');
      expect(response.status).to.equal(200);
      // Add more assertions to check the response body or database state if needed
    });
  });

  describe('PUT /categories/:categoryId', () => {
    it('should update category counter', async () => {
      const categoryId = 1; // Provide a valid categoryId
      const updateData = {
        amount: 5,
        type: 'inc'
      };

      const response = await request(app)
        .put(`/categories/${categoryId}`)
        .send(updateData);

      expect(response.status).to.equal(200);
      // Add more assertions to check the response body or database state if needed
    });
  });
});
