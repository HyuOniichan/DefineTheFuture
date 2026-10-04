SELECT setval(pg_get_serial_sequence('settings', 'setting_id'), COALESCE(max(setting_id), 0) + 1, false) from settings;
