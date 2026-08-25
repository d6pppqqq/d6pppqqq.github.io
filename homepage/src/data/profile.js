// 个人基础信息（基于简历真实内容）
export const profile = {
  name: '吴可奕',
  nameEn: 'Koi',
  // 侧栏一句话定位
  headline: '运营 / 增长 / 商业化 · 厦门大学经济学',
  // Hero 一句话主张（自介）
  tagline: 'A generalist who connects through communication.',
  // 个人介绍（自介）
  bio: "Economics undergraduate at Xiamen University. I move across PR, product operations, and commercialization — believing good marketing is 'reading people with data and moving them with creativity.' I've taken an e-commerce growth loop from 0 to 1, and independently led a ¥100K creator-marketing campaign.",
  // 联系方式
  contact: {
    email: 'kodakkkkeyi@qq.com',
    phone: '(+86) 197-2597-0207',
    location: '上海 / 厦门',
  },
  // 社交（侧栏三个按钮）
  socials: [
    { platform: 'GitHub', url: 'https://github.com/d6pppqqq' },
    { platform: '抖音', url: 'https://v.douyin.com/_zNK_hJtiVg/' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kay-wu-87014b37a/' },
  ],
  // 教育
  education: {
    school: '厦门大学',
    major: '经济学（创新实验班）',
    degree: '本科',
    period: '2023.09 — 2027.06',
    courses: '数理统计 · 宏观经济学 · 金融经济学 · 人工智能程序设计 · 人工智能金融学',
  },
}

// 工作经历（英文）
export const experiences = [
  {
    company: 'Shanghai Tianyou Software Co., Ltd.',
    role: 'GTM Intern, Marketing Dept.',
    location: 'Shanghai',
    period: '2026.05 — Present',
    type: '实习',
    skills: ['Creator marketing ops', 'GEO growth', 'Budget & reconciliation'],
    desc: "Independently led GTM growth and creator marketing for LYNSE, an AI voice-recorder card: managed a ¥100K budget across dozens of KOC/KOL — screening, sampling, script review, editing, publishing and expense reconciliation — delivering ~80 pieces of seeding content and 700K+ organic impressions. Also built a GEO (Generative Engine Optimization) workflow from scratch and codified it into an SOP.",
  },
  {
    company: 'Edelman',
    role: 'PR Intern',
    location: 'Shanghai',
    period: '2026.02 — 2026.05',
    type: '实习',
    skills: ['Brand event planning', 'Media relations', 'Content strategy'],
    desc: 'Owned offline event preparation and execution for a health & wellness brand, coordinating a ~100㎡ booth build; contributed to year-round integrated communications and produced 3+ campaign plans; helped a pharma brand set up its corporate culture communications system.',
  },
  {
    company: 'Deepwisdom',
    role: 'Product Operations Intern',
    location: 'Xiamen',
    period: '2025.08 — 2025.11',
    type: '实习',
    skills: ['Cross-border user ops', 'Growth strategy', 'Data-driven decisions'],
    desc: 'Owned end-to-end overseas KOL marketing for an AI product — creator screening, outreach & negotiation, content co-creation and post-campaign review; tracked social trends, comments and conversion funnels, feeding user research back into content and growth strategy.',
  },
  {
    company: 'CITIC Securities',
    role: 'Macro Research Intern, Research Dept.',
    location: 'Beijing',
    period: '2024.07 — 2024.08',
    type: '实习',
  },
]

// 校园实践（英文）
export const campus = [
  {
    org: 'XMU School of Economics · Publicity Center',
    role: 'Deputy Director',
    period: '2025.06 — Present',
    desc: "Managed a 40-person video team and built a content-production SOP; coordinated shooting for 25+ major events reaching 30K+ attendees; led the 'Understanding China' micro-video project to 10K+ views.",
  },
]

// 个人优势/能力卡片（预留，当前未在页面渲染）
export const strengths = [
  { title: '增长与商业化', desc: '从 0 到 1 搭建电商运营体系，建立全链路归因模型，用数据盯盘驱动 GMV 与 CAC 双向优化。', tags: ['增长闭环', '归因建模', 'GMV 优化'], accent: 'teal' },
  { title: '品牌整合传播', desc: '从展会搭建到整合营销方案，统筹设计与执行多团队，确保品牌活动零差错落地与精准触达。', tags: ['整合传播', '会展执行', '媒体关系'], accent: 'olive' },
  { title: '达人投放与项目管理', desc: '独立统筹 10 万元达人营销预算，管理数十位 KOC/KOL 全流程，推进近 80 条内容按节点交付。', tags: ['预算管理', '达人协同', '交付核销'], accent: 'yellow' },
  { title: '内容创作与影像', desc: '统筹 40 人影像团队，主导微视频项目全流程；熟练 PS / LR / 达芬奇 / FCPX 全套视觉工具。', tags: ['团队管理', '视频制作', '视觉设计'], accent: 'coral' },
  { title: '数据驱动决策', desc: 'Python / SQL / SPSS 全栈数据分析，按月拆解拉新留存转化漏斗，用数据反哺运营策略迭代。', tags: ['Python', 'SQL', '漏斗分析'], accent: 'lime' },
  { title: 'AIGC 与智能体', desc: '熟练运用 Codex / Claude Code 智能体、可灵 / 即梦 AIGC 工具与 Figma 原型设计，用 AI 提效。', tags: ['AI 智能体', 'AIGC', 'Figma'], accent: 'teal' },
]

// 技能
export const skillGroups = [
  { group: '编程与数据', items: ['Python', 'SQL', 'SPSS'] },
  { group: '视觉与视频', items: ['Photoshop', 'Lightroom', 'DaVinci', 'FCPX', '剪映', '醒图'] },
  { group: 'AIGC 与设计', items: ['Codex / Claude Code', '可灵 / 即梦', 'GPT-image2', 'Figma'] },
  { group: '语言', items: ['英语 CET-6（553）'] },
]
