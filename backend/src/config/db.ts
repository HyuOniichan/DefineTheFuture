import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("connect", () => {
    console.log("PostgreSQL Pool connected");
});
