const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Question = require('../models/Question');

jest.mock('../models/Question');

describe('Question Controller Edge Cases', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    console.error.mockRestore();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('answerQuestion', () => {
    it('should return 400 if answer is missing', async () => {
      const res = await request(app)
        .put('/api/questions/123456789012345678901234/answer')
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Answer is required/);
    });

    it('should return 404 if question not found', async () => {
      Question.findByIdAndUpdate.mockResolvedValue(null);
      const res = await request(app)
        .put('/api/questions/123456789012345678901234/answer')
        .send({ answer: 'New answer' });
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/);
    });

    it('should return 400 for invalid ID', async () => {
      Question.findByIdAndUpdate.mockImplementation(() => { throw { name: 'CastError' }; });
      const res = await request(app)
        .put('/api/questions/invalidid/answer')
        .send({ answer: 'Test' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Invalid question ID/);
    });
  });

  describe('updateQuestion', () => {
    it('should return 400 for validation error', async () => {
      Question.findByIdAndUpdate.mockImplementation(() => { throw { name: 'ValidationError', message: 'Invalid' }; });
      const res = await request(app)
        .put('/api/questions/123456789012345678901234')
        .send({ question: '' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Invalid/);
    });
    it('should return 400 for cast error', async () => {
      Question.findByIdAndUpdate.mockImplementation(() => { throw { name: 'CastError' }; });
      const res = await request(app)
        .put('/api/questions/invalidid')
        .send({ question: 'Q', answer: 'A' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Invalid question ID/);
    });
  });

  describe('deleteQuestion', () => {
    it('should return 400 for cast error', async () => {
      Question.findByIdAndDelete.mockImplementation(() => { throw { name: 'CastError' }; });
      const res = await request(app)
        .delete('/api/questions/invalidid');
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Invalid question ID/);
    });
  });

  describe('getStats', () => {
    it('should return stats object', async () => {
      Question.countDocuments.mockImplementation((filter) => {
        if (!filter) return Promise.resolve(5);
        if (filter && filter.answer && filter.answer.$ne === '') return Promise.resolve(3);
        return Promise.resolve(0);
      });
      const res = await request(app).get('/api/stats');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ total: 5, answered: 3, unanswered: 2 });
    });
    it('should handle error', async () => {
      Question.countDocuments.mockRejectedValue(new Error('DB error'));
      const res = await request(app).get('/api/stats');
      expect(res.statusCode).toBe(500);
    });
  });
});

// Additional tests to cover error branches in controller

describe('Controller error/catch branches', () => {
  it('getQuestionById should return 400 for CastError', async () => {
    Question.findById.mockImplementation(() => { throw { name: 'CastError' }; });
    const res = await request(app).get('/api/questions/invalidid');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid question ID/);
  });
  it('getQuestionById should return 500 for generic error', async () => {
    Question.findById.mockImplementation(() => { throw new Error('Other error'); });
    const res = await request(app).get('/api/questions/507f1f77bcf86cd799439011');
    expect(res.statusCode).toBe(500);
  });
  it('postQuestion should return 400 for validation error', async () => {
    Question.create.mockImplementation(() => { throw { name: 'ValidationError', message: 'Bad' }; });
    const res = await request(app).post('/api/questions').send({ question: 'foo' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Bad/);
  });
  it('postQuestion should return 500 for generic error', async () => {
    Question.create.mockImplementation(() => { throw new Error('Other error'); });
    const res = await request(app).post('/api/questions').send({ question: 'foo' });
    expect(res.statusCode).toBe(500);
  });
  it('getAllQuestions should return 500 for error', async () => {
    Question.find.mockImplementation(() => { throw new Error('Other error'); });
    const res = await request(app).get('/api/questions');
    expect(res.statusCode).toBe(500);
  });
  it('answerQuestion should return 500 for generic error', async () => {
    Question.findByIdAndUpdate.mockImplementation(() => { throw new Error('Other error'); });
    const res = await request(app).put('/api/questions/507f1f77bcf86cd799439011/answer').send({ answer: 'A' });
    expect(res.statusCode).toBe(500);
  });
  it('updateQuestion should return 500 for generic error', async () => {
    Question.findByIdAndUpdate.mockImplementation(() => { throw new Error('Other error'); });
    const res = await request(app).put('/api/questions/507f1f77bcf86cd799439011').send({ question: 'Q', answer: 'A' });
    expect(res.statusCode).toBe(500);
  });
  it('deleteQuestion should return 500 for generic error', async () => {
    Question.findByIdAndDelete.mockImplementation(() => { throw new Error('Other error'); });
    const res = await request(app).delete('/api/questions/507f1f77bcf86cd799439011');
    expect(res.statusCode).toBe(500);
  });
});
