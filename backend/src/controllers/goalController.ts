import type { Request, Response } from "express"
import { GoalModel } from "../models/goalModel";
import type { CreateGoalType, EditGoalType } from "../types/goalType";
import { cleanObject, generateTodayString } from "../utils";

export const GoalController = {
    // [GET] /goal
    getGoals: async (req: Request, res: Response): Promise<void> => {
        try {
            const user_id = req.body?.user_id || "";
            const goals = await GoalModel.getAllGoals(user_id);

            if (!goals) {
                res.status(404).json({ status: "failed", message: "goals not found" });
                return;
            }

            res.status(200).json({ status: "success", data: goals });

        } catch (err: any) {
            res.status(500).json({ status: "error", message: err?.message || String(err)});
        }
    },

    // [GET] /goal/:id
    getGoal: async (req: Request, res: Response): Promise<void> => {
        try {
            const goal_id = req.params.id as string;

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
    postGoal: async (req: Request, res: Response): Promise<void> => {
        try {
            const todayStr = generateTodayString();

            const {
                user_id, title, description, expected_outcome,
                planned_start_date, planned_end_date
            } = req.body;

            if (!user_id || !title) {
                res.status(400).json({ status: "failed", message: "Missing required values to create new goal" });
                return;
            }

            const newGoal: CreateGoalType = {
                user_id, title,
                description: description || "",
                expected_outcome: expected_outcome || "",
                planned_start_date: planned_start_date || todayStr,
                planned_end_date: planned_end_date || todayStr
            };

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
    putGoal: async (req: Request, res: Response): Promise<void> => {
        try {
            const goal_id = req.params.id as string;

            const { title, description, expected_outcome, status,
                planned_start_date, planned_end_date,
                actual_start_date, actual_end_date
            } = req.body;

            const editedGoal: EditGoalType = cleanObject(
                {
                    title, description, expected_outcome, status,
                    planned_start_date, planned_end_date,
                    actual_start_date, actual_end_date
                }
            )

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
