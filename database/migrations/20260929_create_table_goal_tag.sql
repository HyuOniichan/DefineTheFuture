drop table if exists goal_tag;

create table goal_tag (
	goal_id integer not null,
	tag_id integer not null,

	constraint pk_goal_tag primary key (
		goal_id, tag_id
	)
);