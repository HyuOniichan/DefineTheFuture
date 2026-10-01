begin;
	alter table notifications rename column created_by to sent_by;
	alter table notifications rename column created_at to sent_at;
	alter table notifications add column sent_to integer not null default 1;
commit;
