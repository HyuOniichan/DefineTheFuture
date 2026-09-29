drop table if exists goals;

create table goals (
	goal_id serial primary key,
	user_id integer not null,
	
	title varchar(255) not null,
	description text not null,
	expected_outcome text,
	status varchar(30) default 'backlog',

	planned_start_date date,
	planned_end_date date,
	actual_start_date date,
	actual_end_date date,
	created_at timestamptz default current_timestamp,
	updated_at timestamptz,

	constraint chk_goal_status check (
		status in ('backlog', 'active', 'achieved', 'suspended', 'dropped')
	)
);
