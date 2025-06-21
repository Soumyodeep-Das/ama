const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Question = require('../models/Question');

describe('Question API Integration Tests', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    await Question.deleteMany({});
    await Question.create({
      question: 'Sample Question?',
      answer: 'This is a sample answer for integration testing.'
    });
  });

  it('should respond to GET /api/questions', async () => {
    const res = await request(app).get('/api/questions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  }, 20000);

  it('should create a new question (POST)', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({ question: 'Integration POST?', answer: 'Yes!' });
    expect(res.statusCode).toBe(201);
    expect(res.body.question).toBe('Integration POST?');
  }, 20000);

  it('should update a question (PUT)', async () => {
    const q = await Question.create({ question: 'To be updated?', answer: 'Old' });
    const res = await request(app)
      .put(`/api/questions/${q._id}`)
      .send({ answer: 'Updated!' });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe('Updated!');
  }, 20000);

  it('should delete a question (DELETE)', async () => {
    const q = await Question.create({ question: 'To be deleted?', answer: 'Bye' });
    const res = await request(app)
      .delete(`/api/questions/${q._id}`);
    expect(res.statusCode).toBe(204);
  }, 20000);

  it('should return 404 for non-existent question (GET)', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).get(`/api/questions/${fakeId}`);
    expect(res.statusCode).toBe(404);
  }, 20000);

  it('should return 400 for invalid POST', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({});
    expect(res.statusCode).toBe(400);
  }, 20000);
}
);

afterAll(async () => {
  await mongoose.connection.close();
});
