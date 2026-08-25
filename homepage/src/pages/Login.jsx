import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // login | register | magiclink
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    // magic link 回跳后，token 在 URL hash 里，getSession 自动提取并建立会话
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (!supabase) return
    setLoading(true); setErr(''); setInfo('')
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setErr(error.message)
      else navigate('/blog')
    } else if (mode === 'register') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setErr(error.message)
      else setInfo('注册成功，请查收邮箱确认链接')
    } else {
      // magic link：免密码，点邮件链接登录（未注册的邮箱会自动建号）
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + '/#/login', shouldCreateUser: true },
      })
      if (error) setErr(error.message)
      else setInfo('登录链接已发送到 ' + email + '，点邮件里的链接即可登录（没收到看下垃圾箱）')
    }
    setLoading(false)
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (!isSupabaseConfigured) {
    return <div className="login-wrap"><div className="login-title">登录 Koi</div><div className="notice">Supabase 后端尚未配置。</div></div>
  }

  if (user) {
    return (
      <div className="login-wrap">
        <div className="login-title">已登录</div>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: 20, wordBreak: 'break-all' }}>{user.email}</p>
        <button className="btn btn-block" onClick={() => navigate('/notes')}>去小纸条</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={logout}>退出登录</button>
      </div>
    )
  }

  const tabs = [
    ['login', '密码登录'],
    ['register', '注册'],
    ['magiclink', '邮箱登录'],
  ]

  return (
    <div className="login-wrap">
      <div className="slot login-logo">logo</div>
      <div className="login-title">
        {mode === 'login' ? '登录 Koi' : mode === 'register' ? '注册' : '邮箱登录（免密码）'}
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '4px 0 20px', justifyContent: 'center' }}>
        {tabs.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className="btn"
            onClick={() => { setMode(key); setErr(''); setInfo('') }}
            style={mode === key ? {} : { background: 'transparent', color: '#888', border: '1px solid var(--rule)' }}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={submit}>
        <div className="field">
          <label>邮箱</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        {mode !== 'magiclink' && (
          <div className="field">
            <label>密码</label>
            <input className="input" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        )}
        {err && <div className="form-err">{err}</div>}
        {info && <div className="notice">{info}</div>}
        <button className="btn btn-block" disabled={loading} type="submit">
          {loading ? '…' : mode === 'login' ? '登录' : mode === 'register' ? '注册' : '发送登录链接'}
        </button>
      </form>

      {mode === 'magiclink' && (
        <div className="login-alt" style={{ marginTop: 12, fontSize: 13, color: '#999' }}>
          没账号也能直接登录，第一次会自动注册。要写文章需用站长邮箱 keyiwu11@gmail.com。
        </div>
      )}
    </div>
  )
}
