insert into goal_tag (
    goal_id,
    tag_id
) values
    (1, 1),
    (1, 3),
    (2, 2),
    (2, 3),
    (2, 4),
    (3, 1),
    (3, 5)
on conflict (goal_id, tag_id) do nothing;
