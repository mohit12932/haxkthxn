import express from 'express';
import  api from './api.js';

const router = express.Router();

router.get('/', (req, res) => {res.render('video')})
router.use('/api',api)
export default router;