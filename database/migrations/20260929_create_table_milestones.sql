drop table if exists milestones;

create table milestones (
	milestone_id serial primary key,
	goal_id integer not null,
	"position" integer not null,

	title varchar(255) not null,
	description text,
	expected_outcome text,
	final_output text,

	planned_start_date date,
	planned_end_date date,
	actual_start_date date,
	actual_end_date date,
	created_at timestamptz default current_timestamp,
	updated_at timestamptz
);
