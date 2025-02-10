import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/Auth.route.js';
import Protectedroutes from './routes/Protected.routes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());

// CORS
const corsOptions = {
    origin: 'http://localhost:5173'
};
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api', Protectedroutes);

app.get("/", (req, res) => {
    res.send("working...");
  });

app.listen(PORT, () => {
    connectDB();
    console.log('Server running on http://localhost:'+PORT);
});
