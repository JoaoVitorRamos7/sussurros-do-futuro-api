import express from 'express';
import { createQuestion, deleteQuestion, getQuestionById, getQuestions, updateQuestion } from './question.controller.js';

const router = express.Router();

router.post('/api/v1/questions', createQuestion);
router.get('/api/v1/questions', getQuestions);
router.get('/api/v1/questions/:id', getQuestionById);
router.put('/api/v1/questions/:id', updateQuestion);
router.delete('/api/v1/questions/:id', deleteQuestion);

export default router;