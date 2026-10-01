import type { Request, Response } from "express"
import { GoalModel } from "../models/goalModel";
import type { 
    GoalType, 
    GetGoalParamsType, GetGoalsQueryType, 
    GetGoalReturnType, CreateGoalBodyType, 
    EditGoalBodyType,
    EditGoalParamsType,
} from "../schemas";
import type { ResponseType } from "../types";

export const GoalController = {
    // [GET] /goal
    getGoals: async (
        req: Request<any, ResponseType<GetGoalReturnType[]>, any, GetGoalsQueryType>,
        res: Response<ResponseType<GetGoalReturnType[]>>
    ): Promise<void> => {
        try {
            const user_id = req.query?.user_id || "";
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
        res: Response<ResponseType<GetGoalReturnType>>
    ): Promise<void> => {
        try {
            const goal_id = req.params.id;

            if (!goal_id) {
                res.status(400).json({ status: "failed", message: "goal's id is not provided" });
                return;
            }

            const goal = await GoalModel.getGoalById(goal_id);

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
        req: Request<any, ResponseType<GoalType>, CreateGoalBodyType>, 
        res: Response<ResponseType<GoalType>>
    ): Promise<void> => {
        try {
            const newGoal = req.body;
            const createdGoal = await GoalModel.createGoal(newGoal);

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
        req: Request<EditGoalParamsType, ResponseType<GoalType>, EditGoalBodyType>, 
        res: Response<ResponseType<GoalType>>
    ): Promise<void> => {
        try {
            const goal_id = req.params.id;
            const editedGoal = req.body;

            const updatedGoal = await GoalModel.updateGoal(goal_id, editedGoal);

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
