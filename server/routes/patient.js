import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Patient } from '../models/patient';

const router = express.Router();

router.post('/signin', async (req, res) => {
  try {
    const Patient = await Patient.findOne({ emailadress: req.body.username });

    if (Patient && await bcrypt.compare(req.body.Password, Patient.Password)) {
      const my_jwt_secret = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: user._id }, my_jwt_secret,{expiresIn: "20d"});
      return res.status(201).json({ token, Patient});
    }

    res.status(409).json({ error: "Invalid username or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const existingUsername = await Doctor.findOne({ Username: req.body.Username });
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already exists' });
    }   

    req.body.Password = req.body.ConfirmPassword = await bcrypt.hash(req.body.Password, 10);

    const Patient = new Patient(req.body);
    await Patient.save();
    res.status(201).json(Patient);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;