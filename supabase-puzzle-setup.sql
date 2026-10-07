-- Run this once in your Supabase project: SQL Editor → New query.
create table if not exists public.puzzle_rooms (
  id text primary key,
  state jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.puzzle_rooms enable row level security;

create policy "Anyone with a room link can read its puzzle"
on public.puzzle_rooms for select using (true);

create policy "Anyone with a room link can create a puzzle"
on public.puzzle_rooms for insert with check (true);

create policy "Anyone with a room link can update a puzzle"
on public.puzzle_rooms for update using (true) with check (true);
