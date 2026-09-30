// 工作全案（Case Files）— 英文，数据口径全部来自《吴可奕-信息全集版.md》已核实条目。
// 每个案例结构：背景 Context → 任务 Mission → 执行 Execution → 结果 Results → 交付物 Takeaways

export const caseFiles = [
  {
    id: 'lyanse-gtm',
    company: 'T2 Entertainment (Century Huatong Group)',
    role: 'GTM Marketing Intern — AI Hardware Launch',
    location: 'Shanghai',
    period: '2026.05 — Present',
    logo: '/logos/t2cn.jpg',
    tagline: 'I own go-to-market for a new AI voice-recorder card — from a RMB 100K cold-start budget to a working GEO pipeline, from day one.',
    context:
      'LYNSE is a new AI voice-recorder card about to launch. The brand had zero presence on Chinese content platforms and no visibility inside AI answer engines. No playbook existed for this product line.',
    mission:
      'Independently build and run the launch-window marketing system: creator seeding on Xiaohongshu/Douyin, on-platform e-commerce ads, and a brand-new GEO (Generative Engine Optimization) channel — under one reconciled budget.',
    execution: [
      'Split the RMB 50–100K cold-start budget by line and reconciled every yuan: creator line RMB 46K pure collaboration fees; on-platform ads RMB 42.4K (June) tracked separately.',
      'Screened competitors by crawling 140+ creator accounts, built a 113-person KOC pool, and set a KFS budget mix (content 57% / feeds 30% / search 13%).',
      'Shipped 64 sponsored pieces plus UGC events; ran a low-cost AIGC asset pipeline (Kling / Jimeng / GPT-image) feeding all lines.',
      'Built the reconciliation layer myself: identified and stripped ~RMB 90K of abnormal transactions (fake orders / refunds) from tens of thousands of raw order records, unifying the "real GMV" definition across teams before trusting any campaign number.',
      'Discovered the brand was invisible in AI answers; designed a six-step GEO workflow (brand assets → keyword matrix → 250-piece content plan → tiered distribution) and shipped the first 150 pieces end-to-end with a source-traceable dashboard.',
      'After every early under-performing post, re-cut topics and creator mixes instead of asking for more budget — ROI iterated from 3.40 to 10.35.',
    ],
    results: [
      { value: '710K+', label: 'impressions', note: '64 pieces + UGC, RMB 6.8 per interaction (creator line)' },
      { value: '3.40 → 10.35', label: 'on-platform ROI', note: 'June blended → August sprint week; brand-keyword campaign peaked at 50+' },
      { value: '150 pcs', label: 'GEO content live', note: 'from a 250-piece plan, full pipeline validated' },
      { value: '3 SOPs', label: 'left for the team', note: 'creator ops, AIGC pipeline, GEO workflow' },
    ],
    takeaways:
      'A replicable launch-stack for a hardware brand entering content platforms from zero: budget-line accounting, creator tiering, AIGC production, and an AI-search visibility channel most Chinese brands have not opened yet.',
  },
  {
    id: 'deepwisdom-global',
    company: 'Deepwisdom Co., Ltd.',
    role: 'Overseas KOL Marketing Intern',
    location: 'Xiamen',
    period: '2025.08 — 2025.11',
    logo: '/logos/deepwisdom.svg',
    tagline: 'Four regions, one inbox: English email negotiation turned a 500-creator pool into doubled click-through for an AI product.',
    context:
      'An AI product needed overseas user acquisition. The company had no systematic creator pipeline in the US, Western Europe, Southeast Asia or Japan — outreach lived in scattered inboxes.',
    mission:
      'Own the full overseas funnel: lead screening → outreach → negotiation → content co-creation → post-campaign review, in English, across four regions.',
    execution: [
      'Maintained a 500+ creator resource pool; scored candidates on fit, cost and past performance before any contact.',
      'Negotiated inflated quotes down to target cost through multi-round English email — no calls, no agency in between.',
      'Co-created briefs with creators and localized hooks per region instead of one global script.',
      'Tracked the funnel daily (impressions → clicks → installs) and fed community comments back into product localization decisions.',
    ],
    results: [
      { value: '5M+', label: 'impressions', note: 'cumulative across campaigns' },
      { value: '0.5% → 1%+', label: 'CTR', note: 'doubled by re-cutting hooks per region' },
      { value: '4 regions', label: 'US / WEur / SEA / JP', note: 'one operator, English-first' },
      { value: '5 plans', label: 'campaign playbooks', note: 'documented and reused' },
    ],
    takeaways:
      'A global creator pipeline is an email discipline problem before it is a budget problem: screening criteria, negotiation scripts and per-region hooks turn cold outreach into a repeatable channel.',
  },
  {
    id: 'edelman-imc',
    company: 'Edelman (International PR)',
    role: 'PR Intern — Healthcare & Pharma Accounts',
    location: 'Shanghai',
    period: '2026.02 — 2026.05',
    logo: '/logos/edelman.jpeg',
    tagline: 'Booth, briefings, brand book: what agency-grade process discipline looks like on the ground.',
    context:
      'A health & wellness client needed its annual integrated communications and a ~100m² trade-show presence; a pharma client needed an internal culture-communications system from scratch.',
    mission:
      'Support campaign planning and physically land the exhibition — vendors, venue, timeline and client sign-offs all in one critical path.',
    execution: [
      'Co-created 3+ integrated campaign plans across social, media and offline touchpoints.',
      'Coordinated construction vendors, venue logistics and client approvals to deliver the ~100m² booth on schedule, zero rework.',
      'Helped structure the pharma brand\u2019s corporate culture communications system — message house, cadence, internal channels.',
    ],
    results: [
      { value: '100m²', label: 'booth delivered', note: 'on schedule, zero-error execution' },
      { value: '3+ plans', label: 'IMC campaign plans', note: 'co-created, client-reviewed' },
    ],
    takeaways:
      'Agency life taught me the unglamorous half of marketing: approval chains, version control and vendor wrangling — the reason my in-house work ships without drama.',
  },
  {
    id: 'crystal-ecom',
    company: 'Crystal E-commerce Venture',
    role: 'Founder — 0 → 1 Campus Business',
    location: 'Xiamen',
    period: '2023.12 — 2024.05',
    logo: null,
    tagline: 'Sold emotional value to students: built a full e-commerce loop — SKU, content matrix, attribution — before ever interning.',
    context:
      'A pocket-sized test of whether emotional-value and mystical marketing works on Gen-Z students — no company budget, my own.',
    mission:
      'Build the entire commercial system alone: sourcing, pricing, content, private-domain traffic, and a measurement loop.',
    execution: [
      'Designed SKU tiers and content angles matched to student stress points (exams, relationships, job season).',
      'Set up UTM-tagged funnel tracking to see which content actually converted, not just which got likes.',
      'Ran the full cycle solo — sourcing, sampling, customer service, repurchase messaging — while still a sophomore.',
    ],
    results: [
      { value: '+10%', label: 'GMV', note: 'after funnel-driven content re-cut' },
      { value: '+15%', label: 'CAC efficiency', note: 'private-domain repurchase vs. paid traffic' },
    ],
    takeaways:
      'The cheapest data education available: run your own P&L small enough to feel every yuan, big enough to need honest attribution.',
  },
]
