create or replace function trg_fn_goals_before_update()
returns trigger as $$
	begin
		new.updated_at = now();
		return new;
	end;
$$ language plpgsql;

create trigger trg_goals_before_update
	before update on goals
	for each row
	execute function trg_fn_goals_before_update();
