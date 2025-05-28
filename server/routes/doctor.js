import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  Doctor  from '../models/doctor.js';
import Patient from '../models/patient.js';
import {WebSocketServer} from "ws";
import http from "http";
import * as url from "node:url";


const router = express.Router();
const alldoctors = new Map();

const wt = new WebSocketServer({port: 8080});
wt.on('connection', (socket, req) => {
  const parameters = new URLSearchParams(url.parse(req.url).query);
  const doctorUsername = parameters.get('doctorUsername');
  if (!doctorUsername) {
    socket.close(4000, 'No doctor username provided');
    return;
  }
  alldoctors.set(doctorUsername, socket);
  socket.on('close', () => {
    console.log(`Doctor disconnected: ${doctorUsername}`);
    alldoctors.delete(doctorUsername);
  });
})

router.get('/request/', async (req, res) => {
  try {
    const doctorUsername = req.query.docuser;
    const patientUsername = req.query.username;

    const doctor = await Doctor.findOne({ username: doctorUsername });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    if (doctor.status === 'inactive') {
      return res.status(409).json({ error: 'Doctor is already active' });
    }

    const doctorSocket = alldoctors.get(doctorUsername);

    if (!doctorSocket) {
      return res.status(404).json({ error: 'Doctor or patient not connected' });
    }

    const patient = await Patient.findOne({ username: patientUsername });

    // Send the request to the doctor
    doctorSocket.send(JSON.stringify({
      type: 'request',
      patient: {
        username: patient.username,
        name: patient.name,
      }
    }));

    // Wait for doctor's response
    const data = await new Promise((resolve, reject) => {
      doctorSocket.once('message', (msg) => {
        try {
          const parsed = JSON.parse(msg);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });

      // Optional timeout (e.g., 15 seconds)
      setTimeout(() => {
        reject(new Error('Doctor did not respond in time'));
      }, 60000);
    });

    // Forward response to patient

    // Respond to frontend
    return res.status(200).json({ accepted: data.accept });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
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