insert into workpackage_dependencies (
    current_workpackage_id,
    required_workpackage_id
) values
    (3, 1),
    (3, 2),
    (5, 4),
    (7, 6),
    (9, 8),
    (11, 10)
on conflict (current_workpackage_id, required_workpackage_id) do nothing;
