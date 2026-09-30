import type { IGoal } from "./databaseSchema";

export interface GoalType extends
    Omit<IGoal, "goal_id"> {

}


export interface CreateGoalType extends
    Pick<
        IGoal,
        "user_id" | "title" | "description" | "expected_outcome" |
        "planned_start_date" | "planned_end_date"
    > {

}


export interface EditGoalType extends
    Partial<
        Omit<
            IGoal,
            "goal_id" | "user_id" | "created_at" | "updated_at"
        >
    > {

}

