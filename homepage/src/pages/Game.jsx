import { useEffect, useRef, useState } from 'react'

const W = 800
const H = 450

export default function Game() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [over, setOver] = useState(false)
  const [best, setBest] = useState(() => Number(localStorage.getItem('koi-best') || 0))
  const st = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const state = {
      ship: { x: W / 2, y: H - 46, w: 40, h: 30 },
      bullets: [],
      enemies: [],
      shootTimer: 0,
      spawnTimer: 1.2,
      mouseX: W / 2,
      keys: {},
      over: false,
      score: 0,
      lives: 3,
    }
    st.current = state

    const shoot = () => state.bullets.push({ x: state.ship.x, y: state.ship.y - 16, w: 3, h: 12, vy: 430 })

    const keydown = (e) => {
      if (['ArrowLeft', 'ArrowRight', ' ', 'a', 'd', 'A', 'D'].includes(e.key)) e.preventDefault()
      state.keys[e.key] = true
      if (e.key === ' ') shoot()
    }
    const keyup = (e) => { state.keys[e.key] = false }
    const mousemove = (e) => {
      const r = canvas.getBoundingClientRect()
      state.mouseX = (e.clientX - r.left) / r.width * W
      state.ship.x = state.mouseX
    }
    const mousedown = (e) => {
      const r = canvas.getBoundingClientRect()
      state.mouseX = (e.clientX - r.left) / r.width * W
      state.ship.x = state.mouseX
      shoot()
    }

    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)
    canvas.addEventListener('mousemove', mousemove)
    canvas.addEventListener('mousedown', mousedown)

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

    function spawnEnemy() {
      const type = Math.random() < 0.72 ? 1 : 2
      state.enemies.push({
        x: 25 + Math.random() * (W - 50),
        y: -30,
        w: type === 2 ? 46 : 36,
        h: type === 2 ? 30 : 24,
        vy: type === 2 ? 70 : 110 + Math.random() * 60,
        type,
      })
    }

    function loseLife() {
      const s = state
      s.lives -= 1
      setLives(s.lives)
      if (s.lives <= 0) {
        s.over = true
        setOver(true)
        setBest((prev) => {
          const b = Math.max(prev, s.score)
          localStorage.setItem('koi-best', String(b))
          return b
        })
      }
    }

    function update(dt) {
      const s = state
      if (s.over) return

      const left = s.keys['ArrowLeft'] || s.keys['a'] || s.keys['A']
      const right = s.keys['ArrowRight'] || s.keys['d'] || s.keys['D']
      if (left) s.ship.x -= 340 * dt
      if (right) s.ship.x += 340 * dt
      s.ship.x = clamp(s.ship.x, s.ship.w / 2, W - s.ship.w / 2)

      s.shootTimer -= dt
      if (s.shootTimer <= 0) { shoot(); s.shootTimer = 0.22 }

      for (const b of s.bullets) b.y -= b.vy * dt
      s.bullets = s.bullets.filter((b) => b.y > -20)

      s.spawnTimer -= dt
      if (s.spawnTimer <= 0) { spawnEnemy(); s.spawnTimer = Math.max(0.5, 1.1 - s.score * 0.005) }

      for (const e of s.enemies) e.y += e.vy * dt
      s.enemies = s.enemies.filter((e) => e.y < H + 40)

      const hitEnemies = new Set()
      const deadBullets = new Set()
      for (let bi = 0; bi < s.bullets.length; bi++) {
        const b = s.bullets[bi]
        for (let ei = 0; ei < s.enemies.length; ei++) {
          const e = s.enemies[ei]
          if (b.x > e.x - e.w / 2 && b.x < e.x + e.w / 2 && b.y > e.y - e.h / 2 && b.y < e.y + e.h / 2) {
            deadBullets.add(bi); hitEnemies.add(ei); break
          }
        }
      }
      for (let ei = 0; ei < s.enemies.length; ei++) {
        const e = s.enemies[ei]
        const sx = s.ship.x, sy = s.ship.y
        if (sx > e.x - e.w / 2 - s.ship.w / 2 && sx < e.x + e.w / 2 + s.ship.w / 2 && sy > e.y - e.h / 2 - s.ship.h / 2 && sy < e.y + e.h / 2 + s.ship.h / 2) {
          hitEnemies.add(ei)
          loseLife()
        }
      }

      if (hitEnemies.size) {
        const ns = s.score + hitEnemies.size
        s.score = ns
        setScore(ns)
        s.enemies = s.enemies.filter((_, i) => !hitEnemies.has(i))
        s.bullets = s.bullets.filter((_, i) => !deadBullets.has(i))
      }
    }

    function draw() {
      const s = state
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#fafafa'
      ctx.fillRect(0, 0, W, H)
      ctx.strokeStyle = '#f0f0f0'
      ctx.lineWidth = 1
      for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

      ctx.fillStyle = '#F42E7A'
      for (const b of s.bullets) ctx.fillRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h)

      for (const e of s.enemies) {
        ctx.fillStyle = e.type === 2 ? '#242424' : '#888888'
        if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(e.x - e.w / 2, e.y - e.h / 2, e.w, e.h, 6); ctx.fill() }
        else { ctx.fillRect(e.x - e.w / 2, e.y - e.h / 2, e.w, e.h) }
        ctx.fillStyle = '#fff'
        ctx.fillRect(e.x - e.w / 4 - 2, e.y - 3, 4, 4)
        ctx.fillRect(e.x + e.w / 4 - 2, e.y - 3, 4, 4)
      }

      const sx = s.ship.x, sy = s.ship.y
      ctx.fillStyle = '#F42E7A'
      ctx.beginPath()
      ctx.moveTo(sx, sy - s.ship.h / 2)
      ctx.lineTo(sx - s.ship.w / 2, sy + s.ship.h / 2)
      ctx.lineTo(sx + s.ship.w / 2, sy + s.ship.h / 2)
      ctx.closePath()
      ctx.fill()
    }

    let raf
    let last = performance.now()
    function loop(t) {
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      update(dt)
      draw()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
      canvas.removeEventListener('mousemove', mousemove)
      canvas.removeEventListener('mousedown', mousedown)
    }
  }, [])

  const restart = () => {
    const s = st.current
    if (!s) return
    s.score = 0; s.lives = 3; s.over = false
    s.enemies = []; s.bullets = []; s.ship.x = W / 2; s.spawnTimer = 1.2; s.shootTimer = 0
    setScore(0); setLives(3); setOver(false)
  }

  return (
    <>
      <div className="page-head">
        <div className="page-title">打飞机</div>
        <div className="page-sub">移动鼠标（或 ← → 键）控制，自动开火 · 摸鱼小游戏</div>
      </div>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} width={W} height={H} className="game-canvas" />
        {over && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,.86)', borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#F42E7A' }}>GAME OVER</div>
            <div style={{ marginTop: 8, color: '#888' }}>得分 {score} · 最高 {best}</div>
            <button className="btn" style={{ marginTop: 20 }} onClick={restart}>重新开始</button>
          </div>
        )}
      </div>
      <div className="game-hud">
        <span>得分 <b>{score}</b></span>
        <span>生命 <b>{'♥'.repeat(Math.max(0, lives)) || '—'}</b></span>
        <span>最高 <b>{best}</b></span>
      </div>
    </>
  )
}
