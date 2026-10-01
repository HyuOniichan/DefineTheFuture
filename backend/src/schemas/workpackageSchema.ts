import * as z from 'zod';
import { 
    VARCHAR_LENGTH, TimestamptzSchema, DateSchema, IntervalSchema, AutoTimestamptzSchema,
} from './shared';



// --- Constants

export const DEFAULT_WORKPACKAGE_STATUS = "pending";



// --- Original schemas

export const WorkpackageStatusSchema = z.enum([
    "pending", "in_progress", "blocked", "done", "cancelled"
]);

export const WorkpackageSchema = z.object({
    workpackage_id: z.number().int().positive(),
    milestone_id: z.number().int().positive(),
    parent_workpackage_id: z.number().int().positive().nullish(),
    position: z.number().int().positive(),

    title: z.string().min(1).max(VARCHAR_LENGTH),
    description: z.string().default(""),
    expected_duration_hours: z.number().default(0),
    actual_duration_hours: z.number().default(0),
    status: WorkpackageStatusSchema.default(DEFAULT_WORKPACKAGE_STATUS),
    completed_at: TimestamptzSchema.nullish(),

    ...AutoTimestamptzSchema,
});

export const WorkpackageLogSchema = z.object({
    workpackage_log_id: z.number().int().positive(),
    workpackage_id: z.number().int().positive(),
    started_at: DateSchema,
    duration: IntervalSchema,
});

export const WorkpackageDependencySchema = z.object({
    current_workpackage_id: z.number().int().positive(),
    required_workpackage_id: z.number().int().positive(),
});



// --- Types

export type WorkpackageStatusType = z.infer<typeof WorkpackageStatusSchema>;

export type WorkpackageType = z.infer<typeof WorkpackageSchema>;
export type WorkpackageLogType = z.infer<typeof WorkpackageLogSchema>;
export type WorkpackageDependencyType = z.infer<typeof WorkpackageDependencySchema>;
