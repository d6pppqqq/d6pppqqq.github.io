import { profile, experiences, campus } from '../data/profile.js'

// 经历时间线：实习 + 校园实践合并，统一字段
const timeline = [
  ...experiences.map((e) => ({ kind: 'work', ...e })),
  ...campus.map((c) => ({ kind: 'campus', company: c.org, role: c.role, period: c.period, desc: c.desc, logo: c.logo })),
]

export default function Resume() {
  return (
    <>
      <section className="section about">
        <h2 className="section-title">About</h2>
        <p><b>{profile.tagline}</b></p>
        <p>{profile.bio}</p>
      </section>

      <section className="section">
        <h2 className="section-title">Experience</h2>
        {timeline.map((e, i) => (
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
