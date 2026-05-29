import { usePostStore } from '../stores/post.store'
import toast from 'react-hot-toast'

export default function Trash() {
  const deletedPosts = usePostStore((state) => state.getDeletedPosts())
  const recoverPost = usePostStore((state) => state.recoverPost)
  const permanentlyDeletePost = usePostStore((state) => state.permanentlyDeletePost)

  const handleRecover = (id: string) => {
    recoverPost(id)
    toast.success('Post recovered!')
  }

  const handlePermanentDelete = (id: string) => {
    permanentlyDeletePost(id)
    toast.success('Post permanently deleted!')
  }

  return (
    <div className="container">
      <h2>Trash</h2>

      {deletedPosts.length === 0 ? (
        <div className="empty-state">
          <h2>Trash is empty</h2>
          <p>Deleted posts will appear here.</p>
        </div>
      ) : (
        <div className="posts-list">
          {deletedPosts.map((post) => (
            <div key={post.id} className="post-card" style={{ cursor: 'default' }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-actions">
                <button
                  className="button button-success"
                  onClick={() => handleRecover(post.id)}
                >
                  Recover
                </button>
                <button
                  className="button button-danger"
                  onClick={() => handlePermanentDelete(post.id)}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
