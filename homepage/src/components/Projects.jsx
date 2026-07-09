import { projects } from '../data/projects.js'
import { characterAssetMap } from '../data/characterAssets.js'
import './Projects.css'

function ProjectCard({ project, index }) {
  const character = characterAssetMap[project.characterId]

  return (
    <article
      className={`project ${index % 2 === 1 ? 'project--reverse' : ''}`}
      data-reveal
      data-reveal-delay={`${index * 80}`}
    >
      <div className="project__visual" style={{ '--project-gradient': project.gradient }}>
        <div className="project__visual-inner">
          <div className="project__visual-orb project__visual-orb--1"></div>
          <div className="project__visual-orb project__visual-orb--2"></div>
          <div className="project__visual-grid"></div>
          {character && (
            <figure className="project__character">
              <img src={character.image} alt={character.title} />
              <figcaption>
                <span>{character.focus}</span>
                <strong>{character.title}</strong>
              </figcaption>
            </figure>
          )}
          <span className="project__visual-label">{project.category}</span>
          <span className="project__visual-period">{project.period}</span>
        </div>
      </div>

      <div className="project__body">
        <div className="project__tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="project__tag">{tag}</span>
          ))}
        </div>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__role">{project.role}</p>
        <p className="project__summary">{project.summary}</p>

        <ul className="project__highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="project__metrics">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="project__metric">
              <span className="project__metric-value">{metric.value}</span>
              <span className="project__metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="projects__header" data-reveal>
          <h2 className="section-title">
            从 0 到 1 的<span className="gradient-text">增长实战</span>
          </h2>
          <p className="section-subtitle">
            电商增长、跨境达人营销、品牌整合传播——每一个项目都是一次从洞察到落地的完整闭环。
          </p>
        </div>

        <div className="projects__list">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
