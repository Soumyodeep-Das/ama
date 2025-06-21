const Question = require('../models/Question');
const mongoose = require('mongoose');
jest.mock('../models/Question');

describe('Question Model (Mocked) Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should mock find', async () => {
    Question.find.mockResolvedValue([{ question: 'Mocked?', answer: 'Yes!' }]);
    const result = await Question.find();
    expect(result).toEqual([{ question: 'Mocked?', answer: 'Yes!' }]);
    expect(Question.find).toHaveBeenCalled();
  });

  it('should mock create failure', async () => {
    Question.create.mockRejectedValue(new Error('Mocked create error'));
    await expect(Question.create({ question: 'fail' })).rejects.toThrow('Mocked create error');
  });
});
