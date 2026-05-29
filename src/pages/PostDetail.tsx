import { useParams, useNavigate } from 'react-router-dom'
import { usePostStore } from '../stores/post.store'
import toast from 'react-hot-toast'

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const post = usePostStore((state) => state.getPostById(id!))
  const deletePost = usePostStore((state) => state.deletePost)

  if (!post) {
    return (
      <div className="container">
        <p>Post not found.</p>
      </div>
    )
  }

  const handleDelete = () => {
    deletePost(post.id)
    toast.success('Post deleted! Find it in trash.')
    navigate('/posts')
  }

  return (
    <div className="container">
      <div className="post-detail">
        <h1>{post.title}</h1>
        <div className="post-detail-content">{post.content}</div>
        <div className="post-detail-actions">
          <button className="button button-primary" onClick={() => navigate(`/posts/${post.id}/edit`)}>
            Edit
          </button>
          <button className="button button-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="button button-secondary" onClick={() => navigate('/posts')}>
            Back to Posts
          </button>
        </div>
      </div>
    </div>
  )
}
