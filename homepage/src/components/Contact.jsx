import { useState } from 'react'
import { profile } from '../data/profile.js'
import './Contact.css'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = profile.contact.email

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  const scrollTo = (href) => (e) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="contact" id="contact">
      {/* 油漆背景 */}
      <div className="contact__bg" aria-hidden="true">
        <div className="contact__blob contact__blob--1"></div>
        <div className="contact__blob contact__blob--2"></div>
        <div className="contact__blob contact__blob--3"></div>
        <div className="contact__grid"></div>
      </div>

      <div className="container contact__inner">
        <div className="contact__content" data-reveal>
          <h2 className="contact__title">
            一起<span className="gradient-text">做点有价值的</span>
          </h2>
          <p className="contact__desc">
            品牌增长、用户运营、内容创意、商业分析——
            如果这些词也让你兴奋，欢迎聊聊。
          </p>

          <div className="contact__info">
            <a href={`mailto:${email}`} className="contact__info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" strokeLinecap="round" />
              </svg>
              <span>{email}</span>
            </a>
            <a href={`tel:${profile.contact.phone.replace(/\D/g, '')}`} className="contact__info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{profile.contact.phone}</span>
            </a>
            <div className="contact__info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{profile.contact.location}</span>
            </div>
            {profile.socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                className="contact__info-item contact__info-item--social"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact__social-mark">小</span>
                <span>{social.platform} · {social.label}</span>
              </a>
            ))}
          </div>

          <div className="contact__actions">
            <a href={`mailto:${email}`} className="contact__btn contact__btn--primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" strokeLinecap="round" />
              </svg>
              发送邮件
            </a>
            <button onClick={copyEmail} className="contact__btn contact__btn--ghost">
              {copied ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  已复制
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  复制邮箱
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 底部导航快速回到顶部 */}
      <footer className="contact__footer">
        <div className="container contact__footer-inner">
          <a href="#top" onClick={scrollTo('#top')} className="contact__footer-logo">
            <span className="contact__footer-mark">吴</span>
            <span>{profile.name}</span>
          </a>
          <nav className="contact__footer-nav">
            {['关于', '项目', '优势', '联系'].map((label) => {
              const href = label === '优势' ? '#strengths' : `#${label === '关于' ? 'about' : label}`
              return (
                <a key={href} href={href} onClick={scrollTo(href)} className="contact__footer-link">
                  {label}
                </a>
              )
            })}
          </nav>
        </div>
        <div className="container contact__footer-bottom">
          <p>© {new Date().getFullYear()} {profile.name}. 保留所有权利。</p>
          <p className="contact__footer-credit">把每一次触达，都做成一次精准的品牌对话</p>
        </div>
      </footer>
    </section>
  )
}
