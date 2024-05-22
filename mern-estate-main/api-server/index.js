import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
});

  const __dirname = path.resolve();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.get('/health', async (req, res) => {
  const mongooseStatus = mongoose.connection.readyState;
  const message = {
    mongo_db_env: process.env.MONGO,
    mongoStatusBeforeConnecting: `Mongoose status before connecting ${mongooseStatus}`,
  }

  if (mongooseStatus === 0) {
    try{
      await mongoose.connect(process.env.MONGO);
      message.anotherTry = 'Connected to MongoDB!';
    }catch(error){
      message.anotherTry = {
        error: error.message,
        stack: error.stack
      }
    }
  }
  res.send(message);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Errorrrrrrrrrrrrr';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3007, () => {
  console.log('Server is running on port 3007!');
});
