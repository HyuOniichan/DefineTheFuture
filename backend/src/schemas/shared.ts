import * as z from 'zod';

// --- Constants
export const VARCHAR_LENGTH = 255;



// --- Helpers
export const getCurrentTimestamp = () => new Date().toISOString();

export const validateStartEndDate = (
    data: {
        planned_start_date?: string | null | undefined;
        planned_end_date?: string | null | undefined;
        actual_start_date?: string | null | undefined;
        actual_end_date?: string | null | undefined;
    },
    ctx: z.RefinementCtx
) => {
    if (data.planned_start_date && data.planned_end_date) {
        const start = new Date(data.planned_start_date);
        const end = new Date(data.planned_end_date);

        if (end < start) {
            ctx.addIssue({
                code: "custom",
                message: "Planned end date must be later than planned start date",
                path: ["planned_end_date"],
            });
        }
    }

    if (data.actual_start_date && data.actual_end_date) {
        const start = new Date(data.actual_start_date);
        const end = new Date(data.actual_end_date);

        if (end < start) {
            ctx.addIssue({
                code: "custom",
                message: "Actual end date must be later than actual start date",
                path: ["actual_end_date"],
            });
        }
    }
}



// --- General schemas
export const PostgresIntervalSchema = z.object({
    years: z.number().nullish(),
    months: z.number().nullish(),
    days: z.number().nullish(),
    hours: z.number().nullish(),
    minutes: z.number().nullish(),
    seconds: z.number().nullish(),
    milliseconds: z.number().nullish(),
});

export const IntervalSchema = z.union([
    PostgresIntervalSchema,
    z.string()
]);

export const DateSchema = z.iso.date();
export const TimestamptzSchema = z.iso.datetime({ offset: true });

export const WbsDateSchema = z.object({
    planned_start_date: DateSchema.nullish(),
    planned_end_date: DateSchema.nullish(),
    actual_start_date: DateSchema.nullish(),
    actual_end_date: DateSchema.nullish(),
}).superRefine(validateStartEndDate);

export const AutoTimestamptzSchema = z.object({
    created_at: TimestamptzSchema.default(getCurrentTimestamp),
    updated_at: TimestamptzSchema.default(getCurrentTimestamp),
});



// --- Types
export type PostgresIntervalType = z.infer<typeof PostgresIntervalSchema>;
export type IntervalType = z.infer<typeof IntervalSchema>
export type DateType = z.infer<typeof DateSchema>
export type TimestamptzType = z.infer<typeof TimestamptzSchema>
export type WbsDateType = z.infer<typeof WbsDateSchema>;
export type AutoTimestamptzType = z.infer<typeof AutoTimestamptzSchema>;

