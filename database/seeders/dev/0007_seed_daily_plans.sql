insert into daily_plans (
    daily_plan_id,
    user_id,
    plan_date,
    status
) values
    (1, 1, '2026-10-05', 'in_progress'),
    (2, 1, '2026-10-06', 'pending'),
    (3, 2, '2026-10-05', 'draft')
on conflict (daily_plan_id) do nothing;
