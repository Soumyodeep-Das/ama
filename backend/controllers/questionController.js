const Question = require('../models/Question');

// POST /questions
exports.postQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const newQ = await Question.create({ question });
    res.status(201).json(newQ);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post question.' });
  }
};

// GET /questions
exports.getAllQuestions = async (req, res) => {
  try {
    const allQ = await Question.find().sort({ createdAt: -1 });
    res.json(allQ);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions.' });
  }
};

// PUT /questions/:id/answer
exports.answerQuestion = async (req, res) => {
  try {
    const { answer } = req.body;
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { answer },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to answer question.' });
  }
};

// DELETE /questions/:id
exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete question.' });
  }
};

// GET /stats
exports.getStats = async (req, res) => {
  try {
    const total = await Question.countDocuments();
    const answered = await Question.countDocuments({ answer: { $ne: '' } });
    const unanswered = total - answered;

    res.json({ total, answered, unanswered });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats.' });
  }
};
