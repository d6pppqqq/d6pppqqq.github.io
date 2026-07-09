import { profile } from '../data/profile.js'
import { characterAssetMap } from '../data/characterAssets.js'
import './Hero.css'

export default function Hero() {
  const heroAsset = characterAssetMap.workspace
  const mobileHeroAsset = characterAssetMap.coding

  const scrollTo = (href) => (e) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero" id="top">
      {/* 油漆动画背景（抽象油漆流动，替代视频） */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__blob hero__blob--1"></div>
        <div className="hero__blob hero__blob--2"></div>
        <div className="hero__blob hero__blob--3"></div>
        <div className="hero__blob hero__blob--4"></div>
        <div className="hero__blob hero__blob--5"></div>
        <div className="hero__grid"></div>
        <div className="hero__noise"></div>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="hero__status-dot"></span>
            {profile.roles.join('  ·  ')}
          </div>

          <h1 className="hero__title animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="hero__title-line">你好，我是</span>
            <span className="hero__title-name gradient-text">吴可奕</span>
          </h1>

          <p className="hero__tagline animate-fade-up" style={{ animationDelay: '0.38s' }}>
            {profile.tagline}
          </p>

          <div className="hero__actions animate-fade-up" style={{ animationDelay: '0.55s' }}>
            <a href="#projects" onClick={scrollTo('#projects')} className="hero__btn hero__btn--primary">
              查看作品
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#characters" onClick={scrollTo('#characters')} className="hero__btn hero__btn--ghost">
              角色素材
            </a>
          </div>
        </div>

        <figure className="hero__persona animate-fade-up" style={{ animationDelay: '0.32s' }}>
          <div className="hero__persona-stage">
            <picture>
              <source media="(max-width: 640px)" srcSet={mobileHeroAsset.image} />
              <img src={heroAsset.image} alt={heroAsset.title} />
            </picture>
          </div>
          <figcaption>
            <span>{heroAsset.label} / 这些都是我</span>
            <strong>{heroAsset.title}</strong>
          </figcaption>
        </figure>
      </div>

      <a href="#about" onClick={scrollTo('#about')} className="hero__scroll" aria-label="向下滚动">
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel"></span>
        </span>
        <span className="hero__scroll-text">SCROLL</span>
      </a>
    </section>
  )
}
