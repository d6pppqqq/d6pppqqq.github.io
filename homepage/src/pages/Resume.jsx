import { Link } from 'react-router-dom'
import { profile, experiences, campus, photography } from '../data/profile.js'

// 实习经历（Experience）— 只放企业实习，校园经历独立成区，避免学生干部资历被吞掉
const work = experiences.map((e) => ({ kind: 'work', ...e }))

export default function Resume() {
  return (
    <>
      <section className="section about">
        <h2 className="section-title">About</h2>
        <p><b>{profile.tagline}</b></p>
        <p>{profile.bio}</p>
      </section>

      <section className="section">
        <h2 className="section-title">Experience <span className="section-hint">full case files on the <Link to="/work" style={{ color: 'var(--accent)', fontWeight: 600 }}>Work</Link> page →</span></h2>
        {work.map((e, i) => (
          <div className="exp-item" key={i}>
            {e.logo ? (
              <img className="exp-logo-img" src={e.logo} alt={e.company} />
            ) : (
              <div className="slot exp-logo">logo</div>
            )}
            <div>
              <div className="exp-head">
                <span className="exp-company">{e.company}</span>
                <span className="exp-date">{e.period}</span>
              </div>
              <div className="exp-role">{e.role}{e.location ? ` · ${e.location}` : ''}</div>
              {e.desc && (e.desc.includes('\n') ? (
                <ul className="exp-desc-list">
                  {e.desc.split('\n').map((l, j) => <li key={j}>{l}</li>)}
                </ul>
              ) : (
                <div className="exp-desc">{e.desc}</div>
              ))}
              {e.skills && (
                <div className="exp-tags">
                  {e.skills.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 校园经历（学生干部）：时间 / 项目内容与产出 / 负责人角色 三要素齐备 */}
      <section className="section">
        <h2 className="section-title">Campus &amp; Student Leadership</h2>
        {campus.map((c, i) => (
          <div className="exp-item" key={i}>
            {c.logo ? (
              <img className="exp-logo-img" src={c.logo} alt={c.org} />
            ) : (
              <div className="slot exp-logo">logo</div>
            )}
            <div>
              <div className="exp-head">
                <span className="exp-company">{c.org}</span>
                <span className="exp-date">{c.period}</span>
              </div>
              <div className="exp-role">{c.role}</div>
              {c.leadership && <div className="exp-lead"><b>Leadership:</b> {c.leadership}</div>}
              <div className="exp-desc">{c.desc}</div>
              {c.outputs && (
                <div className="exp-tags">
                  {c.outputs.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 摄影与影像：只作个人专长/技能侧证据，不含学生干部身份 */}
      <section className="section">
        <h2 className="section-title">Photography &amp; Video</h2>
        <div className="photo-list">
          {photography.disciplines.map((d, i) => (
            <div className="photo-row" key={i}>
              <span className="photo-k">{d.k}</span>
              <span className="photo-v">{d.v}</span>
            </div>
          ))}
        </div>
        <div className="exp-tags" style={{ marginTop: 14 }}>
          {photography.tools.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Education</h2>
        <div className="edu-item">
          <div className="edu-school">{profile.education.school}</div>
          <div className="edu-meta">{profile.education.major} · {profile.education.degree} · {profile.education.period}</div>
        </div>
      </section>
    </>
  )
}
