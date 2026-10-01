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



// --- Original schemas

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
    setting_id: z.number(),
    name: z.string().trim(),
});

export const SettingSchema = z.object({
    setting_id: z.number().int().positive(),
    long_term_goal: z.string().nullish(),
    short_term_goal: z.string().nullish(),
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

export const GetUserParamsSchema = z.object({
    id: z.coerce.number().int().positive().transform(val => String(val)),
});

export const GetUserSchema = z.object({
    ...UserSchema.omit({ user_id: true }).shape,
    ...SettingSchema.omit({ setting_id: true }).shape,
});




// --- Types

export type DailyPlanItemCreatedByType = z.infer<typeof DailyPlanItemCreatedBySchema>;
export type DailyPlanItemStatusType = z.infer<typeof DailyPlanItemStatusSchema>;
export type DailyPlanStatusType = z.infer<typeof DailyPlanStatusSchema>;

export type UserType = z.infer<typeof UserSchema>;
export type SettingType = z.infer<typeof SettingSchema>;
export type NotificationType = z.infer<typeof NotificationSchema>;
export type DailyPlanItemType = z.infer<typeof DailyPlanItemSchema>;
export type DailyPlanType = z.infer<typeof DailyPlanSchema>;

export type GetUserParamsType = z.infer<typeof GetUserParamsSchema>;
export type GetUserType = z.infer<typeof GetUserSchema>;
