drop table if exists wbs_dependency;

create table wbs_dependency (
	current_workpackage_id integer not null,
	required_workpackage_id integer not null,

	constraint pk_wbs_dependency primary key (
		current_workpackage_id,	required_workpackage_id
	)
);
