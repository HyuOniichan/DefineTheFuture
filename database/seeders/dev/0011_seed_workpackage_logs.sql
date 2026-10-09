insert into workpackage_logs (
    workpackage_log_id,
    workpackage_id,
    started_at,
    duration
) values
    (1, 1, '2026-10-01 19:00:00', INTERVAL '1 hour'),
    (2, 1, '2026-10-02 19:00:00', INTERVAL '1 hour'),
    (3, 2, '2026-10-03 19:00:00', INTERVAL '1 hour'),
    (4, 3, '2026-10-05 07:30:00', INTERVAL '1 hour'),
    (5, 6, '2026-10-04 19:00:00', INTERVAL '1 hour')
on conflict (workpackage_log_id) do nothing;
