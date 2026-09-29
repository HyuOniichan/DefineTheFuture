drop table if exists daily_plans;

create table daily_plans (
	daily_plan_id serial primary key,
	user_id integer not null,
	plan_date date,
	status varchar(30) default 'pending',

	constraint chk_daily_plan_status check (
		status in ('draft', 'pending', 'in_progress', 'completed', 'cancelled')
	)
);
