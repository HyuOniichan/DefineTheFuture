import dotenv from 'dotenv';
import express, { type Application } from 'express';
import cors from 'cors';

import route from './routes';

// Init
dotenv.config({ path: '../.env' });
const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
route(app);

// Server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

export default app;
