import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Resume' },
  { to: '/work', label: 'Work' },
  { to: '/game', label: 'Game' },
  { to: '/blog', label: 'Blog' },
  { to: '/notes', label: 'Notes' },
  { to: '/login', label: 'Login' },
]

export default function TopNav() {
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <NavLink to="/" className="brand">Koi<span> · Portfolio</span></NavLink>
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
