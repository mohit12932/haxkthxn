import express from 'express';
import doctorRoutes from './doctor.js';
import patientRoutes from './patient.js';

const router = express.Router();

router.get('/', (req, res) => {res.render('video')})
router.use('/doctor',doctorRoutes);
router.use('/patient', patientRoutes);
export default router;