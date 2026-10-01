import * as z from 'zod';
import { 
    VARCHAR_LENGTH, WbsDateSchema, AutoTimestamptzSchema,
    validateStartEndDate
} from './shared';



// --- Constants

export const DEFAULT_GOAL_STATUS = "backlog";
export const DEFAULT_TAG_PRIORITY = 1;



// --- Original schemas

export const GoalStatusSchema = z.enum([
    "backlog", "active", "achieved", "suspended", "dropped"
]);

export const GoalSchema = z.object({
    goal_id: z.number().int().positive(),
    user_id: z.number().int().positive(),

    title: z.string().min(1).max(VARCHAR_LENGTH),
    description: z.string().default(""),
    expected_outcome: z.string().default(""),
    status: GoalStatusSchema.default(DEFAULT_GOAL_STATUS),

    ...WbsDateSchema.shape,
    ...AutoTimestamptzSchema.shape,
});

export const MilestoneSchema = z.object({
    milestone_id: z.number().int().positive(),
    goal_id: z.number().int().positive(),
    position: z.number().int().positive(),
    
    title: z.string().min(1).max(VARCHAR_LENGTH),
    description: z.string().default(""),
    expected_outcome: z.string().default(""),
    final_output: z.string().default(""),

    ...WbsDateSchema.shape,
    ...AutoTimestamptzSchema.shape,
});

export const TagSchema = z.object({
    tag_id: z.number().int().positive(),
    title: z.string().min(1).max(VARCHAR_LENGTH),
    description: z.string().default(""),
    priority: z.number().default(DEFAULT_TAG_PRIORITY),
});

export const GoalTagSchema = z.object({
    goal_id: z.number().int().positive(),
    tag_id: z.number().int().positive(),
});



// --- Extended schemas

export const GetGoalSchema = GoalSchema.omit({ goal_id: true });

export const CreateGoalSchema = GoalSchema.pick({
    user_id: true,
    title: true,
    description: true,
    expected_outcome: true,
    planned_start_date: true,
    planned_end_date: true,
}).superRefine(validateStartEndDate);

export const EditGoalSchema = GoalSchema.omit({
    goal_id: true,
    user_id: true,
    actual_start_date: true,
    actual_end_date: true,
    created_at: true,
    updated_at: true,
}).partial().superRefine(validateStartEndDate);



// --- Types

export type GoalStatusType = z.infer<typeof GoalStatusSchema>;

export type GoalType = z.infer<typeof GoalSchema>;
export type MilestoneType = z.infer<typeof MilestoneSchema>;
export type TagType = z.infer<typeof TagSchema>;
export type GoalTagType = z.infer<typeof GoalTagSchema>;

export type GetGoalType = z.infer<typeof GetGoalSchema>;
export type CreateGoalType = z.infer<typeof CreateGoalSchema>;
export type EditGoalType = z.infer<typeof EditGoalSchema>;
