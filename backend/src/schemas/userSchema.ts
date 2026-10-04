import * as z from 'zod';
import { 
    DateSchema,
    getCurrentTimestamp, IntervalSchema, TimestamptzSchema, 
    VARCHAR_LENGTH 
} from './shared';



// --- Constants

export const DEFAULT_DAILY_PLAN_ITEM_CREATED_BY = "system";
export const DEFAULT_DAILY_PLAN_ITEM_STATUS = "pending";
export const DEFAULT_DAILY_PLAN_STATUS = "draft";
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM || "HS256";



// --- Original schemas

export const UserRoleSchema = z.enum([
    "admin", "user"
]);
export const DailyPlanItemCreatedBySchema = z.enum([
    "system", "user"
]);
export const DailyPlanItemStatusSchema = z.enum([
    "pending", "in_progress", "completed", "skipped"
]);
export const DailyPlanStatusSchema = z.enum([
    "draft", "pending", "in_progress", "completed", "cancelled"
]);

export const UserSchema = z.object({
    user_id: z.number().int().positive(),
    setting_id: z.number().int().positive(),

    username: z.string().trim().min(1).max(VARCHAR_LENGTH),
    password_hash: z.string().trim().min(1).max(VARCHAR_LENGTH),
    refresh_token: z.jwt({ alg: JWT_ALGORITHM }),

    display_name: z.string().trim().min(1).max(VARCHAR_LENGTH),
    role: UserRoleSchema.default("user"),
});

export const SettingSchema = z.object({
    setting_id: z.number().int().positive(),
    long_term_goal: z.string().default(""),
    short_term_goal: z.string().default(""),
    max_active_goals: z.number().default(2),
    max_workpackages_per_day: z.number().default(3),
    max_work_minutes_per_day: z.number().default(120),
    report_interval: IntervalSchema.default({ days: 7 }),
});

export const NotificationSchema = z.object({
    notification_id: z.number().int().positive(),
    title: z.string().min(1).max(VARCHAR_LENGTH),
    description: z.string().default(""),
    is_read: z.boolean().default(false),
    url: z.string().nullish(),

    sent_by: z.number().int().positive().nullable().default(null),
    sent_to: z.number().int().positive(),
    sent_at: TimestamptzSchema.default(getCurrentTimestamp),
});

export const DailyPlanItemSchema = z.object({
    daily_plan_item_id: z.number().int().positive(),
    daily_plan_id: z.number().int().positive(),
    workpackage_id: z.number().int().positive(),
    position: z.number().int().positive(),

    created_by: DailyPlanItemCreatedBySchema.default(DEFAULT_DAILY_PLAN_ITEM_CREATED_BY),
    status: DailyPlanItemStatusSchema.default(DEFAULT_DAILY_PLAN_ITEM_STATUS),
});

export const DailyPlanSchema = z.object({
    daily_plan_id: z.number().int().positive(),
    user_id: z.number().int().positive(),
    plan_date: DateSchema,
    status: DailyPlanStatusSchema.default(DEFAULT_DAILY_PLAN_STATUS),
});




// --- Extended schemas

export const AuthRegisterBodySchema = z.object({
    ...UserSchema.pick({ username: true, display_name: true }).shape,
    password: z.coerce.string().trim().min(1).max(VARCHAR_LENGTH),
});

export const AuthLoginBodySchema = z.object({
    ...UserSchema.pick({ username: true }).shape,
    password: z.coerce.string().trim().min(1).max(VARCHAR_LENGTH),
});

export const GetAuthUserSchema = UserSchema.pick({ 
    user_id: true,
    username: true,
    password_hash: true,
    refresh_token: true,
    role: true,
});

export const CreateUserBodySchema = z.object({
    ...UserSchema.pick({ username: true, display_name: true }).shape,
    password_hash: z.coerce.string().trim().min(1).max(VARCHAR_LENGTH),
});

export const CreateSettingBodySchema = SettingSchema.omit({ 
    setting_id: true 
});

export const GetUserParamsSchema = z.object({
    id: z.coerce.number().int().positive().transform(val => String(val)),
});

export const GetUserSchema = z.object({
    ...UserSchema.pick({ 
        username: true,
        display_name: true,
        role: true,
    }).shape,
    ...SettingSchema.omit({ setting_id: true }).shape,
});




// --- Types

export type UserRoleType = z.infer<typeof UserRoleSchema>;
export type DailyPlanItemCreatedByType = z.infer<typeof DailyPlanItemCreatedBySchema>;
export type DailyPlanItemStatusType = z.infer<typeof DailyPlanItemStatusSchema>;
export type DailyPlanStatusType = z.infer<typeof DailyPlanStatusSchema>;

export type UserType = z.infer<typeof UserSchema>;
export type SettingType = z.infer<typeof SettingSchema>;
export type NotificationType = z.infer<typeof NotificationSchema>;
export type DailyPlanItemType = z.infer<typeof DailyPlanItemSchema>;
export type DailyPlanType = z.infer<typeof DailyPlanSchema>;

export type AuthRegisterBodyType = z.infer<typeof AuthRegisterBodySchema>;
export type AuthLoginBodyType = z.infer<typeof AuthLoginBodySchema>;
export type GetAuthUserType = z.infer<typeof GetAuthUserSchema>;

export type CreateUserBodyType = z.infer<typeof CreateUserBodySchema>;
export type CreateSettingBodyType = z.infer<typeof CreateSettingBodySchema>;
export type GetUserParamsType = z.infer<typeof GetUserParamsSchema>;
export type GetUserType = z.infer<typeof GetUserSchema>;
