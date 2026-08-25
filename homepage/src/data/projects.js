// 精选项目（基于简历真实项目经历）
// cover: 用渐变色块作为占位图，accent 决定油漆色调

export const projects = [
  {
    id: 'fulin-crystal',
    title: '芙琳水晶 · 商业化运营',
    category: '电商增长 · 从 0 到 1',
    period: '2023.12 — 2024.05',
    role: '商业化运营',
    summary:
      '聚焦「学生党」垂直赛道，以「情绪价值 + 玄学营销」差异化选品策略，从 0 到 1 搭建水晶电商运营体系。',
    highlights: [
      '完成 SKU 标准化上架与高转化详情页重构',
      '主导小红书 + 公众号内容矩阵，设计公域种草 → 私域沉淀增长闭环',
      '建立全链路多触点归因模型（UTM 短链追踪），打通曝光到转化数据孤岛',
    ],
    metrics: [
      { value: '15%', label: '加微 CAC 优化' },
      { value: '+10%', label: 'GMV 环比增长' },
    ],
    tags: ['电商运营', '增长闭环', '归因建模', '私域沉淀'],
    accent: 'pink',
    gradient: 'linear-gradient(135deg, #FE7B8D 0%, #F1DD87 50%, #C6D056 100%)',
    characterId: 'fitness',
  },
  {
    id: 'creator-campaign',
    title: '品牌达人营销 · 预算闭环',
    category: '达人投放 · 项目管理',
    period: '2026.05 — 至今',
    role: '市场 GTM @ 上海天游',
    summary:
      '独立负责品牌国内达人营销项目，以 10 万元预算统筹数十位 KOC/KOL，推进内容生产、节点交付与费用核销闭环。',
    highlights: [
      '覆盖达人筛选、寄样、脚本审核、改稿、发布与费用核销全流程',
      '建立达人交付进度与内容质检机制，把控产品卖点、合规表达及发布节点',
      '推进近 80 条种草内容交付，实现全平台 70 万+ 自然曝光',
    ],
    metrics: [
      { value: '¥10万', label: '营销预算' },
      { value: '近80条', label: '内容交付' },
    ],
    tags: ['预算管理', '达人协同', '内容质检', '费用核销'],
    accent: 'cyan',
    gradient: 'linear-gradient(135deg, #33AFA4 0%, #C6D056 50%, #F1DD87 100%)',
    characterId: 'gaming',
  },
  {
    id: 'health-brand',
    title: '大健康品牌整合传播',
    category: '品牌公关 · 整合营销',
    period: '2026.02 — 2026.05',
    role: 'PR 实习生 @ 爱德曼',
    summary:
      '深度参与大健康品牌全年整合传播项目，从线下展会到企业文化体系搭建，全链路落地品牌动作。',
    highlights: [
      '统筹约 100㎡ 展位搭建，协调设计、搭建与 AV 团队，活动零差错落地',
      '通过市场调研与受众画像，协助制定 3+ 套营销传播方案',
      '整合新闻稿、访谈纪要及活动素材 20+ 份，提升内容传播精准度',
    ],
    metrics: [
      { value: '100㎡', label: '展位统筹' },
      { value: '3+', label: '传播方案' },
    ],
    tags: ['整合传播', '会展执行', '媒体关系', '企业文化'],
    accent: 'orange',
    gradient: 'linear-gradient(135deg, #F1DD87 0%, #FE7B8D 50%, #B1AE81 100%)',
    characterId: 'styling',
  },
  {
    id: 'campus-media',
    title: '校园影像团队 · 内容体系',
    category: '团队管理 · 内容制作',
    period: '2025.06 — 至今',
    role: '副主任 @ 厦大经院宣传中心',
    summary:
      '管理 40 余人影像团队，搭建内容制作 SOP，统筹院/校级大型活动拍摄与内容分发全链路。',
    highlights: [
      '搭建并优化内容制作 SOP，推进规范落地，次年晋升副主任',
      '统筹 25+ 场大型活动拍摄与内容分发，服务覆盖超 3 万人次',
      '主导"读懂中国"微视频项目，优化脚本与分镜，播放量突破 1 万次',
    ],
    metrics: [
      { value: '40+', label: '团队规模' },
      { value: '25+', label: '大型活动' },
    ],
    tags: ['团队管理', 'SOP 搭建', '视频制作', '内容分发'],
    accent: 'violet',
    gradient: 'linear-gradient(135deg, #B1AE81 0%, #33AFA4 50%, #FE7B8D 100%)',
    characterId: 'camera',
  },
]
