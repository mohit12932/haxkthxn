import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Doctor } from '../models/doctor';

const router = express.Router();

router.post('/signin', async (req, res) => {
  try {
    const Doctor = await Doctor.findOne({ username: req.body.username });

    if (Doctor && await bcrypt.compare(req.body.password, Doctor.password)) {
      const my_jwt_secret = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: user._id }, my_jwt_secret,{expiresIn: "20d"});
      return res.status(201).json({ token, Doctor});
    }

    res.status(409).json({ error: "Invalid username or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const existingpdoctor = await Doctor.findOne({ Username: req.body.Username });
    
    if (existingpdoctor) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    

    req.body.password = req.body.ConfirmPassword = await bcrypt.hash(req.body.password, 10);

    const Doctor = new Doctor(req.body);
    await Doctor.save();
    res.status(201).json(Doctor);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;