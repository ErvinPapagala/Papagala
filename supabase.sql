-- Enable required extensions
create extension if not exists pgcrypto;

-- Create tables
create table if not exists public.parrots (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  species text not null,
  age_months int check (age_months >= 0) default 0,
  price_eur int not null check (price_eur >= 0),
  availability text not null check (availability in ('available','sold')) default 'available',
  cover_image_url text,
  image_urls text[] default '{}',
  description text,
  training_basic_eur int,
  training_advanced_eur int,
  created_at timestamptz not null default now()
);

create table if not exists public.trainings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price_eur int not null check (price_eur >= 0),
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.parrots enable row level security;
alter table public.trainings enable row level security;

-- Policies: allow read to anyone via anon key (CREATE POLICY has no IF NOT EXISTS; wrap in DO blocks)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policy p
    JOIN pg_class c ON p.polrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE p.polname = 'parrots_read' AND n.nspname = 'public' AND c.relname = 'parrots'
  ) THEN
    CREATE POLICY parrots_read ON public.parrots FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policy p
    JOIN pg_class c ON p.polrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE p.polname = 'trainings_read' AND n.nspname = 'public' AND c.relname = 'trainings'
  ) THEN
    CREATE POLICY trainings_read ON public.trainings FOR SELECT USING (true);
  END IF;
END $$;

-- No insert/update/delete for anon. Admin operations should use service role key.

