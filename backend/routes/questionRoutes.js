const express = require('express');
const router = express.Router();
const {
  postQuestion,
  getAllQuestions,
  answerQuestion,
  deleteQuestion,
  getStats,
} = require('../controllers/questionController');

router.post('/questions', postQuestion);
router.get('/questions', getAllQuestions);
router.put('/questions/:id/answer', answerQuestion);
router.delete('/questions/:id', deleteQuestion);
router.get('/stats', getStats);

module.exports = router;
