import type { Request, Response } from "express"
import { GoalModel } from "../models/goalModel";
import type {
    GetGoalParamsType,
    GetGoalType, CreateGoalBodyType,
    EditGoalBodyType,
    EditGoalParamsType,
} from "../schemas";
import type { ResponseType } from "../types";

export const GoalController = {
    // [GET] /goal
    getGoals: async (
        req: Request,
        res: Response<ResponseType<GetGoalType[]>>
    ): Promise<void> => {
        try {
            const user_id = req.user?.user_id || "";
            const goals = await GoalModel.getAllGoals(user_id);

            if (!goals) {
                res.status(404).json({ status: "failed", message: "goals not found" });
                return;
            }

            res.status(200).json({ status: "success", data: goals });

        } catch (err: any) {
            res.status(500).json({ status: "error", message: err?.message || String(err) });
        }
    },

    // [GET] /goal/:id
    getGoal: async (
        req: Request<GetGoalParamsType>,
        res: Response<ResponseType<GetGoalType>>
    ): Promise<void> => {
        try {
            const user_id = req.user?.user_id || "";

            const goal_id = req.params.id;
            if (!goal_id) {
                res.status(400).json({ status: "failed", message: "goal's id is not provided" });
                return;
            }

            const goal = await GoalModel.getGoalById(user_id, goal_id);
            if (!goal) {
                res.status(404).json({ status: "failed", message: "goal not found" });
                return;
            }

            res.status(200).json({ status: "success", data: goal });

        } catch (err: any) {
            res.status(500).json({ status: "error", message: err?.message || String(err) });
        }
    },

    // [POST] /goal
    postGoal: async (
        req: Request<any, ResponseType<GetGoalType>, CreateGoalBodyType>,
        res: Response<ResponseType<GetGoalType>>
    ): Promise<void> => {
        try {
            const user_id = req.user?.user_id || "";
            const newGoal = req.body;

            const createdGoal = await GoalModel.createGoal(user_id, newGoal);
            if (!createdGoal) {
                res.status(500).json({ status: "failed", message: "Failed to create new goal" });
                return;
            }

            res.status(201).json({ status: "success", data: createdGoal });

        } catch (err: any) {
            res.status(500).json({ status: "error", message: err?.message || String(err) });
        }
    },

    // [PUT] /goal/:id
    putGoal: async (
        req: Request<EditGoalParamsType, ResponseType<GetGoalType>, EditGoalBodyType>,
        res: Response<ResponseType<GetGoalType>>
    ): Promise<void> => {
        try {
            const user_id = req.user?.user_id || "";
            const goal_id = req.params.id;
            const editedGoal = req.body;

            const updatedGoal = await GoalModel.updateGoal(user_id, goal_id, editedGoal);

            if (!updatedGoal) {
                res.status(500).json({ status: "failed", message: "Failed to update goal" });
                return;
            }

            res.status(201).json({ status: "success", data: updatedGoal });

        } catch (err: any) {
            res.status(500).json({ status: "error", message: err?.message || String(err) });
        }
    }
}
