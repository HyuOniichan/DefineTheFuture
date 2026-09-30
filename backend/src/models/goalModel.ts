import { pool } from "../config/db";
import type { GoalType } from "../types";
import type { CreateGoalType, EditGoalType } from "../types/goalType";

export const GoalModel = {
    getAllGoals: async (user_id: string = ""): Promise<GoalType[] | null> => {
        try {
            const sql = `
                select g.user_id, g.title, g.description, g.expected_outcome, g.status, 
                    g.planned_start_date, g.planned_end_date, g.actual_start_date, g.actual_end_date, 
                    g.created_at, g.updated_at 
                from goals g
                    join users u on g.user_id = u.user_id
                ${user_id && "where u.user_id = $1"}
            `;
            const values = user_id ? [user_id] : undefined;
            const result = await pool.query(sql, values);
            return result.rows || null;

        } catch (err: any) {
            throw new Error(err?.message || String(err));
        }
    },

    getGoalById: async (goal_id: string): Promise<GoalType | null> => {
        try {
            const sql = `
                select g.user_id, g.title, g.description, g.expected_outcome, g.status, 
                    g.planned_start_date, g.planned_end_date, g.actual_start_date, g.actual_end_date, 
                    g.created_at, g.updated_at 
                from goals g
                    join users u on g.user_id = u.user_id
                where g.goal_id = $1
            `;
            const values = [goal_id];
            const result = await pool.query(sql, values);
            return result.rows[0] || null;
        } catch (err: any) {
            throw new Error(err?.message || String(err));
        }
    },

    createGoal: async (newGoal: CreateGoalType): Promise<GoalType | null> => {
        try {
            const sql = `
                insert into goals (
                    user_id, title, description, expected_outcome,
                    planned_start_date, planned_end_date
                ) values ($1, $2, $3, $4, $5, $6)
                returning *
            `;
            const values = [
                newGoal.user_id, newGoal.title, newGoal.description, newGoal.expected_outcome,
                newGoal.planned_start_date, newGoal.planned_end_date
            ];
            const result = await pool.query(sql, values);
            return result.rows[0] || null;
        } catch (err: any) {
            throw new Error(err?.message || String(err));
        }
    },

    updateGoal: async (goal_id: string, editedGoal: EditGoalType): Promise<GoalType | null> => {
        try {
            const updateFields = Object.entries(editedGoal).map(
                ([k, v], i) => `${k} = $${i+1}`
            )
            const updateFieldStr = updateFields.join(', ');
            const nextParamIndex = updateFields.length + 1;

            const sql = `
                update goals
                set ${updateFieldStr}
                where goal_id = $${nextParamIndex}
                returning *
            `;
            
            const values = Object.entries(editedGoal).map(([k, v]) => v);
            values.push(goal_id);

            const result = await pool.query(sql, values);
            return result.rows[0] || null;
        } catch (err: any) {
            throw new Error(err?.message || String(err));
        }
    }
};
