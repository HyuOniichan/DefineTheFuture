import type { IUser, NotificationType } from "@/types";
import type { GoalType } from "@/types/userDataTypes";
import { Info, TriangleAlert } from "lucide-react";



export const APP_NAME = "DefineTheFuture";
export const USER_NAME = "DND. HUY";



export const mockUsers: IUser[] = [
    { user_id: 1, setting_id: 1, name: "Test 001" }
];


export const mockGoals: GoalType[] = [
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
        progress: 30,
        tag_titles: ["Robotics"]
    },
    {
        goal_id: 2,
        user_id: 1,
        title: "Computer Vision",
        description: "Description",
        expected_outcome: "Expected outcome",
        status: "backlog",
        status_reason: "Who care?",
        planned_start_date: new Date(),
        planned_end_date: new Date(),
        actual_start_date: new Date(),
        actual_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        progress: 60,
        tag_titles: ["AI", "Computer Vision"]
    }
];


export const mockNotifications: NotificationType[] = [
    {
        notification_id: 1,
        title: "First task today",
        description: "Take first task to day",
        is_read: true,
        url: "/today",
        created_by: 1,
        icon: Info,
    },
    {
        notification_id: 2,
        title: "You forgot 2 tasks yesterday !",
        description: "There were 2 tasks which have not been done yet from yesterday",
        is_read: false,
        url: "/goals",
        icon: TriangleAlert,
    },
]
