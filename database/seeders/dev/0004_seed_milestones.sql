insert into milestones (
	milestone_id,
    goal_id,
    "position",
    title,
    description,
    expected_outcome,
    final_output,
    planned_start_date,
    planned_end_date,
    actual_start_date,
    actual_end_date,
    created_at,
    updated_at
) values
	(1, 1, 1, 'Learn the fundamentals', 'Build the necessary foundation.', 'Understand the core concepts.', NULL, '2026-10-01', '2026-10-07', '2026-10-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, 2, 'Build a small project', 'Apply the learned concepts in practice.', 'Complete a working prototype.', NULL, '2026-10-08', '2026-10-20', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 2, 1, 'Research the problem', 'Understand requirements and possible approaches.', 'Have a clear implementation plan.', NULL, '2026-10-01', '2026-10-05', '2026-10-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 2, 2, 'Implement MVP', 'Build the first usable version.', 'Working MVP.', NULL, '2026-10-06', '2026-10-20', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 3, 1, 'Learn the basics', 'Study the fundamental concepts.', 'Understand the basic concepts.', NULL, '2026-10-01', '2026-10-10', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
on conflict (milestone_id) do nothing;
	