// src/index.ts
import express, { Express } from 'express';
import { connectDB } from './config/dbConfig'; // Assuming dbConfig.ts handles DB connection
import songRouter from './routes/songRouter';
import userRouter from './routes/userRouter'
import dotenv from "dotenv";
dotenv.config();

async function startServer() {
  const app: Express = express();
  const port = process.env.PORT || 3000;
  try {
    await connectDB(); // Connect to the database
    console.log('Database connected successfully');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(userRouter);
    app.use('/api', songRouter);

    app.listen(3000, () => {
      console.log('Server started on port',port);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
