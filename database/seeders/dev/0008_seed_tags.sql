insert into tags (
    tag_id,
    title,
    description,
    priority
) values
    (1, 'Learning', 'Goals related to learning and studying.', 3),
    (2, 'Project', 'Goals related to building projects.', 5),
    (3, 'Programming', 'Programming-related goals.', 4),
    (4, 'Research', 'Research and investigation.', 2),
    (5, 'Personal', 'Personal development goals.', 1)
on conflict (tag_id) do nothing;
