// 个人基础信息（基于简历真实内容，英文版）
export const profile = {
  name: 'Koi Wu',
  nameEn: 'aka Kay Wu',
  // 侧栏一句话定位
  headline: 'Operations / Growth / Commercialization · Economics @ Xiamen University',
  // Hero 一句话主张（自介）
  tagline: 'Man is not made for defeat. A man can be destroyed but not defeated.',
  // 个人介绍（自介）
  bio: "Economics undergraduate at CHOW Institute, Xiamen University. I move across product operations, PR, and commercialization. I've taken an e-commerce growth loop from 0 to 1, and independently led a ¥100K creator-marketing campaign.",
  // 联系方式
  contact: {
    email: 'kodakkkkeyi@qq.com',
    phone: '(+86) 197-2597-0207',
    location: 'Shanghai / Xiamen',
  },
  // 社交（侧栏三个按钮）
  socials: [
    { platform: 'GitHub', url: 'https://github.com/d6pppqqq' },
    { platform: 'Douyin', url: 'https://v.douyin.com/_zNK_hJtiVg/' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kay-wu-87014b37a/' },
  ],
  // 教育
  education: {
    school: 'Xiamen University',
    major: 'Economics (CHOW Institute)',
    degree: "Bachelor's Degree",
    period: '2023.09 — 2027.06',
  },
}

// 工作经历（英文）
export const experiences = [
  {
    company: 'T2 Entertainment',
    role: 'GTM Intern, Marketing Dept.',
    location: 'Shanghai',
    period: '2026.05 — Present',
    type: 'Internship',
    logo: '/logos/t2cn.jpg',
    skills: ['Creator marketing ops', 'GEO growth', 'Budget & reconciliation'],
    desc: "Independently led GTM growth and creator marketing for LYNSE, an AI voice-recorder card.\nManaged a ¥100K budget across dozens of KOC/KOL — screening, sampling, script review, editing, publishing and expense reconciliation — delivering ~80 pieces of seeding content and 700K+ organic impressions.\nOwned the pricing & benefits of the LYNSE product by analyzing competitors' pricing (Plaud / DingTalk, etc.) and customer feedback.\nBuilt a GEO (Generative Engine Optimization) workflow from scratch and codified it into an SOP.",
  },
  {
    company: 'Edelman',
    role: 'PR Intern',
    location: 'Shanghai',
    period: '2026.02 — 2026.05',
    type: 'Internship',
    logo: '/logos/edelman.jpeg',
    skills: ['Brand event planning', 'Media relations', 'Content strategy'],
    desc: 'Owned offline event preparation and execution for a health & wellness brand, coordinating a ~100㎡ booth build; contributed to year-round integrated communications and produced 3+ campaign plans; helped a pharma brand set up its corporate culture communications system.',
  },
  {
    company: 'Deepwisdom',
    role: 'Product Operations Intern',
    location: 'Xiamen',
    period: '2025.08 — 2025.11',
    type: 'Internship',
    logo: '/logos/deepwisdom.svg',
    skills: ['Cross-border user ops', 'Growth strategy', 'Data-driven decisions'],
    desc: 'Owned end-to-end overseas KOL marketing for an AI product — creator screening, outreach & negotiation, content co-creation and post-campaign review; tracked social trends, comments and conversion funnels, feeding user research back into content and growth strategy.',
  },
  {
    company: 'CITIC Securities',
    role: 'Macro Research Intern, Research Dept.',
    location: 'Beijing',
    period: '2024.07 — 2024.08',
    type: 'Internship',
    logo: '/logos/citic.jpeg',
  },
]

// 校园实践（英文）
export const campus = [
  {
    org: 'XMU School of Economics · Publicity Center',
    role: 'Deputy Director',
    period: '2025.06 — Present',
    logo: '/logos/xmu.jpeg',
    desc: "Managed a 40-person video team and built a content-production SOP; coordinated shooting for 25+ major events reaching 30K+ attendees; led the 'Understanding China' micro-video project to 10K+ views.",
  },
]

// 个人优势/能力卡片（预留，当前未在页面渲染）
export const strengths = [
  { title: 'Growth & Commercialization', desc: 'Built an e-commerce operations system from 0 to 1, established a full-funnel attribution model, and used data-driven monitoring to optimize GMV and CAC in tandem.', tags: ['Growth loop', 'Attribution modeling', 'GMV optimization'], accent: 'teal' },
  { title: 'Integrated Brand Communications', desc: 'From booth builds to integrated campaigns, coordinated design and execution across teams to land brand activations flawlessly.', tags: ['Integrated comms', 'Event execution', 'Media relations'], accent: 'olive' },
  { title: 'Creator Marketing & Project Management', desc: 'Owned a ¥100K creator budget, managed dozens of KOC/KOL through the full pipeline, shipped ~80 pieces of content on schedule.', tags: ['Budget management', 'Creator ops', 'Delivery & reconciliation'], accent: 'yellow' },
  { title: 'Content & Video Production', desc: 'Led a 40-person video team and directed micro-video projects end-to-end; fluent in PS / LR / DaVinci / FCPX.', tags: ['Team leadership', 'Video production', 'Visual design'], accent: 'coral' },
  { title: 'Data-Driven Decisions', desc: 'Python / SQL / SPSS for full-stack analytics; break down acquisition, retention and conversion funnels monthly to feed strategy.', tags: ['Python', 'SQL', 'Funnel analysis'], accent: 'lime' },
  { title: 'AIGC & AI Agents', desc: 'Proficient with Codex / Claude Code agents, Kling / Jimeng AIGC tools, and Figma prototyping to boost efficiency.', tags: ['AI agents', 'AIGC', 'Figma'], accent: 'teal' },
]

// 技能
export const skillGroups = [
  { group: 'Programming & Data', items: ['Python', 'SQL', 'SPSS'] },
  { group: 'Visual & Video', items: ['Photoshop', 'Lightroom', 'DaVinci', 'FCPX', 'CapCut', 'Xingtu'] },
  { group: 'AIGC & Design', items: ['Codex / Claude Code', 'Kling / Jimeng', 'GPT-image2', 'Figma'] },
  { group: 'Languages', items: ['English CET-6 (553)'] },
]
