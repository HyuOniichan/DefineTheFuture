import type { Request, Response } from "express"
import type { AuthLoginBodyType, AuthRegisterBodyType, CreateUserBodyType, GetAuthUserType, GetUserType, UserType } from "../schemas";
import type { ResponseType } from "../types";
import { generateToken, hashPassword, matchPassword, verifyToken } from "../utils";
import { AuthModel } from "../models/authModel";
import { UserModel } from "../models/userModel";
import { JWT_TOKEN_COOKIE_MAX_AGE, ACCESS_TOKEN_EXPIRES_IN, COOKIE_OPTIONS } from "../config/tokens";

export const AuthController = {
    // [GET] /me
    getCurrentUser: async (
        req: Request,
        res: Response<ResponseType<GetUserType>>
    ): Promise<void> => {
        try {
            if (!req.user || !req.user.user_id) {
                res.status(400).json({ status: "failed", message: "user's id is not provided" });
                return;
            }

            const user = await UserModel.getUserById(req.user.user_id);

            if (!user) {
                res.status(404).json({ status: "failed", message: "user not found" });
                return;
            }

            res.status(200).json({ status: "success", data: user });

        } catch (error: any) {
            res.status(500).json({ status: "error", message: error?.message || String(error) });
        }
    },

    // [POST] /register
    postRegister: async (
        req: Request<any, ResponseType<GetAuthUserType>, AuthRegisterBodyType>,
        res: Response<ResponseType<GetAuthUserType>>
    ): Promise<void> => {
        try {
            const { password, ...newUserConfig } = req.body;
            const hashedPassword = await hashPassword(password);

            const newUser: CreateUserBodyType = {
                ...newUserConfig,
                password_hash: hashedPassword,
            };

            const createdUser = await AuthModel.createUser(newUser);

            if (!createdUser) {
                res.status(500).json({ status: "failed", message: "Failed to create new user (register)" });
                return;
            }

            res.status(201).json({ status: "success", data: createdUser });

        } catch (error: any) {
            res.status(500).json({ status: "error", message: error?.message || String(error) });
        }
    },

    // [POST] /login
    postLogin: async (
        req: Request<any, ResponseType<any>, AuthLoginBodyType>,
        res: Response<ResponseType<any>>
    ): Promise<void> => {
        try {
            const { username, password } = req.body;

            const user = await AuthModel.getAuthUserByUsername(username);
            if (!user) {
                res.status(401).json({ status: "failed", message: "Failed to find user by username" });
                return;
            }

            const isPasswordMatched = await matchPassword(password, user.password_hash);
            if (!isPasswordMatched) {
                res.status(401).json({ status: "failed", message: "Wrong password" });
                return;
            }

            const userId = String(user.user_id)

            const accessToken = generateToken({ user_id: userId, role: user.role }, "access");
            res.cookie("accessToken", accessToken, { ...COOKIE_OPTIONS, maxAge: JWT_TOKEN_COOKIE_MAX_AGE });

            const refreshToken = generateToken({ user_id: userId }, "refresh");
            res.cookie("refreshToken", refreshToken, { ...COOKIE_OPTIONS, maxAge: JWT_TOKEN_COOKIE_MAX_AGE });

            AuthModel.updateAuthUserRefreshToken(userId, refreshToken);

            res.status(201).json({ status: "success", message: "Login successfully" });

        } catch (error: any) {
            res.status(500).json({ status: "error", message: error?.message || String(error) });
        }
    },

    // [POST] /logout
    postLogout: async (
        req: Request,
        res: Response<ResponseType<any>>
    ): Promise<void> => {
        try {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            res.status(201).json({ status: "success", message: "Logout successfully" });

        } catch (error: any) {
            res.status(500).json({ status: "error", message: error?.message || String(error) });
        }
    },
}
