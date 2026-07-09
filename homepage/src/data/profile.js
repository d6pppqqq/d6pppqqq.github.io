// 个人基础信息（基于简历真实内容）
export const profile = {
  name: '吴可奕',
  nameEn: 'Wu Keyi',
  // Hero 大标题副标
  roles: ['品牌营销', '增长运营', '商业化'],
  // Hero 一句话主张
  tagline: '把每一次触达，都做成一次精准的品牌对话',
  // 个人介绍（2-3 句）
  bio: '厦门大学经济学在读。在公关、产品运营、商业化三条线之间穿梭，相信好的营销是「用数据读懂人，用创意打动人」。从 0 到 1 跑通过电商增长闭环，也操盘过 500 万+ 曝光的 KOL 矩阵。',
  // 联系方式
  contact: {
    email: 'kodakkkkeyi@qq.com',
    phone: '(+86) 197-2597-0207',
    location: '上海 / 厦门',
  },
  socials: [
    {
      platform: '小红书',
      label: '810 赞藏账号',
      url: 'https://xhslink.com/m/9QRnGg51n5t',
    },
    {
      platform: '小红书',
      label: '2189 赞藏账号',
      url: 'https://xhslink.com/m/8PdbUKumtar',
    },
  ],
  // 教育
  education: {
    school: '厦门大学',
    major: '经济学（创新实验班）',
    degree: '本科',
    period: '2023.09 — 2027.06',
    courses: '数理统计 · 宏观经济学 · 金融经济学 · 人工智能程序设计 · 人工智能金融学',
  },
  // 关键数据（个人经历模块的项目数据）
  stats: [
    { value: 500, suffix: '万+', label: 'KOL 矩阵累计曝光', decimals: 0 },
    { value: 500, suffix: '+', label: '维护达人矩阵', decimals: 0 },
    { value: 15, prefix: '+', suffix: '%', label: '加微 CAC 提升', decimals: 0 },
    { value: 3, suffix: '万+', label: '校园活动服务人次', decimals: 0 },
  ],
}

// 工作经历
export const experiences = [
  {
    company: '上海天游软件有限公司',
    role: '市场部 GTM 实习生',
    location: '上海',
    period: '2026.05 — 至今',
    type: '实习',
  },
  {
    company: '爱德曼（Edelman）国际公关',
    role: 'PR 实习生',
    location: '上海',
    period: '2026.02 — 2026.05',
    type: '实习',
    skills: ['品牌会展策划', '媒体关系管理', '内容策略制定'],
    desc: '负责大健康品牌线下展会筹备与执行，统筹约 100㎡ 展位搭建；深度参与全年整合传播，制定 3+ 套营销方案；协助医药品牌搭建企业文化传播体系。',
  },
  {
    company: '深度赋智（Deepwisdom）',
    role: '产品运营 实习生',
    location: '厦门',
    period: '2025.08 — 2025.11',
    type: '实习',
    skills: ['跨境用户运营', '增长策略优化', '数据驱动决策'],
    desc: '负责 AI 产品海外 KOL 营销全链路运营，维护 500+ 达人矩阵；驱动 Q3 ARR 创新高，累计 500 万+ 曝光，CTR 由 0.5% 提升至 1%+。',
  },
  {
    company: '中信证券',
    role: '研究部 宏观组实习生',
    location: '北京',
    period: '2024.07 — 2024.08',
    type: '实习',
  },
]

// 校园实践
export const campus = [
  {
    org: '厦门大学经济学院团总支宣传中心',
    role: '副主任',
    period: '2025.06 — 至今',
    desc: '管理 40 余人影像团队，搭建内容制作 SOP；统筹 25+ 场大型活动拍摄，服务覆盖超 3 万人次；主导"读懂中国"微视频项目，作品播放量突破 1 万次。',
  },
]

// 个人优势/能力卡片
export const strengths = [
  {
    title: '增长与商业化',
    desc: '从 0 到 1 搭建电商运营体系，建立全链路归因模型，用数据盯盘驱动 GMV 与 CAC 双向优化。',
    tags: ['增长闭环', '归因建模', 'GMV 优化'],
    accent: 'teal',
  },
  {
    title: '品牌整合传播',
    desc: '从展会搭建到整合营销方案，统筹设计与执行多团队，确保品牌活动零差错落地与精准触达。',
    tags: ['整合传播', '会展执行', '媒体关系'],
    accent: 'olive',
  },
  {
    title: 'KOL 与达人营销',
    desc: '跑通海外 KOL 建联、谈判、共创、复盘全链路，维护 500+ 达人矩阵，驱动曝光与转化。',
    tags: ['KOL 运营', '内容共创', '跨境营销'],
    accent: 'yellow',
  },
  {
    title: '内容创作与影像',
    desc: '统筹 40 人影像团队，主导微视频项目全流程；熟练 PS / LR / 达芬奇 / FCPX 全套视觉工具。',
    tags: ['团队管理', '视频制作', '视觉设计'],
    accent: 'coral',
  },
  {
    title: '数据驱动决策',
    desc: 'Python / SQL / SPSS 全栈数据分析，按月拆解拉新留存转化漏斗，用数据反哺运营策略迭代。',
    tags: ['Python', 'SQL', '漏斗分析'],
    accent: 'lime',
  },
  {
    title: 'AIGC 与智能体',
    desc: '熟练运用 Codex / Claude Code 智能体、可灵 / 即梦 AIGC 工具与 Figma 原型设计，用 AI 提效。',
    tags: ['AI 智能体', 'AIGC', 'Figma'],
    accent: 'teal',
  },
]

// 技能
export const skillGroups = [
  { group: '编程与数据', items: ['Python', 'SQL', 'SPSS'] },
  { group: '视觉与视频', items: ['Photoshop', 'Lightroom', 'DaVinci', 'FCPX', '剪映', '醒图'] },
  { group: 'AIGC 与设计', items: ['Codex / Claude Code', '可灵 / 即梦', 'GPT-image2', 'Figma'] },
  { group: '语言', items: ['英语 CET-6（553）'] },
]
