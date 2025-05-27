import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

async function startServer() {
  try {
    
    await mongoose.connect(`${process.env.MONGODB_URI}/user_info`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const app = express();
    const port = process.env.PORT;

   
    app.use(cors({ 
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }));

   
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    
    app.use('/', userRoutes);

    process.on('unhandledRejection', (error) => {
      console.error('Unhandled Rejection:', error);
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
    });

   
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

startServer();
