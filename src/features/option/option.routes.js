import express from 'express';
import { createOption, deleteOption, getOptionById, getOptions, updateOption } from './option.controller.js';

const router = express.Router();

router.post('/api/v1/options', createOption);
router.get('/api/v1/options', getOptions);
router.get('/api/v1/options/:id', getOptionById);
router.put('/api/v1/options/:id', updateOption);
router.delete('/api/v1/options/:id', deleteOption);

export default router;