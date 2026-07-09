import { profile, experiences, campus } from '../data/profile.js'
import { useCountUp } from '../hooks/useCountUp.js'
import './About.css'

// 数字滚动统计卡片
function StatCard({ stat, index }) {
  const [ref, display] = useCountUp(stat.value, {
    decimals: stat.decimals || 0,
    prefix: stat.prefix || '',
    suffix: stat.suffix || '',
    duration: 1800,
  })
  return (
    <div className="about__stat" ref={ref} data-reveal data-reveal-delay={`${index * 100}`}>
      <div className="about__stat-value gradient-text">{display}</div>
      <div className="about__stat-label">{stat.label}</div>
    </div>
  )
}

export default function About() {
  const { contact, education } = profile

  return (
    <section className="section about" id="about">
      <div className="container">
        {/* 模块标题 */}
        <div className="about__header" data-reveal>
          <h2 className="section-title">
            在<span className="gradient-text">数据与创意</span>之间，
            <br />
            找到品牌的精准落点
          </h2>
        </div>

        <div className="about__grid">
          {/* 左：头像 + 基础信息 */}
          <aside className="about__card" data-reveal data-reveal-delay="100">
            <div className="about__avatar-wrap">
              <img src="/avatar.jpg" alt="吴可奕" className="about__avatar" />
              <div className="about__avatar-ring"></div>
            </div>
            <h3 className="about__name">{profile.name}</h3>
            <p className="about__role">{profile.roles.join(' · ')}</p>

            <div className="about__contact-list">
              <a href={`mailto:${contact.email}`} className="about__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" strokeLinecap="round" />
                </svg>
                <span>{contact.email}</span>
              </a>
              <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="about__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{contact.phone}</span>
              </a>
              <div className="about__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{contact.location}</span>
              </div>
            </div>

            <div className="about__education">
              <div className="about__education-head">
                <span className="about__education-school">{education.school}</span>
                <span className="about__education-degree">{education.degree}</span>
              </div>
              <p className="about__education-major">{education.major}</p>
              <p className="about__education-period">{education.period}</p>
            </div>
          </aside>

          {/* 右：介绍 + 数据 + 经历 */}
          <div className="about__main">
            <p className="about__bio" data-reveal>
              {profile.bio}
            </p>

            {/* 项目数据 */}
            <div className="about__stats">
              {profile.stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            {/* 经历时间线 */}
            <div className="about__timeline" data-reveal>
              <h3 className="about__block-title">工作经历</h3>
              <div className="about__timeline-list">
                {experiences.map((exp, i) => (
                  <div className="about__timeline-item" key={i}>
                    <div className="about__timeline-dot"></div>
                    <div className="about__timeline-content">
                      <div className="about__timeline-top">
                        <span className="about__timeline-company">{exp.company}</span>
                        <span className="about__timeline-period">{exp.period}</span>
                      </div>
                      <p className="about__timeline-role">
                        {exp.role}
                        <span className="about__timeline-loc"> · {exp.location}</span>
                      </p>
                      {exp.desc && <p className="about__timeline-desc">{exp.desc}</p>}
                      {exp.skills && (
                        <div className="about__timeline-skills">
                          {exp.skills.map((s) => (
                            <span key={s} className="about__chip">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="about__block-title about__block-title--mt">校园实践</h3>
              <div className="about__timeline-list">
                {campus.map((c, i) => (
                  <div className="about__timeline-item" key={i}>
                    <div className="about__timeline-dot"></div>
                    <div className="about__timeline-content">
                      <div className="about__timeline-top">
                        <span className="about__timeline-company">{c.org}</span>
                        <span className="about__timeline-period">{c.period}</span>
                      </div>
                      <p className="about__timeline-role">{c.role}</p>
                      <p className="about__timeline-desc">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
