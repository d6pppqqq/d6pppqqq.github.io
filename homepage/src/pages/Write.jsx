import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured, OWNER_EMAIL } from '../lib/supabase.js'

export default function Write() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [err, setErr] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null))
  }, [])

  const isOwner = user && user.email === OWNER_EMAIL

  async function submit(e) {
    e.preventDefault()
    if (!supabase || !isOwner) return
    setSaving(true); setErr('')
    const slug = 'post-' + Date.now().toString(36)
    const tagArr = tags.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean)
    const excerpt = content.replace(/\s+/g, ' ').slice(0, 60)
    const { error } = await supabase.from('blog_posts').insert({
      title, slug, content, excerpt, tags: tagArr, published: true,
    })
    setSaving(false)
    if (error) setErr(error.message)
    else navigate('/blog')
  }

  if (!isSupabaseConfigured) {
    return <div className="login-wrap"><div className="login-title">写文章</div><div className="notice">Supabase 后端尚未配置。</div></div>
  }
  if (!user) {
    return <div className="login-wrap"><div className="login-title">写文章</div><div className="notice">请先 <Link to="/login">登录</Link></div></div>
  }
  if (!isOwner) {
    return <div className="login-wrap"><div className="login-title">写文章</div><div className="notice">只有站长可以发布文章。</div></div>
  }

  return (
    <>
      <div className="page-head">
        <div className="page-title">写文章</div>
        <div className="page-sub">发布后立即出现在 Blog</div>
      </div>
      <form onSubmit={submit}>
        <div className="field">
          <label>标题</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="标题" />
        </div>
        <div className="field">
          <label>正文</label>
          <textarea className="textarea" style={{ minHeight: 220 }} value={content} onChange={(e) => setContent(e.target.value)} required placeholder="写点什么…" />
        </div>
        <div className="field">
          <label>标签（逗号分隔，可选）</label>
          <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="AI, 营销, 流量" />
        </div>
        {err && <div className="form-err">{err}</div>}
        <button className="btn" disabled={saving} type="submit">{saving ? '发布中…' : '发布'}</button>
      </form>
    </>
  )
}
