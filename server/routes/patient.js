import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient  from '../models/patient.js';

const router = express.Router();

router.post('/signin', async (req, res) => {
  console.log(req.body);
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


export default router;