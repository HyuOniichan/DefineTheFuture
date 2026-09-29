insert into settings (
	setting_id, 
	long_term_goal, 
	short_term_goal, 
	max_active_goals, 
	max_workpackages_per_day,
	max_work_minutes_per_day,
	report_interval
) values
	(1, 'Become the happiest man in the world', 'Do whatever', 2, 4, 240, '1 week'),
	(2, 'Productive man', 'Break all the limits', 5, 6, 480, '1 day')
on conflict (setting_id) do nothing;
