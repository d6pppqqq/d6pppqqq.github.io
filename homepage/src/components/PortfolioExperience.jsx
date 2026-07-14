import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile.js'
import { ChiptuneEngine } from '../audio/chiptuneEngine.js'
import './PortfolioExperience.css'

// ── shared chiptune engine ──────────────────────────────────────
const engine = new ChiptuneEngine()

// ── content (Press Start 2P doesn't support CJK → English) ──────
const EN_PROJECTS = [
  {
    title: 'CRYSTAL E-COMM · FROM ZERO',
    category: 'E-COMMERCE GROWTH',
    period: '2023.12 — 2024.05',
    summary:
      'Vertically targeted students with emotional-value + mystical marketing. ' +
      'Built full crystal e-comm from scratch — SKU, content matrix, full-funnel attribution.',
    metrics: [{ value: '+15%', label: 'CAC' }, { value: '+10%', label: 'GMV' }],
    tags: ['E-COMM OPS', 'GROWTH LOOP', 'ATTRIBUTION', 'PRIVATE TRAFFIC'],
  },
  {
    title: 'AI PRODUCT KOL MATRIX',
    category: 'CREATOR MKT · CROSS-BORDER',
    period: '2025.08 — 2025.11',
    summary:
      'Led full-funnel overseas KOL marketing for AI product. Built 500+ creator matrix, ' +
      'drove 5M+ impressions. CTR lifted from 0.5% to 1%+.',
    metrics: [{ value: '5M+', label: 'IMPRESSIONS' }, { value: '0.5→1%+', label: 'CTR' }],
    tags: ['KOL OPS', 'CROSS-BORDER', 'CONTENT COLLAB', 'DATA REVIEW'],
  },
  {
    title: 'HEALTH BRAND IMC CAMPAIGN',
    category: 'PR · INTEGRATED MARKETING',
    period: '2026.02 — 2026.05',
    summary:
      'Spearheaded annual integrated comms for a health brand — 100sqm trade-show booth to ' +
      'corporate culture system. Zero-error execution across 3+ campaign plans.',
    metrics: [{ value: '100m²', label: 'BOOTH' }, { value: '3+', label: 'PLANS' }],
    tags: ['IMC', 'TRADE SHOW OPS', 'MEDIA RELATIONS', 'CORP CULTURE'],
  },
  {
    title: 'CAMPUS MEDIA · CONTENT SOP',
    category: 'TEAM MGMT · VIDEO PROD',
    period: '2025.06 — NOW',
    summary:
      'Led a 40-person video team. Built production SOP from scratch. Shot & distributed ' +
      'content for 25+ major events (30K+ attendees). Micro-doc hit 10K+ views.',
    metrics: [{ value: '40+', label: 'TEAM' }, { value: '25+', label: 'EVENTS' }],
    tags: ['TEAM MGMT', 'SOP BUILD', 'VIDEO PROD', 'CONTENT DISTRIB'],
  },
]

const SKILL_BARS = [
  { label: 'KOL / INFLUENCER OPS', pct: 92 },
  { label: 'BRAND STRATEGY',       pct: 88 },
  { label: 'GROWTH ANALYTICS',     pct: 80 },
  { label: 'CONTENT CREATION',     pct: 85 },
  { label: 'PYTHON / SQL',         pct: 72 },
  { label: 'AIGC TOOLS',           pct: 82 },
]

const TOOL_GROUPS = [
  { group: 'CODE & DATA',    items: ['Python', 'SQL', 'SPSS'] },
  { group: 'VISUAL & VIDEO', items: ['Photoshop', 'Lightroom', 'DaVinci', 'FCPX'] },
  { group: 'AIGC & DESIGN',  items: ['Claude Code', 'Kling / Jimeng', 'GPT-Image2', 'Figma'] },
  { group: 'LANGUAGE',       items: ['English CET-6 (553)'] },
]

