'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Download, Mail, MapPin, Moon, Sparkles, Sun, Terminal as TerminalIcon } from 'lucide-react'

type Line = { id: number; kind: 'system' | 'command' | 'output' | 'error' | 'accent'; text: string }

type Project = { name: string; description: string; stack: string[]; link: string; detail: string; images?: string[]; tagline?: string }

type Certification = {
  title: string
  org: string
  badge: string
  gradient: string
  date: string
  caption: string
  tags: string[]
  likes: number
  image?: string
  link?: string
}

const profile = {
  name: 'Jyotiraditya Mishra',
  handle: 'jyotiraditya@builds',
  role: 'Software Engineer @ IBM · MERN & Java / Spring Full-stack Developer',
  location: 'Bangalore, India',
  bio: 'Full-stack developer focused on MERN and Java / Spring Boot applications, with React and Next.js on the frontend. I also build agentic AI workflows and RAG applications using LangChain, LangGraph, vector databases, and Python. Available for freelance web applications, AI integrations, MVPs, and product development.',
  email: 'jyotiradityamishra06@gmail.com',
  phone: '+91 8084885168',
  github: 'github.com/jradityamishra',
  linkedin: 'linkedin.com/in/jyotiraditya-mishra-090047204',
  resume: '/resume.pdf',
}

const projects: Project[] = [
  {
    name: 'AskRepo',
    tagline: 'Your codebase, answered in plain English',
    description: 'An AI repository assistant that connects to GitHub and answers codebase questions with citations back to the source.',
    stack: ['TypeScript', 'AI'],
    link: 'ask-repo-1pfj-jade.vercel.app',
    detail: 'Sign in with GitHub, connect and index repositories, and chat about files, features, bugs, commits, and pull requests. Includes repository search, public/private filters, indexing status, conversation history, and source-file citations.',
    images: ['/image.png', '/1111.png', '/askrepo-chat.jpeg'],
  },
  {
    name: 'ScholarMates',
    tagline: 'Your Network of Like-Minded Individuals',
    description: 'A social platform where students & professionals connect over shared interests, discussions, and study circles.',
    stack: ['Next.js', 'Node.js', 'Socket.IO', 'MongoDB', 'AWS S3'],
    link: 'github.com/jradityamishra',
    detail: 'Real-time discussions, filtered people search, and topic-based communities \u2014 powered by Socket.IO chat, an AWS S3 media pipeline, and a scalable Node backend. Helps learners network professionally, find study groups, and grow together.',
    images: ['/scholarmates-1.jpg', '/scholarmates-2.jpg'],
  },
  {
    name: 'VoteEasy',
    tagline: 'Your vote matters — decide and tap',
    description: 'Secure biometric + blockchain-based online voting platform.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Ethereum', 'Solidity', 'zkRollups'],
    link: 'github.com/jradityamishra',
    detail: 'End-to-end voting flow with Aadhaar + real-time facial biometric verification (95% auth accuracy), JWT-scoped 2-minute voting tokens, and zkRollup-backed ballots stored on-chain \u2014 cutting fraud risk by 40% and page load by 25%. Booth officers and ECI get live vote status via a Node/MongoDB API.',
    images: ['/voteeasy-1.png', '/voteeasy-2.jpg'],
  },
]

const experiences: [string, string, string, string][] = [
  ['Sep 2025 — Present', 'Software Engineer', 'IBM', 'Building backend services and REST APIs for banking (PCI-DSS, 99.9% uptime). Shipped Agentic AI automations across 3 workflows — cutting manual processing time by 40% and data fetch latency by 35%.'],
  ['Jan 2025 — Jun 2025', 'Software Developer Intern', 'Growth Loop Technology', 'Shipped responsive React/Node apps — 30% faster page loads, 25% more engagement, 40% better MongoDB/SQL query perf, and 30% lower API response times.'],
  ['Oct 2021 — May 2025', 'B.Tech, Electronics & Instrumentation', 'Heritage Institute of Technology', 'Graduated with a 9.27 GPA. Solved 550+ LeetCode problems with strong DSA foundations.'],
]

