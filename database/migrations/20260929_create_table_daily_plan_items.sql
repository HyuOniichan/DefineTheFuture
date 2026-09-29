drop table if exists daily_plan_items;

create table daily_plan_items (
	daily_plan_item_id serial primary key,
	daily_plan_id integer not null,
	workpackage_id integer not null,
	"position" integer not null,
	status varchar(30) default 'pending',
	created_by varchar(30),

	constraint chk_daily_plan_item_status check (
		status in ('pending', 'in_progress', 'completed', 'skipped')
	),
	constraint chk_daily_plan_item_created_by check (
		created_by in ('system', 'user')
	),
	constraint unq_daily_plan_item_parent_position unique (
		daily_plan_id, "position"
	)
);
