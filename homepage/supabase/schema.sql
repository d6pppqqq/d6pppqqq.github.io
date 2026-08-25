-- Koi 作品集 · Supabase schema
-- 运行：Supabase Dashboard → SQL Editor → 粘贴全文执行

-- ── 表 ──────────────────────────────────────

create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  username   text,
  avatar_url text,
  bio        text,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  slug       text unique not null,
  excerpt    text,
  content    text,
  tags       text[],
  published  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_likes (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.blog_posts(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

create table if not exists public.blog_comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.blog_posts(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  content    text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  content    text not null,
  created_at timestamptz not null default now()
);

-- ── 新用户自动建 profile ────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── RLS ─────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_likes enable row level security;
alter table public.blog_comments enable row level security;
alter table public.notes enable row level security;

-- profiles：公开读，本人写
create policy "profiles_public_read" on public.profiles for select using (true);
create policy "profiles_own_update"  on public.profiles for update using (auth.uid() = id);

-- blog_posts：公开读（仅已发布）；站主经 service_role / 管理端写（前端不直写）
create policy "posts_public_read" on public.blog_posts for select using (published = true);

-- blog_likes：公开读，登录可赞（一人一赞），本人可取消
create policy "likes_public_read" on public.blog_likes for select using (true);
create policy "likes_insert_own"  on public.blog_likes for insert with check (auth.uid() = user_id);
create policy "likes_delete_own"  on public.blog_likes for delete using (auth.uid() = user_id);

-- blog_comments：公开读，登录可评，本人可删
create policy "comments_public_read" on public.blog_comments for select using (true);
create policy "comments_insert_own"  on public.blog_comments for insert with check (auth.uid() = user_id);
create policy "comments_delete_own"  on public.blog_comments for delete using (auth.uid() = user_id);

-- notes：公开读，登录可留，本人可删
create policy "notes_public_read" on public.notes for select using (true);
create policy "notes_insert_own"  on public.notes for insert with check (auth.uid() = user_id);
create policy "notes_delete_own"  on public.notes for delete using (auth.uid() = user_id);

-- blog_posts 站长写权限（写文章页）：仅站长邮箱可增删改
create policy "posts_owner_insert" on public.blog_posts for insert with check (auth.email() = 'keyiwu11@gmail.com');
create policy "posts_owner_update" on public.blog_posts for update using (auth.email() = 'keyiwu11@gmail.com');
create policy "posts_owner_delete" on public.blog_posts for delete using (auth.email() = 'keyiwu11@gmail.com');
