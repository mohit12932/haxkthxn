import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import doctorconnection from '../server.js';


const router = express.Router();

router.get('/request', (req, res) => {
    res.send('g');
});


export default router;