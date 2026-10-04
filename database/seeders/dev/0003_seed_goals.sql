insert into goals (
	goal_id,
	user_id,
	title,
	description,
	planned_start_date,
	planned_end_date
) values
	(1, 1, 'Robotics', 'Làm được con humanoid robot múa trường côn', '2025-08-01', '2026-09-30'),
	(2, 1, 'Computer Vision', 'Trở thành Computer Vision engineer', '2024-02-05', '2027-06-03'),
	(3, 2, 'Run a half marathon', 'Complete 21 km comfortably and consistently', '2026-09-02', '2026-09-22')
on conflict (goal_id) do nothing;
