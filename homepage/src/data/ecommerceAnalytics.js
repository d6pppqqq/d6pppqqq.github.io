// Portfolio case studies built with synthetic e-commerce data.
// Keeping these separate from work projects prevents modeled findings from
// being presented as real business results.
export const ecommerceAnalyticsProjects = [
  {
    id: 'a1',
    title: 'GMV FUNNEL DIAGNOSTIC',
    category: 'E-COMMERCE · GROWTH ANALYTICS',
    period: 'PORTFOLIO CASE · 2026',
    status: 'SIMULATED DATA',
    question: 'Why did GMV decline while traffic was still growing?',
    dataset: '12 WEEKS · 2.4M EVENTS · 120K ORDERS',
    methods: ['SQL FUNNEL', 'GMV DECOMPOSITION', 'CHANNEL COHORTS'],
    findings: [
      'Traffic rose 18.6%, but purchase CVR fell from 2.41% to 1.93%.',
      'Lower-funnel loss explained 78% of the modeled GMV gap.',
      'Paid-social mobile users drove 64% of checkout abandonment.',
    ],
    action:
      'Fix mobile checkout first, then cap low-intent paid traffic by channel-level contribution margin.',
    deliverables: ['SQL QUERY PACK', 'FUNNEL DASHBOARD', 'WEEKLY REVIEW TEMPLATE'],
    tools: ['SQL', 'PYTHON', 'TABLEAU'],
    metrics: [
      { value: '2.4M', label: 'EVENTS' },
      { value: '78%', label: 'GAP LOCATED' },
    ],
  },
  {
    id: 'a2',
    title: 'CUSTOMER LTV & RFM SEGMENTATION',
    category: 'E-COMMERCE · USER ANALYTICS',
    period: 'PORTFOLIO CASE · 2026',
    status: 'SIMULATED DATA',
    question: 'Which customer groups deserve retention budget?',
    dataset: '18 MONTHS · 386K ORDERS · 42K CUSTOMERS',
    methods: ['RFM SCORING', 'COHORT RETENTION', '180-DAY LTV'],
    findings: [
      'Repeat buyers were 27% of customers but generated 61% of contribution profit.',
      'A second order within 30 days predicted 3.2x higher modeled 180-day LTV.',
      'Four actionable segments exposed very different churn and discount sensitivity.',
    ],
    action:
      'Trigger category-based replenishment after order one and reserve coupons for at-risk high-value users.',
    deliverables: ['RFM SEGMENT TABLE', 'COHORT HEATMAP', 'CRM TRIGGER MAP'],
    tools: ['PYTHON', 'SQL', 'POWER BI'],
    metrics: [
      { value: '42K', label: 'CUSTOMERS' },
      { value: '3.2X', label: 'LTV SIGNAL' },
    ],
  },
  {
    id: 'a3',
    title: 'PROMOTION & SKU PROFITABILITY',
    category: 'E-COMMERCE · MERCHANDISING',
    period: 'PORTFOLIO CASE · 2026',
    status: 'SIMULATED DATA',
    question: 'Which promotions grow incremental profit, not just GMV?',
    dataset: '8.6K SKU-DAYS · 36 CAMPAIGNS · 9 CATEGORIES',
    methods: ['MATCHED BASELINE', 'PRICE ELASTICITY', 'MARGIN WATERFALL'],
    findings: [
      'Campaign GMV rose 23.4%, while contribution profit fell 5.8%.',
      'Blanket discounts subsidized orders that likely would have happened anyway.',
      'Threshold coupons lifted AOV with less margin erosion in six categories.',
    ],
    action:
      'Set category-level discount guardrails and rank SKUs by incremental contribution profit.',
    deliverables: ['SKU SCORECARD', 'MARGIN WATERFALL', 'PROMO POST-MORTEM'],
    tools: ['PYTHON', 'SQL', 'EXCEL'],
    metrics: [
      { value: '+23.4%', label: 'GMV' },
      { value: '-5.8%', label: 'PROFIT' },
    ],
  },
]