const skills: { name: string; icon: string; color: string; textColor?: string }[] = [
  { name: 'Java', icon: 'J', color: '#b84124' },
  { name: 'Spring Boot', icon: 'SB', color: '#427a21' },
  { name: 'Spring Security', icon: 'SS', color: '#35651c' },
  { name: 'Hibernate / JPA', icon: 'JP', color: '#685d3d' },
  { name: 'React.js', icon: '\u269B', color: '#61dafb', textColor: '#0b1b2b' },
  { name: 'Next.js', icon: 'N', color: '#111111' },
  { name: 'TypeScript', icon: 'TS', color: '#3178c6' },
  { name: 'JavaScript', icon: 'JS', color: '#f7df1e', textColor: '#111111' },
  { name: 'Node.js', icon: 'no', color: '#427a35' },
  { name: 'Express.js', icon: 'Ex', color: '#444444' },
  { name: 'MongoDB', icon: 'M', color: '#367a36' },
  { name: 'PostgreSQL', icon: 'PG', color: '#336791' },
  { name: 'MySQL', icon: 'My', color: '#00758f' },
  { name: 'Python', icon: 'Py', color: '#3776ab' },
  { name: 'Agentic AI', icon: 'AI', color: '#187a77' },
  { name: 'RAG', icon: 'R', color: '#9a4c26' },
  { name: 'Vector Databases', icon: 'VD', color: '#336791' },
  { name: 'LangChain', icon: 'LC', color: '#275c4b' },
  { name: 'LangGraph', icon: 'LG', color: '#28696e' },
  { name: 'LLM Integration', icon: 'LM', color: '#9b4f63' },
  { name: 'Embeddings', icon: 'Em', color: '#366a91' },
  { name: 'Semantic Search', icon: 'Se', color: '#856529' },
  { name: 'Prompt Engineering', icon: 'PE', color: '#7f4e62' },
  { name: 'Tool Calling', icon: 'TC', color: '#55652d' },
  { name: 'GitHub Copilot', icon: 'GH', color: '#30363d' },
  { name: 'REST APIs', icon: '{ }', color: '#334155' },
  { name: 'Microservices', icon: 'MS', color: '#187a77' },
  { name: 'Azure', icon: 'Az', color: '#0078d4' },
  { name: 'AWS', icon: 'aws', color: '#ff9900', textColor: '#111111' },
  { name: 'Docker', icon: 'D', color: '#1579b8' },
  { name: 'Kubernetes', icon: 'K8s', color: '#326ce5' },
  { name: 'CI/CD', icon: '\u26A1', color: '#eab308', textColor: '#111111' },
]

const freelanceServices = [
  {
    title: 'Java full-stack applications',
    stack: 'Java / Spring Boot / React / Next.js / SQL',
    description: 'Custom business applications, admin dashboards, and customer portals with secure authentication and API integrations.',
  },
  {
    title: 'MERN & Next.js web projects',
    stack: 'MongoDB / Express.js / React / Node.js / Next.js',
    description: 'Responsive websites, startup MVPs, and full-stack web applications, from frontend interfaces to backend APIs.',
  },
  {
    title: 'APIs, automation & integrations',
    stack: 'Spring Boot / Python / REST APIs',
    description: 'Backend services, third-party integrations, and Python automation for repetitive tasks and AI-enabled workflows.',
  },
  {
    title: 'Agentic AI & RAG applications',
    stack: 'Python / LangChain / LangGraph / Vector Databases / LLMs',
    description: 'AI assistants, retrieval-augmented knowledge search, and tool-using agent workflows integrated into full-stack products.',
  },
]

const freelanceEmail = `mailto:${profile.email}?subject=${encodeURIComponent('Freelance project enquiry')}`

