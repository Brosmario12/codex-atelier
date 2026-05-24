create table if not exists public.launch_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  goal text not null,
  created_at timestamptz not null default now()
);

alter table public.launch_requests enable row level security;

drop policy if exists "Anyone can create launch requests" on public.launch_requests;
create policy "Anyone can create launch requests"
  on public.launch_requests
  for insert
  to anon
  with check (true);

drop policy if exists "Authenticated users can read launch requests" on public.launch_requests;
create policy "Authenticated users can read launch requests"
  on public.launch_requests
  for select
  to authenticated
  using (true);
