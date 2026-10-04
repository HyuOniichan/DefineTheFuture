import { pool } from "../config/db";
import type { CreateUserBodyType, GetAuthUserType } from "../schemas";
import { CreateSettingBodySchema } from "../schemas";
import type { ResponseType } from "../types";
import { convertIntervalObjectToString } from "../utils";

export const AuthModel = {
    getAuthUserById: async (user_id: string): Promise<GetAuthUserType | null> => {
        try {
            const sql = `
                select user_id, username, password_hash, refresh_token, role
                from users
                where user_id = $1
            `;
            const values = [user_id];
            const result = await pool.query(sql, values);
            return result.rows[0] || null;
        } catch (error: any) {
            throw new Error(error?.message || String(error));
        }
    },
    getAuthUserByUsername: async (username: string): Promise<GetAuthUserType | null> => {
        try {
            const sql = `
                select user_id, username, password_hash, refresh_token, role
                from users 
                where username = $1
            `;
            const values = [username];
            const result = await pool.query(sql, values);
            return result.rows[0] || null;
        } catch (error: any) {
            throw new Error(error?.message || String(error));
        }
    },
    createUser: async (newUser: CreateUserBodyType): Promise<GetAuthUserType | null> => {
        const client = await pool.connect();

        try {
            await client.query('begin');

            const defaultSetting = CreateSettingBodySchema.parse({});

            const settingSql = `
                insert into settings (
                    long_term_goal, short_term_goal, max_active_goals, 
                    max_workpackages_per_day, max_work_minutes_per_day, report_interval
                ) values
                    ($1, $2, $3, $4, $5, $6)
                returning setting_id;
            `;
            const settingValues = [
                defaultSetting.long_term_goal, defaultSetting.short_term_goal, defaultSetting.max_active_goals,
                defaultSetting.max_workpackages_per_day, defaultSetting.max_work_minutes_per_day, 
                convertIntervalObjectToString(defaultSetting.report_interval)
            ];

            const settingResult = await client.query(settingSql, settingValues);
            const settingId = settingResult.rows[0]?.setting_id || null;

            if (!settingId) {
                throw new Error("Failed to generate default setting");
            }

            const userSql = `
                insert into users (
                    setting_id, username, password_hash, display_name
                ) values
                    ($1, $2, $3, $4)
                returning user_id, username, password_hash, refresh_token, role;
            `;
            const userValues = [
                settingId, newUser.username, 
                newUser.password_hash, newUser.display_name
            ];

            const userResult = await client.query(userSql, userValues);

            await client.query('commit');

            return userResult.rows[0] || null;
        } catch (error: any) {
            await client.query('rollback');
            throw new Error(error?.message || String(error));
        } finally {
            client.release();
        }
    },
    updateAuthUserRefreshToken: async (user_id: string, refreshToken: string): Promise<boolean> => {
        try {
            const sql = `
                update users
                set refresh_token = $1
                where user_id = $2
            `
            const values = [refreshToken, user_id];

            const result = await pool.query(sql, values);
            
            if (result.rowCount && result.rowCount > 0) return true;
            return false;
            
        } catch (error: any) {
            throw new Error(error?.message || String(error));
        }
    }
};
