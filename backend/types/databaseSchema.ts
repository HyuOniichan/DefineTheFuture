
type GoalStatusType = "backlog" | "active" | "achieved" | "suspended" | "dropped";
type WorkpackageStatusType = "pending" | "in_progress" | "blocked" | "done" | "cancelled";
type DailyPlanItemCreatedByType = "system" | "user";
type DailyPlanItemStatusType = "pending" | "in_progress" | "completed" | "skipped";
type DailyPlanStatusType = "draft" | "pending" | "in_progress" | "completed" | "cancelled";
type SettingReportIntervalType = "day" | "week" | "month" | "year" | "never";



export interface IUser {
    user_id: number,
    setting_id: number,
    name: string
}

export interface IGoal {
    goal_id: number,
    user_id: number,

    title: string,
    description?: string,
    expected_outcome?: string,
    status: GoalStatusType,
    status_reason?: string,

    planned_start_date: Date,
    planned_end_date: Date,
    actual_start_date: Date,
    actual_end_date: Date,
    created_at: Date,
    updated_at: Date,
}

export interface IMilestone {
    milestone_id: number,
    goal_id: number,
    position: number,

    title: string,
    description?: string,
    expected_outcome?: string,
    final_output?: string,

    planned_start_date: Date,
    planned_end_date: Date,
    actual_start_date: Date,
    actual_end_date: Date,
    created_at: Date,
    updated_at: Date,
}

export interface IWorkpackage {
    workpackage_id: number,
    milestone_id: number,
    parent_workpackage_id?: number
    position: number,

    title: string,
    description?: string,
    expected_duration_hours: number,
    status: WorkpackageStatusType,
    completed_at: Date,
    created_at: Date,
    updated_at: Date,
}

export interface IDailyPlan {
    daily_plan_id: number,
    user_id: number,
    plan_date: Date,
    status: DailyPlanStatusType,
}

export interface IDailyPlanItem {
    daily_plan_item_id: number,
    daily_plan_id: number,
    workpackage_id: number,
    position: number,
    create_by: DailyPlanItemCreatedByType,
    status: DailyPlanItemStatusType,
}

export interface ISetting {
    setting_id: number,
    long_term_goal?: string
    short_term_goal?: string
    max_active_goals: number
    max_workpackages_per_day: number,
    max_work_minutes_per_day: number,
    report_interval: SettingReportIntervalType,
}

export interface ITag {
    tag_id: number,
    title: string,
    description?: string,
    priority: number,
}

export interface IWbsLog {
    wbs_log_id: number,
    workpackage_id: number,
    started_at: Date,
    ended_at: Date,
}

export interface IGoalTag {
    goal_id: number,
    tag_id: number,
}

export interface IWbsDependency {
    current_workpackage_id: number,
    required_workpackage_id: number,
}

