// index.js

import express, { json } from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/UserRoutes.js';
import jobRoutes from './routes/JobRoutes.js';
import applicationRoutes from './routes/ApplicationRoutes.js';
import cors from 'cors';
// const authRoutes = require('./routes/AuthRoutes');

import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const app = express();

// Connect Database
connectDB();

app.use(cors({
    origin: 'http://localhost:5173', // Add your frontend URL
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));

// Init Middleware
app.use(json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// In the backend/index.js file, we have imported the express module and the connectDB function from the config/db.js file. We have also imported the userRoutes and authRoutes from the routes folder. We have initialized the express app and connected to the database using the connectDB function. We have defined the routes for the user and authentication endpoints and started the server on port 5000.

