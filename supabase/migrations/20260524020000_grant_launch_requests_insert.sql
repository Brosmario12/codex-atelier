grant usage on schema public to anon, authenticated;
grant insert on table public.launch_requests to anon;
grant select on table public.launch_requests to authenticated;

drop policy if exists "Anyone can create launch requests" on public.launch_requests;
create policy "Anyone can create launch requests"
  on public.launch_requests
  for insert
  to anon
  with check (true);
