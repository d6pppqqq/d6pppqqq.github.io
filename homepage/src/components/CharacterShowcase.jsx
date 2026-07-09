import { characterAssets } from '../data/characterAssets.js'
import './CharacterShowcase.css'

export default function CharacterShowcase() {
  const leadAsset = characterAssets[0]
  const actionAssets = characterAssets.slice(1)

  return (
    <section className="section character-showcase" id="characters">
      <div className="container">
        <div className="character-showcase__header" data-reveal>
          <h2 className="section-title">
            一组<span className="gradient-text">可复用视觉资产</span>
          </h2>
          <p className="section-subtitle">
            从原始像素图中拆出工作、内容、增长、影像等多种状态，作为项目模块、能力卡片和页面彩蛋的统一人物系统。
          </p>
        </div>

        <div className="character-showcase__layout">
          <article className="character-hero" data-reveal data-reveal-delay="80">
            <div className="character-hero__image-wrap">
              <img src={leadAsset.image} alt={leadAsset.title} className="character-hero__image" />
            </div>
            <div className="character-hero__content">
              <span className="character-hero__kicker">{leadAsset.label}</span>
              <h3>{leadAsset.title}</h3>
              <p>{leadAsset.description}</p>
            </div>
          </article>

          <div className="character-grid">
            {actionAssets.map((asset, index) => (
              <article
                className="character-tile"
                key={asset.id}
                data-reveal
                data-reveal-delay={`${120 + index * 35}`}
              >
                <div className="character-tile__image-wrap">
                  <img src={asset.image} alt={asset.title} className="character-tile__image" />
                </div>
                <div className="character-tile__body">
                  <span>{asset.label}</span>
                  <strong>{asset.title}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
