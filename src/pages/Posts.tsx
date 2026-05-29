import { useNavigate } from 'react-router-dom'
import { usePostStore } from '../stores/post.store'

export default function Posts() {
  const navigate = useNavigate()
  const posts = usePostStore((state) => state.getActivePosts())

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Posts</h2>
        <button className="button button-primary" onClick={() => navigate('/posts/new')}>
          Create Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <h2>No posts yet</h2>
          <p>Create your first post to get started!</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
