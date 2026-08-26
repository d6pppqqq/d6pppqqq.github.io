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
      else setInfo('Signed up — check your inbox for the confirmation link')
    } else {
      // magic link：免密码，点邮件链接登录（未注册的邮箱会自动建号）
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + '/#/login', shouldCreateUser: true },
      })
      if (error) setErr(error.message)
      else setInfo('Login link sent to ' + email + " — click it to sign in (check spam if you don't see it)")
    }
    setLoading(false)
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (!isSupabaseConfigured) {
    return <div className="login-wrap"><div className="login-title">Sign in to Koi's</div><div className="notice">Supabase backend is not configured yet.</div></div>
  }

  if (user) {
    return (
      <div className="login-wrap">
        <div className="login-title">Signed in</div>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: 20, wordBreak: 'break-all' }}>{user.email}</p>
        <button className="btn btn-block" onClick={() => navigate('/notes')}>Go to Notes</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={logout}>Sign out</button>
      </div>
    )
  }

  const tabs = [
    ['login', 'Password'],
    ['register', 'Sign up'],
    ['magiclink', 'Email link'],
  ]

  return (
    <div className="login-wrap">
      <img className="login-logo-img" src="/login_icon.png" alt="Koi" />
      <div className="login-title">
        {mode === 'login' ? "Sign in to Koi's" : mode === 'register' ? 'Sign up' : 'Email link (no password)'}
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
          <label>Email</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        {mode !== 'magiclink' && (
          <div className="field">
            <label>Password</label>
            <input className="input" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        )}
        {err && <div className="form-err">{err}</div>}
        {info && <div className="notice">{info}</div>}
        <button className="btn btn-block" disabled={loading} type="submit">
          {loading ? '…' : mode === 'login' ? 'Sign in' : mode === 'register' ? 'Sign up' : 'Send login link'}
        </button>
      </form>

      {mode === 'magiclink' && (
        <div className="login-alt" style={{ marginTop: 12, fontSize: 13, color: '#999' }}>
          No account needed — first sign-in auto-registers. To write posts, use the owner email keyiwu11@gmail.com.
        </div>
      )}
    </div>
  )
}
