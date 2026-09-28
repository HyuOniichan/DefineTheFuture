import type { IGoal } from "./databaseSchemaTypes";

export interface GoalType extends IGoal {
    progress: number,
    tag_titles: string[]
}