const certifications: Certification[] = [
  {
    title: 'GitHub Copilot Certification',
    org: 'Microsoft \u00b7 GH-300',
    badge: 'GH',
    gradient: 'linear-gradient(135deg, #171b22 0%, #2ea043 55%, #7ee787 100%)',
    date: 'February 2026',
    caption: 'GH-300 done \u2014 pair-programming with AI is now a first-class engineering skill. Copilot in every editor, always. \ud83e\udd16',
    tags: ['GitHub', 'Copilot', 'AI', 'GH300', 'devtools'],
    likes: 612,
    image: '/copilot.jpg',
  },
  {
    title: 'Microsoft Azure Fundamentals',
    org: 'Microsoft \u00b7 AZ-900',
    badge: 'AZ',
    gradient: 'linear-gradient(135deg, #0078d4 0%, #2b88d8 55%, #50e6ff 100%)',
    date: 'November 2025',
    caption: 'Azure Fundamentals in the bag. Cloud-first thinking is table stakes now \u2014 and Azure is a big part of the IBM stack I work with daily. \u2601\ufe0f',
    tags: ['Azure', 'AZ900', 'cloud', 'Microsoft', 'certified'],
    likes: 507,
    image: '/azure.jpg',
  },
  {
    title: 'IBM DevOps Essentials',
    org: 'IBM \u00b7 Techademy',
    badge: 'IBM',
    gradient: 'linear-gradient(135deg, #052366 0%, #1f2eff 55%, #7c5cff 100%)',
    date: 'April 2025',
    caption: 'IBM DevOps certified. CI/CD, containers, orchestration \u2014 the pipes that let good software actually ship. \ud83d\ude80',
    tags: ['IBM', 'DevOps', 'CICD', 'kubernetes', 'shipfast'],
    likes: 428,
    link: '/certificate.pdf',
  },
  {
    title: 'IDE Bootcamp \u2014 Best Team',
    org: 'AICTE \u00b7 Swami Vivekananda University',
    badge: 'IDE',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #22c55e 55%, #a3e635 100%)',
    date: 'February 2024',
    caption: 'Recognised as one of the best performing teams at the IDE Bootcamp Phase-II for our idea pitch. 5th position overall \u2014 great co-founders, better learnings. \ud83c\udfc6',
    tags: ['IDE', 'innovation', 'startup', 'bestTeam', 'AICTE'],
    likes: 389,
    image: '/ide.jpg',
  },
  {
    title: 'IDE Bootcamp Phase-II',
    org: 'AICTE \u00b7 MoE Innovation Cell',
    badge: 'IDE',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #4ade80 55%, #86efac 100%)',
    date: 'February 2024',
    caption: 'Selected for the Innovation, Design & Entrepreneurship bootcamp Phase-II \u2014 five days of makers, mentors, and ideas that stuck.',
    tags: ['IDE', 'bootcamp', 'phase2', 'AICTE', 'innovation'],
    likes: 273,
    image: '/bootcamp.jpg',
  },
  {
    title: 'Smart India Hackathon Finalist',
    org: 'Government of India \u00b7 MoE',
    badge: 'SIH',
    gradient: 'linear-gradient(135deg, #ff6a3d 0%, #ffb03a 55%, #ffd166 100%)',
    date: 'December 2023',
    caption: 'Made it to the grand finale of India\u2019s largest hackathon \u2014 solving a real government problem with a team that shipped through 36 sleepless hours. Grateful for the journey! \ud83c\uddee\ud83c\uddf3',
    tags: ['SIH2023', 'hackathon', 'india', 'finalist', 'buildinpublic'],
    likes: 651,
    image: '/sih.jpg',
  },
  {
    title: 'MLH Fast Track \u2014 DevLoveRs',
    org: 'Major League Hacking',
    badge: 'MLH',
    gradient: 'linear-gradient(135deg, #0b1f4f 0%, #1a3a8a 55%, #38bdf8 100%)',
    date: 'February 2023',
    caption: 'Placed 3rd at MLH \u2014 DevLoveRs and picked up the Fast Track Interview certificate. Nothing beats the rush of a good hack. \u26a1',
    tags: ['MLH', 'hackathon', 'winner', 'ship', 'openSource'],
    likes: 342,
    image: '/mlh.jpg',
  },
]

const commands = ['help', 'whoami', 'about', 'experience', 'skills', 'projects', 'projects --view AskRepo', 'projects --view ScholarMates', 'freelance', 'resume --download', 'contact', 'ask "<question>"', 'chat', 'stop-chat', 'scan', 'clear', 'theme <name>']
const themes = ['midnight', 'amber', 'mint'] as const

type Theme = (typeof themes)[number]

