import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  Doctor  from '../models/doctor.js';

const router = express.Router();

router.post('/signin', async (req, res) => {
  try {
      console.log(req.body);

    const doctor = await Doctor.findOne({ username: req.body.username });

    if (doctor && await bcrypt.compare(req.body.Password, doctor.password)) {
      const my_jwt_secret = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: doctor._id }, my_jwt_secret,{expiresIn: "20d"});
      return res.status(201).json({ token, doctor});
    }

    res.status(409).json({ error: "Invalid username or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const existingpdoctor = await Doctor.findOne({ Username: req.body.username });
    
    if (existingpdoctor) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;