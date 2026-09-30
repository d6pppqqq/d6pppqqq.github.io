import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured, OWNER_EMAIL } from '../lib/supabase.js'
import { seedPosts } from '../data/blogPosts.js'
import { insightPosts } from '../data/insightPosts.js'

const CATEGORIES = ['All', 'Gaming', 'FMCG', 'Macro', 'AI & GTM']

const postCategory = (p) => {
  const t = (p.tags || []).join(' ').toLowerCase()
  if (/gaming|battle royale|esports/.test(t)) return 'Gaming'
  if (/fmcg|快消|brand/.test(t)) return 'FMCG'
  if (/macro|宏观/.test(t)) return 'Macro'
  return 'AI & GTM'
}

const fmtTime = (t) => new Date(t).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })

// Featured 长文：默认折叠为第一段 teaser，点开读全文
function FeaturedPost({ p }) {
  const [open, setOpen] = useState(false)
  const teaser = p.content.split('\n\n')[0]
  return (
    <div className="post-item featured-post">
      <div className="slot post-thumb">cover</div>
      <div>
        <div className="post-title">{p.title}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0 12px' }}>
          {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
          {open ? p.content : (teaser.length > 340 ? teaser.slice(0, 340) + '…' : teaser)}
        </div>
        <div className="post-meta">
          <span>{p.date}</span>
          <button onClick={() => setOpen(!open)}>{open ? '收起' : '阅读全文'}</button>
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  const [ready, setReady] = useState(false)
  const [cat, setCat] = useState('All')
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [likeCounts, setLikeCounts] = useState({})
  const [likedSet, setLikedSet] = useState({})
  const [commentMap, setCommentMap] = useState({})
  const [openPost, setOpenPost] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) { setReady(true); return }
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      // 表尚未创建时这些查询会报错，但 Promise.all 不 reject（supabase-js 返回 { error }），
      // posts 保持空 → 页面兜底显示本地 seed 文章。
      const [{ data: posts }, { data: likes }, { data: comments }, { data: profiles }] = await Promise.all([
        supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false }),
        supabase.from('blog_likes').select('post_id, user_id'),
        supabase.from('blog_comments').select('id, post_id, user_id, content, created_at').order('created_at', { ascending: true }),
        supabase.from('profiles').select('id, username'),
      ])
      const nameOf = {}
      for (const p of profiles || []) nameOf[p.id] = p.username || '访客'
      const lc = {}, ls = {}
      for (const l of likes || []) {
        lc[l.post_id] = (lc[l.post_id] || 0) + 1
        if (user && l.user_id === user.id) ls[l.post_id] = true
      }
      const cm = {}
      for (const c of comments || []) {
        ;(cm[c.post_id] ||= []).push({ id: c.id, content: c.content, created_at: c.created_at, username: nameOf[c.user_id] || '访客', userId: c.user_id })
      }
      setPosts(posts || [])
      setLikeCounts(lc); setLikedSet(ls); setCommentMap(cm)
      setReady(true)
    })()
  }, [])

  async function requireUser() {
    if (!supabase) return null
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }

  async function toggleLike(postId) {
    const u = await requireUser()
    if (!u) { setMsg('请先登录再点赞'); return }
    if (likedSet[postId]) {
      await supabase.from('blog_likes').delete().eq('post_id', postId).eq('user_id', u.id)
      setLikedSet((m) => ({ ...m, [postId]: false }))
      setLikeCounts((m) => ({ ...m, [postId]: Math.max(0, (m[postId] || 1) - 1) }))
    } else {
      const { error } = await supabase.from('blog_likes').insert({ post_id: postId, user_id: u.id })
      if (!error) {
        setLikedSet((m) => ({ ...m, [postId]: true }))
        setLikeCounts((m) => ({ ...m, [postId]: (m[postId] || 0) + 1 }))
      }
    }
  }

  async function submitComment(postId) {
    const text = commentText.trim()
    if (!text) return
    const u = await requireUser()
    if (!u) { setMsg('请先登录再评论'); return }
    const { data, error } = await supabase.from('blog_comments').insert({ post_id: postId, user_id: u.id, content: text }).select('id, created_at').single()
    if (!error) {
      setCommentMap((m) => ({ ...m, [postId]: [...(m[postId] || []), { id: data.id, content: text, created_at: data.created_at, username: (user?.email || '').split('@')[0] || '我', userId: u.id }] }))
      setCommentText('')
    }
  }

  const showSeed = posts.length === 0
  const featured = insightPosts.filter((p) => cat === 'All' || p.category === cat)
  const remotePosts = posts.filter((p) => cat === 'All' || postCategory(p) === cat)

  return (
    <>
      <div className="page-head"><div className="page-title">Blog</div><div className="page-sub">Insights · Gaming / FMCG / Macro / AI &amp; GTM</div></div>
      <div className="cat-bar">
        {CATEGORIES.map((c) => (
          <button key={c} className={cat === c ? 'cat-btn active' : 'cat-btn'} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      {user && user.email === OWNER_EMAIL && (
        <div style={{ marginBottom: 24 }}>
          <Link to="/write" className="btn btn-ghost">＋ 写文章</Link>
        </div>
      )}
      {!isSupabaseConfigured && <div className="notice">Supabase 后端尚未配置，点赞 / 评论暂不可用，先读文。</div>}
      {msg && <div className="notice">{msg} · <Link to="/login">去登录</Link></div>}
      {!ready && <div className="post-empty">加载中…</div>}

      {featured.length > 0 && (
        <>
          <div className="featured-k">Featured analysis</div>
          {featured.map((p) => <FeaturedPost key={p.id} p={p} />)}
        </>
      )}
      {cat !== 'All' && ready && remotePosts.length === 0 && featured.length === 0 && (
        <div className="post-empty">No posts under “{cat}” yet — more analysis landing soon.</div>
      )}

      {showSeed && cat === 'All' && ready && seedPosts.map((p) => (
        <div className="post-item" key={p.id}>
          <div className="slot post-thumb">封面</div>
          <div>
            <div className="post-title">{p.title}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0 12px' }}>
              {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{p.content}</div>
            <div className="post-meta"><span>{p.date}</span></div>
          </div>
        </div>
      ))}

      {remotePosts.map((p) => (
        <div className="post-item" key={p.id}>
          <div className="slot post-thumb">封面</div>
          <div>
            <div className="post-title">{p.title}</div>
            <div style={{ fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-wrap', marginTop: 4 }}>{p.content || p.excerpt}</div>
            <div className="post-meta">
              <span>{fmtTime(p.created_at)}</span>
              <button className={likedSet[p.id] ? 'liked' : ''} onClick={() => toggleLike(p.id)}>♥ {likeCounts[p.id] || 0}</button>
              <button onClick={() => setOpenPost(openPost === p.id ? null : p.id)}>评论 {commentMap[p.id]?.length || 0}</button>
            </div>
            {openPost === p.id && (
              <div style={{ marginTop: 16, borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                {commentMap[p.id]?.length ? (
                  commentMap[p.id].map((c) => (
                    <div key={c.id} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 13, color: '#888' }}>{c.username} · {fmtTime(c.created_at)}</div>
                      <div style={{ fontSize: 14 }}>{c.content}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 13, color: '#b6b6b6', marginBottom: 12 }}>还没有评论</div>
                )}
                <div style={{ display: 'flex', gap: 10 }}>
                  <input className="input" placeholder="写点评论…" value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitComment(p.id)} />
                  <button className="btn" onClick={() => submitComment(p.id)}>发送</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
