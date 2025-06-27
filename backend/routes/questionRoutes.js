/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Created
 *
 * /questions/{id}:
 *   get:
 *     summary: Get a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         body:
 *           type: string
 */

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
