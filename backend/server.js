import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/Auth.route.js';
import profileRoutes from './routes/Profile.route.js'

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.get("/", (req, res) => {
    res.send("working...");
  });

app.listen(PORT, () => {
    connectDB();
    console.log('Server running on http://localhost:'+PORT);
});
