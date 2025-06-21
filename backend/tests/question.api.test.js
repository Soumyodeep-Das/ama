const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Question = require('../models/Question');

describe('Question API Endpoint Tests', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    await Question.deleteMany({});
    await Question.create({
      question: 'Sample Question?',
      answer: 'This is a sample answer for API testing.'
    });
  });

  it('should return 200 OK for GET /api/questions', async () => {
    const res = await request(app).get('/api/questions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  }, 20000);

  it('should create a question via POST', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({ question: 'API POST?', answer: 'Yes!' });
    expect(res.statusCode).toBe(201);
    expect(res.body.question).toBe('API POST?');
  }, 20000);

  it('should update a question via PUT', async () => {
    const q = await Question.create({ question: 'API update?', answer: 'Old' });
    const res = await request(app)
      .put(`/api/questions/${q._id}`)
      .send({ answer: 'Updated!' });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe('Updated!');
  }, 20000);

  it('should delete a question via DELETE', async () => {
    const q = await Question.create({ question: 'API delete?', answer: 'Bye' });
    const res = await request(app)
      .delete(`/api/questions/${q._id}`);
    expect(res.statusCode).toBe(204);
  }, 20000);

  it('should return 404 for GET non-existent question', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).get(`/api/questions/${fakeId}`);
    expect(res.statusCode).toBe(404);
  }, 20000);

  it('should return 400 for POST with missing data', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({});
    expect(res.statusCode).toBe(400);
  }, 20000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
