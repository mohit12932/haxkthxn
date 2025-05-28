import express from 'express';
import videostream from './videostream.js'
const router = express.Router();

// Define API routes here
router.use('/videostream',videostream)

export default router;