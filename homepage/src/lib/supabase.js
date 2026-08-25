import { createClient } from '@supabase/supabase-js'

// 从 Vite 环境变量读取（.env 文件，前缀 VITE_），未设置时回退到公开默认值。
// anon/publishable key 本就是公开的（会进前端 bundle，靠 RLS 保数据安全），
// 所以直接 baked-in 也能让 GitHub Pages 的 build 连上后端。
const url = import.meta.env.VITE_SUPABASE_URL || 'https://xuaqrrigfsblqzfmqxvh.supabase.co'
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_p1k01t3tWT-KH74OgPL1oQ_NBrfhmSs'

// 是否已配置 Supabase（未配置时各页面优雅降级，不抛错）
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null

// 当前登录用户（未配置时返回 null）
export async function getCurrentUser() {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data?.user ?? null
}

// 站长邮箱：写文章权限（前端 UI 判断 + 后端 RLS 都以这个为准）
// 你是 GitHub OAuth 登录，站点登录后 user.email 即你的 GitHub 邮箱。
export const OWNER_EMAIL = 'keyiwu11@gmail.com'
