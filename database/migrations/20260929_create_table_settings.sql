drop table if exists settings;

create table settings (
	setting_id serial primary key,
	long_term_goal text,
	short_term_goal text,
	max_active_goals integer default 2,
	max_workpackages_per_day integer default 3,
	max_work_minutes_per_day integer default 120,
	report_interval interval default interval '7 days'
);
