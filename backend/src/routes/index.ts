import type { Application, Request, Response } from "express";

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
}

export default route;
