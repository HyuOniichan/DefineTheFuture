create or replace function trg_fn_milestones_before_update()
returns trigger as $$
	begin
		new.updated_at = now();
		return new;
	end;
$$ language plpgsql;

create trigger trg_milestones_before_update
	before update on milestones
	for each row
	execute function trg_fn_milestones_before_update();
