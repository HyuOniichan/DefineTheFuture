import type { IUser, NotificationType } from "@/types";
import type { GoalType } from "@/types/userDataTypes";
import { Info, TriangleAlert } from "lucide-react";



export const APP_NAME = "DefineTheFuture";
export const USER_NAME = "DND. HUY";



export const mockHomeMetrics = [
    {
        title: "Active goals",
        highlightedText: "2",
        normalText: "2",
        linkText: "Review goals",
        link: "/goals",
        commentText: "At your weekly limit",
    },
    {
        title: "Today's progress",
        highlightedText: "0",
        normalText: "3",
        linkText: "Today tasks",
        link: "/today",
        commentText: "On a good track",
    },
    {
        title: "Planned time",
        highlightedText: "2h 55m",
        linkText: "Check reports",
        link: "/reports",
        commentText: "5m completed today",
    },
]



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
