import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Posts from './pages/Posts'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
import Trash from './pages/Trash'

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="container">
          <h1>My Blog</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/trash">Trash</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostForm />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}
