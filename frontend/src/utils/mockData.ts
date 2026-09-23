
import type { IGoal, IUser } from "@/types/databaseSchema"


export const mockUsers: IUser[] = [
    { user_id: 1, setting_id: 1, name: "Test 001" }
];


export const mockGoals: IGoal[] = [
    {
        goal_id: 1,
        user_id: 1,
        title: "Robotics",
        description: "Description",
        expected_outcome: "Expected outcome",
        status: "active",
        status_reason: "Who know?",
        planned_start_date: new Date(),
        planned_end_date: new Date(),
        actual_start_date: new Date(),
        actual_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        goal_id: 2,
        user_id: 1,
        title: "Computer Vision",
        description: "Description",
        expected_outcome: "Expected outcome",
        status: "active",
        status_reason: "Who care?",
        planned_start_date: new Date(),
        planned_end_date: new Date(),
        actual_start_date: new Date(),
        actual_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    }
];
