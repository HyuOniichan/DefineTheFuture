import type { Application, Request, Response } from "express";
import userRoute from './userRoute';
import goalRoute from './goalRoute';

const BASE_URL = '/api/v1';

function route(app: Application) {
    // Check health
    app.use(`${BASE_URL}/health`, async (req: Request, res: Response) => {
        try {
            res.status(200).json({ message: "Server is running" });
        } catch (err) {
            res.status(500).json({ message: "Unknown error" });
        }
    })

    app.use(`${BASE_URL}/user`, userRoute);
    app.use(`${BASE_URL}/goal`, goalRoute);
}

export default route;
