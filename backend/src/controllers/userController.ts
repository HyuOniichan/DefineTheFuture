import type { Request, Response } from "express"
import { UserModel } from "../models/userModel"

export const UserController = {
    // [GET] /user
    getUsers: async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await UserModel.getAllUsers();

            if (!users) {
                res.status(404).json({ status: "failed", message: "users not found" });
                return;
            }

            res.status(200).json({ status: "success", data: users });

        } catch (err: any) {
            res.status(500).json({ status: "error", message: err?.message || String(err) });
        }
    },

    // [GET] /user/:id
    getUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const user_id = req.params.id as string;

            if (!user_id) {
                res.status(400).json({ status: "failed", message: "user's id is not provided" });
                return;
            }

            const user = await UserModel.getUserById(user_id);

            if (!user) {
                res.status(404).json({ status: "failed", message: "user not found" });
                return;
            }

            res.status(200).json({ status: "success", data: user });

        } catch (err: any) {
            res.status(500).json({ status: "error", message: err?.message || String(err) });
        }
    },
}
