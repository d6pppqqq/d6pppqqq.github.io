import { Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './components/TopNav.jsx'
import Sidebar from './components/Sidebar.jsx'
import Resume from './pages/Resume.jsx'
import Game from './pages/Game.jsx'
import Blog from './pages/Blog.jsx'
import Notes from './pages/Notes.jsx'
import Login from './pages/Login.jsx'
import Write from './pages/Write.jsx'

export default function App() {
  return (
    <>
      <TopNav />
      <div className="container">
        <div className="layout">
          <Sidebar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Resume />} />
              <Route path="/game" element={<Game />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/write" element={<Write />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}
