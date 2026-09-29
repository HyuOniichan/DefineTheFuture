insert into users (
	user_id,
	setting_id,
	"name"
) values
	(1, 1, 'DND. HUY'),
	(2, 2, 'LovePot 009')
on conflict (user_id) do nothing;
