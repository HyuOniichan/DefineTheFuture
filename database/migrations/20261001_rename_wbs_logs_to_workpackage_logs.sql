begin;
	alter table wbs_logs rename to workpackage_logs;
	alter table workpackage_logs rename column wbs_log_id to workpackage_log_id;
commit;