drop table if exists tags;

create table tags (
	tag_id serial primary key,
	title varchar(255) not null,
	description text,
	priority integer default 0
);
