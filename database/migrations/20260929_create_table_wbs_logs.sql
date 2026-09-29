drop table if exists wbs_logs;

create table wbs_logs (
	wbs_log_id serial primary key,
	workpackage_id integer not null,

	started_at timestamptz default current_timestamp,
	duration interval
);
