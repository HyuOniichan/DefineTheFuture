insert into users (
	user_id,
	setting_id,
	display_name,
	username,
	password_hash,
	"role"
) values
	(1, 1, 'DND. HUY', 'dndhuy', '$2b$04$dJrFJ3e4Qbc8D7rFdmu91et3Fc14HaaQ0XUpOAIcXvseshmM5CgIC', 'admin'),
	(2, 2, 'LovePot 009', 'lovepot009', '$2b$04$Q03moWENVtWWcpZubs0CfOfGI10J31JiPo075DDSSZ2ykQ5cyETRi', 'user')
on conflict (user_id) do nothing;