function initialLines(): Line[] {
  const base: Line[] = [
    { id: 1, kind: 'system', text: 'booting jyotiraditya@builds portfolio...' },
    { id: 2, kind: 'system', text: `loaded ${projects.length} projects · ${experiences.length} roles · ${skills.length} skills · ${freelanceServices.length} freelance services · ${certifications.length} wins` },
    { id: 3, kind: 'accent',  text: 'Welcome. Available commands:' },
    { id: 4, kind: 'system',  text: '' },
  ]
  const commandLines: Line[] = commands.map((cmd, index) => ({
    id: 10 + index,
    kind: 'output',
    text: `  ${cmd}`,
  }))
  const tail: Line[] = [
    { id: 90, kind: 'system', text: '' },
    { id: 91, kind: 'accent', text: 'Tip: press Tab to autocomplete · ↑/↓ to navigate history · type "help" anytime.' },
    { id: 92, kind: 'system', text: '' },
  ]
  return [...base, ...commandLines, ...tail]
}

function outputFor(command: string, setChatMode: (value: boolean) => void, setScanMode: (value: boolean) => void): string[] {
  const trimmed = command.trim()
  const lower = trimmed.toLowerCase()
  if (!trimmed) return []
  if (lower === 'help') return ['available commands:', ...commands.map((item) => `  ${item}`), '', 'tip: press tab to autocomplete · ↑/↓ to navigate history']
  if (lower === 'whoami') return [`${profile.name} — ${profile.role}`, `location: ${profile.location}`]
  if (lower === 'about') return [profile.bio, '', `currently: building things that feel obvious after they exist.`]
  if (lower === 'experience') return experiences.flatMap(([date, title, company, description]) => [`${date}  ${title} @ ${company}`, `          ${description}`, ''])
  if (lower === 'skills') return [
    ...Array.from({ length: Math.ceil(skills.length / 4) }, (_, index) => skills.slice(index * 4, index * 4 + 4).map((skill) => skill.name).join(' · ')),
    'MERN stack · Python automation · system design · DSA · 550+ LeetCode solved',
  ]
  if (lower === 'freelance') return [
    'Available for freelance projects. Primary focus: MERN and Java / Spring full-stack development.',
    '',
    ...freelanceServices.flatMap((service) => [service.title, `  ${service.stack}`, `  ${service.description}`, '']),
    `Project enquiries: ${profile.email}`,
    'Share your project scope, timeline, and budget to discuss next steps.',
  ]
  if (lower === 'projects') return projects.flatMap((project, index) => [`[${index + 1}] ${project.name} — ${project.description}`, `    ${project.stack.join(' · ')} · ${project.link}`])
  if (lower.startsWith('projects --view')) {
    const name = trimmed.slice('projects --view'.length).trim().toLowerCase()
    const project = projects.find((item) => item.name.toLowerCase() === name)
    return project ? [`${project.name}`, project.description, '', project.detail, '', `stack: ${project.stack.join(' · ')}`, `link: ${project.link}`] : ['project not found. try projects to see the list.']
  }
  if (lower === 'resume --download') return ['fetching resume.pdf ...', 'available at /resume.pdf — use the download action in the footer.']
  if (lower === 'contact') return ['Available for freelance MERN and Java / Spring full-stack projects, with React and Next.js frontends.', `email: ${profile.email}`, 'Email your project scope, timeline, and budget, or use the email link in normal view.']
  if (lower === 'chat') { setChatMode(true); return ['chat mode enabled. ask anything; type stop-chat or /exit to return to commands.'] }
  if (lower === 'stop-chat' || lower === 'stop chat' || lower === '/exit') { setChatMode(false); return ['chat stopped. returned to command mode.'] }
  if (lower === 'scan') { setScanMode(true); return ['scanning portfolio surface...', 'signal found: playful systems + thoughtful interfaces', 'scan complete. animation remains active in the header.'] }
  if (lower === 'clear') return ['__CLEAR__']
  if (lower === 'sudo') return ['nice try. you already have root access to the portfolio.']
  if (lower.startsWith('theme ')) return [`theme switched to ${trimmed.slice(6).trim()}.`]
  if (lower === 'theme') return ['themes: midnight · amber · mint', 'try: theme mint']
  if (lower === 'date') return [new Date().toLocaleString()]
  if (lower === 'ls') return ['about.md  experience.log  skills.json  projects/  freelance.md  resume.pdf  contact.txt']
  if (lower.startsWith('ask ')) return ['AI endpoint not connected yet.', 'Set NEXT_PUBLIC_API_URL to enable live answers. For now: keep asking better questions.']
  return [`command not found: ${trimmed}`, 'type help for available commands.']
}

