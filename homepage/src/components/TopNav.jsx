import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: '简历' },
  { to: '/game', label: '游戏' },
  { to: '/blog', label: 'Blog' },
  { to: '/notes', label: '小纸条' },
  { to: '/login', label: '登录' },
]

export default function TopNav() {
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <NavLink to="/" className="brand">Koi<span> · 作品集</span></NavLink>
        <div className="nav-links">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
