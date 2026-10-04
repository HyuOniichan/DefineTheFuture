import { pool } from "../config/db";
import type { GetGoalType } from "../schemas";
import type { CreateGoalBodyType, EditGoalBodyType } from "../schemas";

export const GoalModel = {
    getAllGoals: async (user_id: string): Promise<GetGoalType[] | null> => {
        try {
            const sql = `
                select title, description, expected_outcome, status, 
                    planned_start_date, planned_end_date, 
                    actual_start_date, actual_end_date, 
                    created_at, updated_at 
                from goals
                where user_id = $1
            `;
            const values = [user_id];
            
            const result = await pool.query(sql, values);
            return result.rows || null;

        } catch (err: any) {
            throw new Error(err?.message || String(err));
        }
    },

    getGoalById: async (user_id: string, goal_id: string): Promise<GetGoalType | null> => {
        try {
            const sql = `
                select title, description, expected_outcome, status, 
                    planned_start_date, planned_end_date, 
                    actual_start_date, actual_end_date, 
                    created_at, updated_at 
                from goals
                where user_id = $1
                    and goal_id = $2
            `;
            const values = [user_id, goal_id];

            const result = await pool.query(sql, values);
            return result.rows[0] || null;

        } catch (err: any) {
            throw new Error(err?.message || String(err));
        }
    },

    createGoal: async (user_id: string, newGoal: CreateGoalBodyType): Promise<GetGoalType | null> => {
        try {
            const sql = `
                insert into goals (
                    user_id, title, description, expected_outcome,
                    planned_start_date, planned_end_date
                ) values
                    ($1, $2, $3, $4, $5, $6)
                returning title, description, expected_outcome, status, 
                    planned_start_date, planned_end_date, 
                    actual_start_date, actual_end_date, 
                    created_at, updated_at
            `;
            const values = [
                user_id, newGoal.title, newGoal.description, newGoal.expected_outcome,
                newGoal.planned_start_date, newGoal.planned_end_date
            ];
            const result = await pool.query(sql, values);
            return result.rows[0] || null;
        } catch (err: any) {
            throw new Error(err?.message || String(err));
        }
    },

    updateGoal: async (user_id: string, goal_id: string, editedGoal: EditGoalBodyType): Promise<GetGoalType | null> => {
        try {
            const updateFields = Object.entries(editedGoal).map(
                ([k, v], i) => `${k} = $${i + 1}`
            )
            const updateFieldStr = updateFields.join(', ');
            const nextParamIndex = updateFields.length + 1;

            const sql = `
                update goals
                    set ${updateFieldStr}
                where goal_id = $${nextParamIndex}
                    and user_id = $${nextParamIndex+1}
                returning title, description, expected_outcome, status, 
                    planned_start_date, planned_end_date, 
                    actual_start_date, actual_end_date, 
                    created_at, updated_at
            `;

            const values = Object.entries(editedGoal).map(([k, v]) => v);
            values.push(goal_id);
            values.push(user_id);

            const result = await pool.query(sql, values);
            return result.rows[0] || null;
        } catch (err: any) {
            throw new Error(err?.message || String(err));
        }
    }
};