const STATS = [
  { val: '5M+',  label: 'KOL IMPRESSIONS' },
  { val: '500+', label: 'CREATOR MATRIX' },
  { val: '+15%', label: 'CAC IMPROVEMENT' },
  { val: '30K+', label: 'EVENTS SERVED' },
]

const CONTACT_ROWS = [
  { label: 'MAIL', val: profile.contact.email },
  { label: 'CALL', val: profile.contact.phone },
  { label: 'BASE', val: 'SHANGHAI / XIAMEN' },
]

// ── terminal chrome ─────────────────────────────────────────────
const PROMPT = 'kay@portfolio:~$'

const FILES = ['about.txt', 'projects/', 'skills.dat', 'stats.log', 'contact.txt', 'social.url', 'edu.txt']

const HELP = [
  ['help',        'show this command list'],
  ['about',       'who is kay wu'],
  ['ls',          'list files here'],
  ['cat <file>',  'print a file  (try: cat about.txt)'],
  ['projects',    'list projects · projects <n> for detail'],
  ['skills',      'capability matrix + tool stack'],
  ['stats',       'key metrics dump'],
  ['contact',     'how to reach me'],
  ['social',      'xiaohongshu links'],
  ['edu',         'education record'],
  ['neofetch',    'system + operator info'],
  ['music',       'toggle chiptune (music on / off)'],
  ['echo <text>', 'print text'],
  ['clear',       'clear the screen'],
]

// spelled with block chars — KAY WU
const BANNER = [
  '  #  # ##  #   #  #  # #  #',
  '  # #  # # #   #  #  # #  #',
  '  ##   ##  #   #  # ## #  #',
  '  # #  # #  # #   #  #  ##',
  '  #  # # #   #    #  #  ##',
]

const FACE = [
  '  ______  ',
  ' /      \\ ',
  '| ^    ^ |',
  '|   __   |',
  ' \\  \\/  / ',
  '  \\____/  ',
]

const BOOT = [
  ...BANNER.map((t) => ({ t, c: 'clr-cyan' })),
  { t: '' },
  { t: 'KAY-DOS v3.0  ·  PORTFOLIO SHELL  [ROM BIOS 1997]', c: 'clr-gray' },
  { t: 'Booting kernel ......... OK', c: 'clr-green' },
  { t: 'Mounting /home/kay ..... OK', c: 'clr-green' },
  { t: '' },
  { t: "Type 'help' for commands.  Try: about · projects · skills", c: 'clr-yellow' },
  { t: '' },
]

function bar(pct, cells = 20) {
  const filled = Math.round((pct / 100) * cells)
  return '█'.repeat(filled) + '░'.repeat(cells - filled)
}