export default function Page() {
  const [lines, setLines] = useState<Line[]>(initialLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [theme, setTheme] = useState<Theme>('midnight')
  const [chatMode, setChatMode] = useState(false)
  const [scanMode, setScanMode] = useState(false)
  const [normalView, setNormalView] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lineId = useRef(100)

  const prompt = useMemo(() => chatMode ? 'chat' : 'jyotiraditya@builds', [chatMode])

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }) }, [lines])

  function addLines(items: string[], kind: Line['kind'] = 'output') {
    setLines((current) => [...current, ...items.map((text) => ({ id: lineId.current++, kind, text }))])
  }

  function runCommand(raw: string) {
    const command = raw.trim()
    if (!command) return
    setHistory((current) => [command, ...current.filter((item) => item !== command)].slice(0, 30))
    setHistoryIndex(-1)
    addLines([`${prompt} $ ${command}`], 'command')
    if (chatMode && !['/exit', 'stop-chat', 'stop chat'].includes(command.toLowerCase())) {
      addLines(['thinking...', 'AI endpoint not connected yet. Set NEXT_PUBLIC_API_URL to enable live chat.'], 'output')
      return
    }
    const result = outputFor(command, setChatMode, setScanMode)
    if (result.includes('__CLEAR__')) { setLines([]); return }
    addLines(result, result[0]?.startsWith('command not found') ? 'error' : 'output')
    if (command.toLowerCase().startsWith('theme ')) {
      const requested = command.slice(6).trim().toLowerCase() as Theme
      if (themes.includes(requested)) setTheme(requested)
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) runCommand(input)
    if (event.key === 'ArrowUp') { event.preventDefault(); const next = Math.min(historyIndex + 1, history.length - 1); setHistoryIndex(next); setInput(history[next] ?? '') }
    if (event.key === 'ArrowDown') { event.preventDefault(); const next = Math.max(historyIndex - 1, -1); setHistoryIndex(next); setInput(next === -1 ? '' : history[next]) }
    if (event.key === 'Tab') { event.preventDefault(); const match = commands.find((command) => command.startsWith(input.toLowerCase())); if (match) setInput(match) }
  }

  if (normalView) return <NormalView onTerminal={() => setNormalView(false)} />

  return (
    <main className={`terminal-page theme-${theme}`} onClick={() => inputRef.current?.focus()}>
      <section className="terminal-window" aria-label="Interactive portfolio terminal">
        <header className="terminal-header" onClick={(event) => event.stopPropagation()}>
          <div className="traffic-lights" aria-hidden="true"><span /><span /><span /></div>
          <div className={`window-title ${scanMode ? 'is-scanning' : ''}`}><TerminalIcon size={14} /> jyotiraditya@builds — zsh {scanMode && <span className="scan-signal">◌ scanning</span>}</div>
          <button className="view-toggle" onClick={() => setNormalView(true)}>normal view</button>
        </header>
        <div className="terminal-body" ref={scrollRef} role="log" aria-live="polite">
          <div className="terminal-intro"><span className="prompt-mark">$</span><span>interactive portfolio</span><span className="status-dot">● online</span></div>
          {lines.map((line) => <div className={`terminal-line line-${line.kind}`} key={line.id}>{line.text || '\u00a0'}</div>)}
          <div className="command-row"><span className="prompt">{prompt} $</span><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={onKeyDown} aria-label="Terminal command input" autoComplete="off" spellCheck={false} /></div>
          <p className="mobile-hint">tap the window to focus · tab autocomplete · ↑ history</p>
        </div>
        <footer className="terminal-footer" onClick={(event) => event.stopPropagation()}>
          <button onClick={() => runCommand('help')}>help</button><button onClick={() => runCommand('about')}>about</button><button onClick={() => runCommand('projects')}>projects</button><button onClick={() => runCommand('freelance')}>freelance</button><button onClick={() => runCommand('contact')}>contact</button>
          <span className="footer-spacer" /><button onClick={() => setTheme(theme === 'midnight' ? 'amber' : theme === 'amber' ? 'mint' : 'midnight')} title="Switch theme">{theme === 'midnight' ? <Moon size={14} /> : <Sun size={14} />}</button><a href={profile.resume} download title="Download resume"><Download size={14} /></a><a href={`mailto:${profile.email}`} title="Email"><Mail size={14} /></a><a href={`https://${profile.github}`} target="_blank" rel="noreferrer" title="GitHub">GH</a><a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" title="LinkedIn">in</a>
        </footer>
      </section>
    </main>
  )
}

