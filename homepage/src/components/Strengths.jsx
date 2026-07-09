import { strengths, skillGroups } from '../data/profile.js'
import './Strengths.css'

// 油漆色到 CSS 变量的映射（5 色油漆色板）
const ACCENT_MAP = {
  yellow:  { color: '#F1DD87', bg: 'rgba(241, 221, 135, 0.12)', border: 'rgba(241, 221, 135, 0.3)' },
  coral:   { color: '#FE7B8D', bg: 'rgba(254, 123, 141, 0.12)', border: 'rgba(254, 123, 141, 0.3)' },
  olive:   { color: '#B1AE81', bg: 'rgba(177, 174, 129, 0.12)', border: 'rgba(177, 174, 129, 0.3)' },
  lime:    { color: '#C6D056', bg: 'rgba(198, 208, 86, 0.12)',  border: 'rgba(198, 208, 86, 0.3)' },
  teal:    { color: '#33AFA4', bg: 'rgba(51, 175, 164, 0.12)',  border: 'rgba(51, 175, 164, 0.3)' },
}

function StrengthCard({ item, index }) {
  const accent = ACCENT_MAP[item.accent] || ACCENT_MAP.teal
  return (
    <div
      className="strength-card"
      data-reveal
      data-reveal-delay={`${index * 80}`}
      style={{
        '--accent': accent.color,
        '--accent-bg': accent.bg,
        '--accent-border': accent.border,
      }}
    >
      <div className="strength-card__header">
        <span className="strength-card__index">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="strength-card__title">{item.title}</h3>
      </div>
      <p className="strength-card__desc">{item.desc}</p>
      <div className="strength-card__tags">
        {item.tags.map((t) => (
          <span key={t} className="strength-card__tag">{t}</span>
        ))}
      </div>
      {/* 底部油漆色条 */}
      <div className="strength-card__bar"></div>
    </div>
  )
}

export default function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="container">
        <div className="strengths__header" data-reveal>
          <h2 className="section-title">
            六维<span className="gradient-text">能力矩阵</span>
          </h2>
          <p className="section-subtitle">
            增长、品牌、内容、数据——在交叉领域找到独特的运营切入点。
          </p>
        </div>

        <div className="strengths__grid">
          {strengths.map((item, i) => (
            <StrengthCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* 技能总览 */}
        <div className="strengths__skills" data-reveal>
          <h3 className="strengths__skills-title">工具栈</h3>
          <div className="strengths__skill-groups">
            {skillGroups.map((group) => (
              <div key={group.group} className="strengths__skill-group">
                <span className="strengths__skill-group-label">{group.group}</span>
                <div className="strengths__skill-list">
                  {group.items.map((item) => (
                    <span key={item} className="strengths__skill-chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
