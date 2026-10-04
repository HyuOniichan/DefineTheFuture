import { pool } from "../config/db";
import type { GetUserType } from "../schemas";

export const UserModel = {
    getAllUsers: async (): Promise<GetUserType[] | null> => {
        try {
            const sql = `
                select u.username, u.display_name, u.role, s.long_term_goal, s.short_term_goal, s.max_active_goals, 
                    s.max_workpackages_per_day, s.max_work_minutes_per_day, s.report_interval
                from users u
                    join settings s on u.setting_id = s.setting_id
            `;
            const result = await pool.query(sql);
            return result.rows || null;
        } catch (error: any) {
            throw new Error(error?.message || String(error));
        }
    },
    getUserById: async (user_id: string): Promise<GetUserType | null> => {
        try {
            const sql = `
                select u.username, u.display_name, u.role, s.long_term_goal, s.short_term_goal, s.max_active_goals, 
                    s.max_workpackages_per_day, s.max_work_minutes_per_day, s.report_interval
                from users u
                    join settings s on u.setting_id = s.setting_id
                where u.user_id = $1
            `;
            const values = [user_id];
            const result = await pool.query(sql, values);
            return result.rows[0] || null;
        } catch (error: any) {
            throw new Error(error?.message || String(error));
        }
    },
};
