import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';  
import userRoutes from "./routes/userRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const doctorconnection = new Map();
dotenv.config();

async function startServer() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Info`);

    const port = process.env.PORT;
    const server = http.createServer(app);
    const io = new Server(server);
    app.use(cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }));

    // View engine setup
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'static')));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', userRoutes);

    process.on('unhandledRejection', (error) => {
      console.error('Unhandled Rejection:', error);
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
    });
   
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('offer', (data) => {
        socket.broadcast.emit('offer', data);
      });

      socket.on('answer', (data) => {  // Fixed concatenated string
        socket.broadcast.emit('answer', data);
      });

      socket.on('candidate', (data) => {
        socket.broadcast.emit('candidate', data);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    server.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
export default doctorconnection;
startServer();