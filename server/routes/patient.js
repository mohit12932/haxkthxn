import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient  from '../models/patient.js';
import  Doctor  from '../models/doctor.js'; 

const router = express.Router();

router.post('/signin', async (req, res) => {
  try {
    const patient = await Patient.findOne({ username: req.body.username });

    if (patient && await bcrypt.compare(req.body.Password, patient.password)) {
      const my_jwt_secret = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: patient._id }, my_jwt_secret,{expiresIn: "20d"});
      return res.status(201).json({ token, patient});
    }

    res.status(409).json({ error: "Invalid username or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const existingUsername = await Patient.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already exists' });
    }   

    req.body.password  = await bcrypt.hash(req.body.password, 10);

    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/searchactive', async (req, res) => {
  try {
    const activeDoctors = await Doctor.find({status: 'Active'});
    res.status(200).json(activeDoctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});




export default router;