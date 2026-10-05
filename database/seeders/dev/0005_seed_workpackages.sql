insert into workpackages (
	workpackage_id,
    milestone_id,
    parent_workpackage_id,
    "position",
    title,
    description,
    expected_duration_hours,
    actual_duration_hours,
    status,
    completed_at,
    created_at,
    updated_at
) values
	(1, 1, NULL, 1, 'Read introductory material', 'Read the recommended introductory material.', INTERVAL '2 hours', INTERVAL '2 hours', 'done', '2026-10-02 10:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (2, 1, NULL, 2, 'Take notes', 'Summarize the important concepts.', INTERVAL '1 hour', INTERVAL '1 hour', 'done', '2026-10-03 10:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (3, 1, NULL, 3, 'Practice fundamentals', 'Solve basic exercises.', INTERVAL '3 hours', NULL, 'in_progress', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (4, 2, NULL, 1, 'Define project requirements', 'Write down the scope and requirements.', INTERVAL '2 hours', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (5, 2, NULL, 2, 'Implement prototype', 'Build the first working prototype.', INTERVAL '5 hours', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (6, 3, NULL, 1, 'Research existing solutions', 'Compare existing approaches.', INTERVAL '2 hours', INTERVAL '1 hour', 'in_progress', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (7, 3, NULL, 2, 'Write technical plan', 'Define the proposed implementation.', INTERVAL '2 hours', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (8, 4, NULL, 1, 'Set up project', 'Initialize the project and development environment.', INTERVAL '2 hours', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (9, 4, NULL, 2, 'Implement core feature', 'Implement the main MVP functionality.', INTERVAL '6 hours', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (10, 5, NULL, 1, 'Study basic concepts', 'Learn the fundamental concepts.', INTERVAL '3 hours', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
    (11, 5, NULL, 2, 'Complete exercises', 'Practice the learned concepts.', INTERVAL '2 hours', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(12, 5, 5, 1, 'Create project structure', 'Create the initial project structure.', INTERVAL '1 hour', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (13, 5, 5, 2, 'Implement first component', 'Implement the first component of the prototype.', INTERVAL '2 hours', NULL, 'pending', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
on conflict (workpackage_id) do nothing;
