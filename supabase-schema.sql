create table if not exists public.users (
  id text primary key,
  label text not null,
  password text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key,
  from_id text not null,
  to_id text not null,
  text text not null check (char_length(text) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists messages_from_to_created_at_idx
  on public.messages (from_id, to_id, created_at);

create table if not exists public.call_signals (
  id uuid primary key,
  call_id uuid not null,
  from_id text not null,
  to_id text not null,
  type text not null check (type in ('offer', 'answer', 'candidate', 'hangup', 'decline', 'busy')),
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists call_signals_to_created_at_idx
  on public.call_signals (to_id, created_at);

alter table public.users enable row level security;
alter table public.messages enable row level security;
alter table public.call_signals enable row level security;
