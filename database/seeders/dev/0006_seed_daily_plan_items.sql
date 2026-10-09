insert into daily_plan_items (
    daily_plan_item_id,
    daily_plan_id,
    workpackage_id,
    "position",
    status,
    created_by
) values
    (1, 1, 3, 1, 'in_progress', 'system'),
    (2, 1, 6, 2, 'pending', 'user'),
    (3, 2, 4, 1, 'pending', 'system'),
    (4, 2, 5, 2, 'pending', 'system'),
    (5, 3, 10, 1, 'pending', 'user')
on conflict (daily_plan_item_id) do nothing;