function NormalView({ onTerminal }: { onTerminal: () => void }) {
  const heroRef = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [activeCert, setActiveCert] = useState<number | null>(null)

  useEffect(() => {
    function onMove(event: MouseEvent) {
      const element = heroRef.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        setTilt({ x: 0, y: 0 })
        return
      }
      const nx = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5))
      const ny = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5))
      setTilt({ x: nx, y: ny })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    if (activeCert === null) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveCert(null)
      if (event.key === 'ArrowRight') setActiveCert((i) => (i === null ? null : (i + 1) % certifications.length))
      if (event.key === 'ArrowLeft') setActiveCert((i) => (i === null ? null : (i - 1 + certifications.length) % certifications.length))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeCert])

  const heroStyle = {
    transform: `perspective(1400px) rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 6}deg)`,
  } as React.CSSProperties

  const parallax = (depth: number) => ({
    transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`,
  }) as React.CSSProperties

  return (
    <main className="portfolio-page">
      <div className="bg-scene" aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" style={parallax(30)} />
        <div className="bg-orb bg-orb-2" style={parallax(-40)} />
        <div className="bg-orb bg-orb-3" style={parallax(20)} />
        <div className="bg-noise" />
      </div>

      <nav className="portfolio-nav">
        <div className="brand">
          <span className="brand-dot" />
          <span>{profile.handle}</span>
        </div>
        <div className="nav-links">
          <a href="#work">work</a>
          <a href="#freelance">freelance</a>
          <a href="#experience">experience</a>
          <a href="#skills">skills</a>
          <a href="#certifications">certifications</a>
          <a href="#contact">contact</a>
        </div>
        <button className="pill-btn" onClick={onTerminal}>
          <TerminalIcon size={14} /> terminal
        </button>
      </nav>

      <section ref={heroRef} className="hero">
        <div className="hero-shapes" aria-hidden="true">
          <div className="shape shape-cube" style={parallax(60)}>
            <span className="face f-front" /><span className="face f-back" />
            <span className="face f-right" /><span className="face f-left" />
            <span className="face f-top" /><span className="face f-bottom" />
          </div>
          <div className="shape shape-ring" style={parallax(-45)}>
            <span className="ring" /><span className="ring" /><span className="ring" />
          </div>
          <div className="shape shape-sphere" style={parallax(35)} />
        </div>

        <div className="hero-inner">
          <div className="eyebrow-row">
            <span className="status-pill"><span className="ping" /> available for freelance projects</span>
            <span className="location-pill"><MapPin size={12} /> {profile.location}</span>
          </div>
          <h1 className="hero-title">
            <span className="grad-text">{profile.name.split(' ')[0]}</span>
            <br />
            <span className="outline-text">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-bio">{profile.bio}</p>
          <div className="hero-actions">
            <a className="btn-primary" href={`mailto:${profile.email}`}>
              <Mail size={16} /> Get in touch
              <span className="btn-shine" />
            </a>
            <a className="btn-ghost" href="#freelance">
              <ArrowUpRight size={16} /> Discuss a project
            </a>
            <a className="btn-ghost" href={profile.resume} download>
              <Download size={16} /> Resume
            </a>
          </div>
        </div>

        <div className="hero-card" style={heroStyle}>
          <div className="card-glow" />
          <div className="card-inner">
            <div className="avatar-frame">
              <span className="avatar-ring" aria-hidden="true" />
              <span className="avatar-orbit" aria-hidden="true"><i /></span>
              <img
                src="/Jyotiraditya_image.jpeg"
                alt={`${profile.name} portrait`}
                className="avatar-photo"
              />
              <span className="avatar-status" title="Available"><span /> available</span>
            </div>
            <div className="card-head">
              <span className="card-dots"><i /><i /><i /></span>
              <span className="card-title"><Sparkles size={12} /> now</span>
            </div>
            <div className="card-body">
              <div className="card-metric">
                <small>currently</small>
                <p>Building banking backends and agentic AI at <b>IBM</b>. Full-stack focus: MERN and Java / Spring Boot, with React and Next.js.</p>
              </div>
              <div className="card-stats">
                <div><b>550+</b><span>DSA solved</span></div>
                <div><b>9.27</b><span>GPA</span></div>
                <div><b>99.9%</b><span>uptime</span></div>
              </div>
              <div className="card-tags">
                {['mern', 'java', 'spring boot', 'next.js'].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <div className="section-head">
          <span className="section-index">01</span>
          <h2>Selected work</h2>
          <p>Products I designed, built, and shipped end-to-end.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="freelance" className="section">
        <div className="section-head">
          <span className="section-index">02</span>
          <h2>Freelance projects</h2>
          <p>Available for MERN and Java / Spring full-stack projects, from startup MVPs to business applications.</p>
        </div>
        <div className="timeline">
          {freelanceServices.map((service) => (
            <div className="timeline-item" key={service.title}>
              <span className="timeline-dot" />
              <small>{service.stack}</small>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <a className="btn-primary" href={freelanceEmail}>
            <Mail size={16} /> Discuss your project
          </a>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="section-head">
          <span className="section-index">03</span>
          <h2>Experience</h2>
          <p>Places I&apos;ve helped teams build durable software.</p>
        </div>
        <div className="timeline">
          {experiences.map(([date, title, company, description]) => (
            <div className="timeline-item" key={date}>
              <span className="timeline-dot" />
              <small>{date}</small>
              <h3>{title} <span>@ {company}</span></h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section-head">
          <span className="section-index">04</span>
          <h2>Toolkit</h2>
          <p>MERN and Java / Spring Boot, React & Next.js, plus agentic AI, RAG, and LLM tooling.</p>
        </div>
        <div className="skills-cloud">
          {skills.map((skill, index) => (
            <span
              key={skill.name}
              className="skill-chip"
              style={{ animationDelay: `${index * 0.12}s`, ...parallax(6 + (index % 4) * 4) }}
            >
              <span
                className="skill-icon"
                style={{ background: skill.color, color: skill.textColor ?? '#fff' }}
                aria-hidden="true"
              >
                {skill.icon}
              </span>
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section id="certifications" className="section">
        <div className="section-head">
          <span className="section-index">05</span>
          <h2>Trophy wall</h2>
          <p>Certifications and hackathon wins &mdash; tap any card to view the full certificate.</p>
        </div>
        <div className="trophy-wall">
          {certifications.map((cert, index) => (
            <button
              key={cert.title}
              className={`trophy-card${index === 0 ? ' featured' : ''}`}
              onClick={() => setActiveCert(index)}
              style={{ ['--trophy-accent' as string]: cert.gradient } as React.CSSProperties}
              aria-label={`View ${cert.title}`}
            >
              <span className="trophy-glow" aria-hidden="true" />
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="trophy-photo" loading="lazy" />
              ) : (
                <span className="trophy-fallback" style={{ background: cert.gradient }}>
                  <span className="trophy-fallback-badge">{cert.badge}</span>
                </span>
              )}
              <span className="trophy-chip">
                <span className="trophy-chip-dot" /> {cert.badge}
              </span>
              <span className="trophy-meta">
                <b>{cert.title}</b>
                <small>{cert.org} &middot; {cert.date}</small>
              </span>
              <span className="trophy-view" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {activeCert !== null && createPortal(
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={certifications[activeCert].title}
          onClick={() => setActiveCert(null)}
        >
          <button
            className="lightbox-close"
            onClick={(event) => { event.stopPropagation(); setActiveCert(null) }}
            aria-label="Close"
          >
            &times;
          </button>
          <button
            className="lightbox-nav prev"
            onClick={(event) => {
              event.stopPropagation()
              setActiveCert((i) => (i === null ? null : (i - 1 + certifications.length) % certifications.length))
            }}
            aria-label="Previous certificate"
          >
            &#8249;
          </button>
          <button
            className="lightbox-nav next"
            onClick={(event) => {
              event.stopPropagation()
              setActiveCert((i) => (i === null ? null : (i + 1) % certifications.length))
            }}
            aria-label="Next certificate"
          >
            &#8250;
          </button>
          <div className="lightbox-card" onClick={(event) => event.stopPropagation()}>
            {certifications[activeCert].image ? (
              <img
                src={certifications[activeCert].image}
                alt={certifications[activeCert].title}
                className="lightbox-photo"
              />
            ) : (
              <div
                className="lightbox-fallback"
                style={{ background: certifications[activeCert].gradient }}
              >
                <span className="lightbox-fallback-badge">{certifications[activeCert].badge}</span>
                <h3>{certifications[activeCert].title}</h3>
                <p>{certifications[activeCert].org}</p>
              </div>
            )}
            <footer className="lightbox-meta">
              <div>
                <b>{certifications[activeCert].title}</b>
                <small>{certifications[activeCert].org} &middot; {certifications[activeCert].date}</small>
              </div>
              {certifications[activeCert].link ? (
                <a
                  href={certifications[activeCert].link}
                  target="_blank"
                  rel="noreferrer"
                  className="lightbox-link"
                >
                  View original <ArrowUpRight size={14} />
                </a>
              ) : null}
              <span className="lightbox-count">
                {activeCert + 1} / {certifications.length}
              </span>
            </footer>
          </div>
        </div>,
        document.body
      )}

      <section id="contact" className="section contact-section">
        <div className="contact-card">
          <span className="contact-glow" />
          <h2>Let&apos;s build something useful.</h2>
          <p>Open to freelance projects and MERN / Java Spring full-stack roles, with React and Next.js on the frontend. For project enquiries, share your scope, timeline, and budget.</p>
          <div className="contact-actions">
            <a className="btn-primary" href={`mailto:${profile.email}`}>
              <Mail size={16} /> {profile.email}
              <ArrowUpRight size={14} />
            </a>
            <div className="social-row">
              <a href={`https://${profile.github}`} target="_blank" rel="noreferrer"><span className="social-badge">GH</span> GitHub</a>
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer"><span className="social-badge">in</span> LinkedIn</a>
              <a href={profile.resume} download><span className="social-badge">PDF</span> Resume</a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><span className="social-badge">☎</span> {profile.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <button className="pill-btn subtle" onClick={onTerminal}>
          <TerminalIcon size={12} /> return to terminal
        </button>
      </footer>
    </main>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [t, setT] = useState({ x: 0, y: 0, active: false })

  function onMove(event: React.MouseEvent) {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width - 0.5
    const ny = (event.clientY - rect.top) / rect.height - 0.5
    setT({ x: nx, y: ny, active: true })
  }

  const style = {
    transform: t.active
      ? `perspective(1000px) rotateY(${t.x * 14}deg) rotateX(${-t.y * 12}deg) translateZ(6px)`
      : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
  } as React.CSSProperties

  const shine = {
    background: t.active
      ? `radial-gradient(400px circle at ${(t.x + 0.5) * 100}% ${(t.y + 0.5) * 100}%, rgba(183,243,151,.18), transparent 45%)`
      : 'transparent',
  } as React.CSSProperties

  return (
    <article
      ref={ref}
      className={`project-card${project.images?.length ? ' has-preview' : ''}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0, active: false })}
    >
      <span className="project-shine" style={shine} />
      <div className="project-index">0{index + 1}</div>
      {project.images?.length ? (
        <div className="project-preview" aria-hidden="true">
          <div className="project-preview-glow" />
          {project.images.slice(0, 3).map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              className={`project-preview-shot shot-${i + 1}`}
            />
          ))}
        </div>
      ) : null}
      <div className="project-body">
        <h3>{project.name}</h3>
        {project.tagline ? <span className="project-tagline">{project.tagline}</span> : null}
        <p>{project.description}</p>
        <p className="project-detail">{project.detail}</p>
        <div className="project-stack">
          {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
        </div>
        <a className="project-link" href={`https://${project.link}`} target="_blank" rel="noreferrer">
          Visit <ArrowUpRight size={14} />
        </a>
      </div>
    </article>
  )
}

export { profile, projects }
