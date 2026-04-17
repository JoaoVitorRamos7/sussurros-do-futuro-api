import express from 'express';
import { getStatus } from './status.controler.js';

const router = express.Router();

router.get('/api/v1/status', getStatus);

export default router;