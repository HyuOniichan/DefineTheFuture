import dotenv from 'dotenv';
import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import route from './routes';

// Init
dotenv.config({ path: '../.env' });
const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middlewares
const allowedOrigins = [
    process.env.FRONTEND_URL
]
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true)
            else callback(new Error('Not allowed by CORS'), false)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
route(app);

// Server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

export default app;
