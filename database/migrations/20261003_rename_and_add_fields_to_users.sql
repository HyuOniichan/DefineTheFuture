begin;
	alter table users add column username varchar(255) not null default '';
	alter table users add column password_hash varchar(255) not null default '';
	alter table users add column "role" varchar(10) not null default 'user';
	alter table users rename column "name" to display_name;
commit;
