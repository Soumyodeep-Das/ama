const Question = require('../models/Question');

// GET /questions/:id
exports.getQuestionById = async (req, res, next) => {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ error: 'Question not found.' });
    res.json(q);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid question ID.' });
    }
    next(err);
  }
};

// PUT /questions/:id
exports.updateQuestion = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid question ID.' });
    }
    next(err);
  }
};

// POST /questions
exports.postQuestion = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }
    const newQ = await Question.create({ question, answer });
    res.status(201).json(newQ);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// GET /questions
exports.getAllQuestions = async (req, res, next) => {
  try {
    const allQ = await Question.find().sort({ createdAt: -1 });
    res.json(allQ);
  } catch (err) {
    next(err);
  }
};

// PUT /questions/:id/answer
exports.answerQuestion = async (req, res, next) => {
  try {
    const { answer } = req.body;
    if (!answer) {
      return res.status(400).json({ error: 'Answer is required.' });
    }
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { answer },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json(updated);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid question ID.' });
    }
    next(err);
  }
};

// DELETE /questions/:id
exports.deleteQuestion = async (req, res, next) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid question ID.' });
    }
    next(err);
  }
};

// GET /stats
exports.getStats = async (req, res, next) => {
  try {
    const total = await Question.countDocuments();
    const answered = await Question.countDocuments({ answer: { $ne: '' } });
    const unanswered = total - answered;
    res.json({ total, answered, unanswered });
  } catch (err) {
    next(err);
  }
};
