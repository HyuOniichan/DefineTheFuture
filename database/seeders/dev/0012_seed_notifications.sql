insert into notifications (
    notification_id,
    title,
    description,
    is_read,
    url,
    sent_by,
    sent_at,
    sent_to
) values
    (1, 'Daily plan ready', 'Your daily plan for today is ready.', false, '/daily-plans/1', NULL, '2026-10-05 07:00:00', 1),
    (2, 'Work package completed', 'You completed "Read introductory material".', true, '/workpackages/1', NULL, '2026-10-02 10:05:00', 1),
    (3, 'New goal assigned', 'A new goal has been added to your account.', false, '/goals/3', 1, '2026-10-01 09:00:00', 2)
on conflict (notification_id) do nothing;
