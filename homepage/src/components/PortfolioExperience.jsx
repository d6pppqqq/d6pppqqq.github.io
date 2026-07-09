import { useEffect, useMemo, useRef, useState } from 'react'
import { profile, experiences, strengths, skillGroups } from '../data/profile.js'
import { projects } from '../data/projects.js'
import './PortfolioExperience.css'

function FluidIntro({ active, onEnter }) {
  const canvasRef = useRef(null)
  const title = profile.nameEn || profile.name
  const subtitle = `${profile.roles.join(' / ')} / Portfolio`

  useEffect(() => {
    if (!active) return undefined

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let height = 0
    let pointer = { x: 0.58, y: 0.48, active: false }
    const colors = ['#33afa4', '#c6d056', '#f1dd87', '#fe7b8d', '#ffffff']
    const drops = Array.from({ length: 34 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 18 + Math.random() * 66,
      vx: (Math.random() - 0.5) * 0.0014,
      vy: (Math.random() - 0.5) * 0.0014,
      color: colors[i % colors.length],
      phase: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const move = (event) => {
      pointer = {
        x: event.clientX / Math.max(window.innerWidth, 1),
        y: event.clientY / Math.max(window.innerHeight, 1),
        active: true,
      }
    }

    const tick = (time) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#060606'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      drops.forEach((drop, index) => {
        const pull = pointer.active ? 0.0022 : 0.0006
        drop.vx += (pointer.x - drop.x) * pull * (index % 3 === 0 ? 1.4 : 0.45)
        drop.vy += (pointer.y - drop.y) * pull * (index % 4 === 0 ? 1.2 : 0.4)
        drop.vx *= 0.982
        drop.vy *= 0.982
        drop.x += drop.vx + Math.sin(time * 0.0004 + drop.phase) * 0.0006
        drop.y += drop.vy + Math.cos(time * 0.00035 + drop.phase) * 0.0006

        if (drop.x < -0.12) drop.x = 1.12
        if (drop.x > 1.12) drop.x = -0.12
        if (drop.y < -0.12) drop.y = 1.12
        if (drop.y > 1.12) drop.y = -0.12

        const x = drop.x * width
        const y = drop.y * height
        const radius = drop.r * (1 + Math.sin(time * 0.001 + drop.phase) * 0.18)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `${drop.color}cc`)
        gradient.addColorStop(0.55, `${drop.color}44`)
        gradient.addColorStop(1, `${drop.color}00`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalCompositeOperation = 'source-over'
      const vignette = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.72)
      vignette.addColorStop(0, 'rgba(6,6,6,0)')
      vignette.addColorStop(1, 'rgba(6,6,6,0.82)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
    }
  }, [active])

  useEffect(() => {
    if (!active) return undefined
    const onWheel = (event) => {
      if (event.deltaY > 10) onEnter()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [active, onEnter])

  return (
    <section className={`intro-stage ${active ? 'is-active' : 'is-hidden'}`} aria-hidden={!active}>
      <canvas ref={canvasRef} className="intro-stage__canvas" />
      <div className="intro-stage__content">
        <p className="intro-stage__eyebrow">Portfolio / Growth / Creative Ops</p>
        <h1 className="intro-stage__title">{title}</h1>
        <p className="intro-stage__subtitle">
          {subtitle.split('').map((char, index) => (
            <span key={`${char}-${index}`} style={{ '--delay': `${index * 32}ms` }}>
              {char === ' ' ? '\u00a0' : char}
            </span>
          ))}
        </p>
        <button className="intro-stage__enter" onClick={onEnter} type="button">
          enter
        </button>
      </div>
      <button className="intro-stage__corner" onClick={onEnter} type="button" aria-label="进入作品集">
        <span>OPEN</span>
      </button>
      <div className="intro-stage__arrow intro-stage__arrow--one" />
      <div className="intro-stage__arrow intro-stage__arrow--two" />
    </section>
  )
}

function GridBackground({ enabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    let offset = 0
    let pointer = null
    const square = window.matchMedia('(max-width: 720px)').matches ? 52 : 42
    const trail = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const move = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      trail.unshift({ ...pointer, life: 1 })
      trail.splice(24)
    }

    const leave = () => {
      pointer = null
    }

    const tick = () => {
      offset = (offset + 0.22) % square
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#060606'
      ctx.fillRect(0, 0, width, height)

      for (let x = -square + offset; x < width + square; x += square) {
        for (let y = -square + offset; y < height + square; y += square) {
          const dx = pointer ? x + square / 2 - pointer.x : 9999
          const dy = pointer ? y + square / 2 - pointer.y : 9999
          const distance = Math.sqrt(dx * dx + dy * dy)
          const heat = Math.max(0, 1 - distance / 190)

          if (heat > 0.03) {
            ctx.fillStyle = `rgba(255,255,255,${0.06 + heat * 0.22})`
            ctx.shadowColor = `rgba(51,175,164,${heat * 0.5})`
            ctx.shadowBlur = 16 * heat
            ctx.fillRect(x, y, square, square)
            ctx.shadowBlur = 0
          }

          ctx.strokeStyle = `rgba(255,255,255,${0.055 + heat * 0.13})`
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, square, square)
        }
      }

      trail.forEach((point, index) => {
        point.life -= 0.02
        const alpha = Math.max(point.life, 0) * (1 - index / 30)
        ctx.fillStyle = `rgba(198,208,86,${alpha * 0.2})`
        ctx.shadowColor = `rgba(254,123,141,${alpha * 0.5})`
        ctx.shadowBlur = 28
        ctx.fillRect(
          Math.floor(point.x / square) * square + offset,
          Math.floor(point.y / square) * square + offset,
          square,
          square,
        )
      })

      const fade = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.72)
      fade.addColorStop(0, 'rgba(6,6,6,0)')
      fade.addColorStop(1, 'rgba(6,6,6,0.82)')
      ctx.fillStyle = fade
      ctx.fillRect(0, 0, width, height)

      raf = requestAnimationFrame(tick)
    }

    resize()
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
      window.removeEventListener('resize', resize)
    }
  }, [enabled])

  return <canvas ref={canvasRef} className="portfolio-grid" aria-hidden="true" />
}