// ── fullscreen CLI ──────────────────────────────────────────────
export default function PortfolioExperience() {
  const [lines, setLines] = useState(() => [...BOOT])
  const [input, setInput] = useState('')
  const [musicOn, setMusicOn] = useState(false)
  const histRef = useRef([])
  const histPosRef = useRef(-1)
  const idRef = useRef(0)
  const rootRef = useRef(null)
  const inputRef = useRef(null)

  const nextId = () => ++idRef.current
  const push = (arr) =>
    setLines((prev) => [...prev, ...arr.map((l) => ({ id: nextId(), t: l.t ?? '', c: l.c ?? '' }))])

  useEffect(() => {
    const el = rootRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  useEffect(() => { inputRef.current?.focus() }, [])

  const toggleMusic = (out, say) => {
    // first interaction starts the engine; subsequent calls toggle
    const on = engine.toggle()
    setMusicOn(on)
    say(on ? '♫ chiptune: ON' : '♪ chiptune: OFF', on ? 'clr-green' : 'clr-gray')
  }

  const runCommand = (raw) => {
    const cmd = raw.trim()
    push([{ t: `${PROMPT} ${cmd}`, c: 'clr-echo' }])
    if (!cmd) return
    histRef.current = [cmd, ...histRef.current.filter((c) => c !== cmd)].slice(0, 50)

    const [name, ...rest] = cmd.split(/\s+/)
    const arg = rest.join(' ')
    const out = []
    const say = (t, c) => out.push({ t, c })

    const printProjects = () => {
      say('PROJECT INDEX  —  projects <n> for detail', 'clr-yellow')
      say('')
      EN_PROJECTS.forEach((p, i) => {
        say(`  [${String(i + 1).padStart(2, '0')}] ${p.title}`, 'clr-white')
        say(`       ${p.category}  ·  ${p.period}`, 'clr-gray')
      })
    }
    const printAbout = () => {
      say('KAY WU  ·  吴可奕', 'clr-cyan')
      say('BRAND / GROWTH / OPS  —  XMU Economics 2027', 'clr-gray')
      say('')
      say('Growth marketer & brand strategist. Ran KOL matrix ops', 'clr-white')
      say('(500+ creators, 5M+ impressions). Built e-commerce loops', 'clr-white')
      say('from zero. PR at Edelman, AI ops at Deepwisdom.', 'clr-white')
    }
    const printSkills = () => {
      say('CAPABILITY MATRIX', 'clr-yellow')
      say('')
      SKILL_BARS.forEach((s) => say(`  ${s.label.padEnd(22)} [${bar(s.pct)}] ${s.pct}%`, 'clr-cyan'))
      say('')
      say('TOOL STACK', 'clr-yellow')
      TOOL_GROUPS.forEach((g) => say(`  ${g.group.padEnd(16)} ${g.items.join(' · ')}`, 'clr-white'))
    }
    const printStats = () => {
      say('STATS.LOG', 'clr-yellow'); say('')
      STATS.forEach((s) => say(`  ${s.val.padEnd(6)} ${s.label}`, 'clr-green'))
    }
    const printContact = () => {
      say('CONTACT.TXT', 'clr-yellow'); say('')
      CONTACT_ROWS.forEach((r) => say(`  [${r.label.padEnd(4)}] ${r.val}`, 'clr-white'))
      say(''); say('  status: OPEN TO WORK — INTERNSHIP', 'clr-green')
    }
    const printSocial = () => {
      say('SOCIAL.URL', 'clr-yellow'); say('')
      profile.socials.forEach((s) => say(`  ${s.platform}  ${s.label}  →  ${s.url}`, 'clr-cyan'))
    }
    const printEdu = () => {
      say('EDUCATION', 'clr-yellow'); say('')
      say(`  ${profile.education.school}  ·  ${profile.education.major}`, 'clr-white')
      say(`  ${profile.education.degree}  ${profile.education.period}`, 'clr-gray')
    }

    switch (name.toLowerCase()) {
      case 'help':
        say('AVAILABLE COMMANDS', 'clr-yellow'); say('')
        HELP.forEach(([c, d]) => say(`  ${c.padEnd(14)} ${d}`, 'clr-white'))
        break

      case 'about':
      case 'whoami':
        printAbout()
        break

      case 'ls':
      case 'dir':
        say(FILES.join('   '), 'clr-cyan')
        break

      case 'cat': {
        const f = arg.toLowerCase().replace(/^\.?\//, '')
        if (!f) { say('usage: cat <file>   (try: cat about.txt)', 'clr-red'); break }
        if (f === 'about.txt')   { printAbout(); break }
        if (f === 'skills.dat')  { printSkills(); break }
        if (f === 'stats.log')   { printStats(); break }
        if (f === 'contact.txt') { printContact(); break }
        if (f === 'social.url')  { printSocial(); break }
        if (f === 'edu.txt')     { printEdu(); break }
        if (f === 'projects' || f === 'projects/') { printProjects(); break }
        say(`cat: ${arg}: No such file`, 'clr-red')
        break
      }

      case 'projects':
      case 'proj': {
        const n = parseInt(arg, 10)
        if (n && EN_PROJECTS[n - 1]) {
          const p = EN_PROJECTS[n - 1]
          say(`[${String(n).padStart(2, '0')}] ${p.title}`, 'clr-yellow')
          say(`     ${p.category}  ·  ${p.period}`, 'clr-gray')
          say('')
          say(`     ${p.summary}`, 'clr-white')
          say('')
          say(`     ${p.metrics.map((m) => `${m.value} ${m.label}`).join('   ')}`, 'clr-green')
          say(`     #${p.tags.join(' #').toLowerCase()}`, 'clr-cyan')
        } else if (arg) {
          say(`projects: no project #${arg}  (1-${EN_PROJECTS.length})`, 'clr-red')
        } else {
          printProjects()
        }
        break
      }

      case 'skills':
      case 'skill':
        printSkills()
        break

      case 'stats':
        printStats()
        break

      case 'contact':
        printContact()
        break

      case 'social':
        printSocial()
        break

      case 'edu':
      case 'education':
        printEdu()
        break

      case 'neofetch':
        FACE.forEach((row, i) => {
          const info = [
            'kay@portfolio',
            '-------------',
            'OS:     KAY-DOS v3.0',
            'Role:   Brand / Growth / Ops',
            'Base:   Shanghai / Xiamen',
            'Edu:    XMU Economics 2027',
            'Uptime: shipping since 2023',
          ]
          say(`  ${row}   ${info[i] ?? ''}`, i < 2 ? 'clr-yellow' : 'clr-cyan')
        })
        break

      case 'music':
      case 'sound': {
        const a = arg.toLowerCase()
        if (a === 'off' && musicOn) toggleMusic(out, say)
        else if (a === 'on' && !musicOn) toggleMusic(out, say)
        else if (a === 'on' || a === 'off') say(`♫ chiptune already ${musicOn ? 'ON' : 'OFF'}`, 'clr-gray')
        else toggleMusic(out, say)
        break
      }

      case 'echo':
        say(arg || '', 'clr-white')
        break

      case 'history':
        if (!histRef.current.length) { say('(empty)', 'clr-gray'); break }
        histRef.current.slice().reverse().forEach((c, i) =>
          say(`  ${String(i + 1).padStart(3, ' ')}  ${c}`, 'clr-gray'))
        break

      case 'date':
        say(new Date().toString(), 'clr-white')
        break

      case 'sudo':
        say('kay is not in the sudoers file. This incident will be reported. ;)', 'clr-red')
        break

      case 'clear':
      case 'cls':
        setLines([])
        return

      case 'exit':
      case 'quit':
        say("there is no exit — you're already home. try 'help'.", 'clr-magenta')
        break

      default:
        say(`command not found: ${name}   —   type 'help'`, 'clr-red')
    }

    push(out)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
      histPosRef.current = -1
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const h = histRef.current
      if (!h.length) return
      histPosRef.current = Math.min(histPosRef.current + 1, h.length - 1)
      setInput(h[histPosRef.current])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const h = histRef.current
      histPosRef.current = Math.max(histPosRef.current - 1, -1)
      setInput(histPosRef.current === -1 ? '' : h[histPosRef.current])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const names = HELP.map(([c]) => c.split(' ')[0])
      const q = input.trim()
      const hit = q && names.find((n) => n.startsWith(q))
      if (hit) setInput(hit + ' ')
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className="cli" ref={rootRef} onClick={() => inputRef.current?.focus()}>
      <div className="cli__scanlines" aria-hidden="true" />
      <div className="cli__stream">
        {lines.map((l) => (
          <div key={l.id} className={`cli__line ${l.c}`}>{l.t || ' '}</div>
        ))}
      </div>
      <div className="cli__prompt-line">
        <span className="cli__prompt">{PROMPT}</span>
        <input
          ref={inputRef}
          className="cli__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="terminal input"
        />
        <span className="cli__cursor animate-blink">▮</span>
      </div>
    </div>
  )
}
