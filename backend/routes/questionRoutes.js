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
router.get('/questions/:id', require('../controllers/questionController').getQuestionById);
router.put('/questions/:id', require('../controllers/questionController').updateQuestion);
router.put('/questions/:id/answer', answerQuestion);
router.delete('/questions/:id', deleteQuestion);
router.get('/stats', getStats);

module.exports = router;
