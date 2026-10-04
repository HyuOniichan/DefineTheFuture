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

export const GetGoalsQuerySchema = z.object({
    user_id: z.coerce.number()
        .int().positive()
        .optional()
        .transform(val => {
            if (val === undefined) return val;
            return String(val);
        }),
});

export const GetGoalParamsSchema = z.object({
    id: z.coerce.number().int().positive().transform(val => String(val)),
});

export const GetGoalSchema = GoalSchema.omit({ 
    goal_id: true,
    user_id: true,
});

export const CreateGoalBodySchema = GoalSchema.pick({
    title: true,
    description: true,
    expected_outcome: true,
    planned_start_date: true,
    planned_end_date: true,
}).superRefine(validateStartEndDate);


export const EditGoalParamsSchema = z.object({
    id: z.coerce.number().int().positive().transform(val => String(val)),
});

export const EditGoalBodySchema = GoalSchema.pick({
    title: true,
    description: true,
    expected_outcome: true,
    status: true,
    planned_start_date: true,
    planned_end_date: true,
}).partial().superRefine(validateStartEndDate);



// --- Types

export type GoalStatusType = z.infer<typeof GoalStatusSchema>;

export type GoalType = z.infer<typeof GoalSchema>;
export type MilestoneType = z.infer<typeof MilestoneSchema>;
export type TagType = z.infer<typeof TagSchema>;
export type GoalTagType = z.infer<typeof GoalTagSchema>;

export type GetGoalsQueryType = z.infer<typeof GetGoalsQuerySchema>;
export type GetGoalParamsType = z.infer<typeof GetGoalParamsSchema>;
export type GetGoalType = z.infer<typeof GetGoalSchema>;
export type CreateGoalBodyType = z.infer<typeof CreateGoalBodySchema>;
export type EditGoalParamsType = z.infer<typeof EditGoalParamsSchema>;
export type EditGoalBodyType = z.infer<typeof EditGoalBodySchema>;
