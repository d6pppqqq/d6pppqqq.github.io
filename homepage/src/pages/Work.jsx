import { useState } from 'react'
import { caseFiles } from '../data/caseFiles.js'

// 完整工作全案：每张案例卡 = 背景 → 任务 → 执行 → 结果 → 可复用交付物
export default function Work() {
  const [open, setOpen] = useState(caseFiles[0]?.id)

  return (
    <>
      <div className="page-head">
        <div className="page-title">Work</div>
        <div className="page-sub">Full case files — what I was handed, what I built, what numbers moved.</div>
      </div>

      <section className="section bring">
        <h2 className="section-title">What I bring</h2>
        <div className="bring-grid">
          <div className="bring-card">
            <div className="bring-k">01 · Own a launch end-to-end</div>
            <p>Give me a new product and a budget line and you get a system, not a task list: creator tiers, AIGC asset pipeline, GEO channel, and per-yuan reconciliation — proven on a real AI hardware launch with RMB 100K cold-start.</p>
          </div>
          <div className="bring-card">
            <div className="bring-k">02 · Trust your numbers</div>
            <p>I strip fake orders and unify GMV definitions before I report anything. UTM funnels, Python/SQL, anomaly detection on tens of thousands of raw records — the dashboards I leave behind are the ones your finance team won't argue with.</p>
          </div>
          <div className="bring-card">
            <div className="bring-k">03 · Work in English, ship globally</div>
            <p>Four regions (US / W. Europe / SEA / Japan) run through my inbox: 500+ creator pool, multi-round email negotiation to target cost, per-region hooks. English is my working language, not my certificate.</p>
          </div>
        </div>
      </section>

      {caseFiles.map((c) => {
        const isOpen = open === c.id
        return (
          <article className="case" key={c.id}>
            <button className="case-head" onClick={() => setOpen(isOpen ? null : c.id)}>
              {c.logo ? (
                <img className="exp-logo-img" src={c.logo} alt={c.company} />
              ) : (
                <div className="slot exp-logo">logo</div>
              )}
              <div className="case-head-text">
                <div className="case-title-row">
                  <span className="case-company">{c.company}</span>
                  <span className="exp-date">{c.period}</span>
                </div>
                <div className="case-role">{c.role} · {c.location}</div>
                <div className="case-tagline">{c.tagline}</div>
              </div>
              <span className={`case-chevron${isOpen ? ' open' : ''}`} aria-hidden="true">▾</span>
            </button>

            {isOpen && (
              <div className="case-body">
                <div className="case-block">
                  <div className="case-k">Context</div>
                  <p>{c.context}</p>
                </div>
                <div className="case-block">
                  <div className="case-k">Mission</div>
                  <p>{c.mission}</p>
                </div>
                <div className="case-block">
                  <div className="case-k">Execution</div>
                  <ul className="case-list">
                    {c.execution.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
                <div className="case-block">
                  <div className="case-k">Results</div>
                  <div className="case-metrics">
                    {c.results.map((m, i) => (
                      <div className="case-metric" key={i}>
                        <div className="cm-value">{m.value}</div>
                        <div className="cm-label">{m.label}</div>
                        <div className="cm-note">{m.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="case-block case-takeaway">
                  <div className="case-k">Reusable takeaway</div>
                  <p>{c.takeaways}</p>
                </div>
              </div>
            )}
          </article>
        )
      })}
    </>
  )
}