function StatStrip() {
  return (
    <div className="stat-strip" aria-label="关键数据">
      {profile.stats.map((stat) => (
        <div className="stat-strip__item" key={stat.label}>
          <strong>
            {stat.prefix}
            {stat.value}
            {stat.suffix}
          </strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

function ProjectRail() {
  return (
    <section className="portfolio-section" id="projects">
      <div className="portfolio-section__head">
        <p>Selected Work</p>
        <h2>把增长、内容和品牌动作做成可复用系统。</h2>
      </div>
      <div className="project-rail">
        {projects.map((project, index) => (
          <article className="project-tile" key={project.id} style={{ '--accent': project.gradient, '--i': index }}>
            <div className="project-tile__top">
              <span>{project.category}</span>
              <span>{project.period}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="project-tile__metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="project-tile__tags">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ExperienceStack() {
  return (
    <section className="portfolio-section portfolio-section--split" id="about">
      <div className="portfolio-section__head">
        <p>Trajectory</p>
        <h2>在品牌、公关、产品运营和商业化之间快速切换。</h2>
      </div>
      <div className="timeline">
        {experiences.map((item) => (
          <article className="timeline__item" key={`${item.company}-${item.period}`}>
            <span>{item.period}</span>
            <div>
              <h3>{item.role}</h3>
              <p>{item.company} · {item.location}</p>
              {item.desc && <small>{item.desc}</small>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CapabilityMatrix() {
  const skills = useMemo(() => skillGroups.flatMap((group) => group.items.slice(0, 4)), [])

  return (
    <section className="portfolio-section" id="strengths">
      <div className="portfolio-section__head">
        <p>Capability Matrix</p>
        <h2>从策略到交付，一张网格里看清能力组合。</h2>
      </div>
      <div className="capability-grid">
        {strengths.map((item) => (
          <article className="capability-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div>
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="skill-cloud" aria-label="技能">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  )
}

function ContactPanel() {
  return (
    <section className="contact-panel" id="contact">
      <div>
        <p>Contact</p>
        <h2>一起做点有价值的。</h2>
        <span>{profile.tagline}</span>
      </div>
      <div className="contact-panel__links">
        <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        <a href={`tel:${profile.contact.phone.replace(/\D/g, '')}`}>{profile.contact.phone}</a>
        {profile.socials.map((social) => (
          <a href={social.url} target="_blank" rel="noreferrer" key={social.url}>
            {social.platform} · {social.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default function PortfolioExperience() {
  const [entered, setEntered] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  const enter = () => {
    setEntered(true)
    requestAnimationFrame(() => {
      document.getElementById('portfolio-main')?.focus()
    })
  }

  return (
    <div className={`portfolio-experience ${entered ? 'has-entered' : ''}`}>
      <FluidIntro active={!entered} onEnter={enter} />
      <div className="portfolio-shell" aria-hidden={!entered}>
        <GridBackground enabled={entered} />
        <nav className="portfolio-nav" aria-label="作品集导航">
          <a href="#top" className="portfolio-nav__brand">{profile.name}</a>
          <div>
            <a href="#about">经历</a>
            <a href="#projects">项目</a>
            <a href="#strengths">能力</a>
            <a href="#contact">联系</a>
          </div>
        </nav>
        <main id="portfolio-main" tabIndex="-1">
          <section className="hero-panel" id="top">
            <div className="hero-panel__copy">
              <p className="hero-panel__eyebrow">Kay Wu / Portfolio</p>
              <h1>{profile.name}</h1>
              <h2>{profile.roles.join(' · ')}</h2>
              <p>{profile.bio}</p>
              <div className="hero-panel__actions">
                <a href="#projects">查看项目</a>
                <a href="#contact">联系我</a>
              </div>
            </div>
            <div className="hero-panel__portrait" aria-label={`${profile.name} 头像`}>
              <img src="/avatar.jpg" alt={profile.name} />
              <span>{profile.education.school}</span>
            </div>
          </section>
          <StatStrip />
          <ExperienceStack />
          <ProjectRail />
          <CapabilityMatrix />
          <ContactPanel />
        </main>
      </div>
    </div>
  )
}
