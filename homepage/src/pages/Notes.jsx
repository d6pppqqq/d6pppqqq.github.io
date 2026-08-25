import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const fmtTime = (t) => new Date(t).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })

export default function Notes() {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) { setReady(true); return }
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      await load()
      setReady(true)
    })()
  }, [])

  async function load() {
    const { data, error } = await supabase.from('notes').select('id, user_id, content, created_at').order('created_at', { ascending: false })
    if (error) return
    const { data: profiles } = await supabase.from('profiles').select('id, username')
    const nameOf = {}
    for (const p of profiles || []) nameOf[p.id] = p.username || '访客'
    setNotes((data || []).map((n) => ({ ...n, username: nameOf[n.user_id] || '访客' })))
  }

  async function submit() {
    const t = text.trim()
    if (!t) return
    setSubmitting(true)
    const { error } = await supabase.from('notes').insert({ user_id: user.id, content: t })
    setSubmitting(false)
    if (!error) { setText(''); await load() }
  }

  if (!isSupabaseConfigured) {
    return (
      <>
        <div className="page-head"><div className="page-title">路过小纸条</div><div className="page-sub">访客留言墙 · 需登录使用</div></div>
        <div className="notice">Supabase 后端尚未配置，小纸条暂不可用。</div>
      </>
    )
  }

  return (
    <>
      <div className="page-head"><div className="page-title">路过小纸条</div><div className="page-sub">访客留言墙 · 需登录使用</div></div>

      {user ? (
        <div className="notes-compose">
          <textarea className="textarea" placeholder="留一张小纸条…" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="btn" disabled={submitting} onClick={submit}>留下纸条</button>
        </div>
      ) : (
        <div className="notes-gate">未登录只能浏览 · <Link to="/login">登录</Link> 后可留纸条</div>
      )}

      {!ready && <div className="post-empty">加载中…</div>}
      {ready && notes.length === 0 && <div className="post-empty">还没有小纸条，来留第一张吧</div>}

      <div className="notes-grid">
        {notes.map((n) => (
          <div className="note-card" key={n.id}>
            <div className="note-text">{n.content}</div>
            <div className="note-meta"><span>{n.username}</span><span>{fmtTime(n.created_at)}</span></div>
          </div>
        ))}
      </div>
    </>
  )
}
