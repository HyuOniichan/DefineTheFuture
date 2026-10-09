begin;
	alter table goals add column deleted_at timestamptz;
	alter table milestones add column deleted_at timestamptz;
	alter table workpackages add column deleted_at timestamptz;
commit;
