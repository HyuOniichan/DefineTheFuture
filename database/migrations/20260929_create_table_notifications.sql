drop table if exists notifications;

create table notifications (
	notification_id serial primary key,
	title varchar(255) not null,
	description text,
	is_read boolean default false,
	url text,
	created_by integer,
	created_at timestamptz default current_timestamp
);
