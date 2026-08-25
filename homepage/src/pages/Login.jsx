import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null))
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (!supabase) return
    setLoading(true); setErr(''); setInfo('')
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setErr(error.message)
      else navigate('/notes')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setErr(error.message)
      else setInfo('注册成功，请查收邮箱确认链接（如已开启邮箱验证）')
    }
    setLoading(false)
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="login-wrap">
        <div className="login-title">登录 Koi</div>
        <div className="notice">Supabase 后端尚未配置，登录暂不可用。</div>
      </div>
    )
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

  return (
    <div className="login-wrap">
      <div className="slot login-logo">logo</div>
      <div className="login-title">{mode === 'login' ? '登录 Koi' : '注册'}</div>
      <form onSubmit={submit}>
        <div className="field">
          <label>邮箱</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>密码</label>
          <input className="input" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {err && <div className="form-err">{err}</div>}
        {info && <div className="notice">{info}</div>}
        <button className="btn btn-block" disabled={loading} type="submit">{loading ? '…' : mode === 'login' ? '登录' : '注册'}</button>
      </form>
      <div className="login-alt">
        {mode === 'login'
          ? <>没有账号？<a href="#" onClick={(e) => { e.preventDefault(); setMode('register') }}>注册</a></>
          : <>已有账号？<a href="#" onClick={(e) => { e.preventDefault(); setMode('login') }}>登录</a></>}
      </div>
    </div>
  )
}
