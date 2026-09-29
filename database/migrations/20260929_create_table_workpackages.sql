drop table if exists workpackages;

create table workpackages (
	workpackage_id serial primary key,
	milestone_id integer not null,
	parent_workpackage_id integer,
	"position" integer not null,

	title varchar(255) not null,
	description text,
	expected_duration_hours interval,
	actual_duration_hours interval,
	status varchar(30) default 'pending',

	completed_at timestamptz,
	created_at timestamptz,
	updated_at timestamptz,

	constraint chk_workpackage_status check (
		status in ('pending', 'in_progress', 'blocked', 'done', 'cancelled')
	),
	constraint unq_workpackage_parent_position unique (
		parent_workpackage_id, "position"
	)
);
