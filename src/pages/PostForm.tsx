import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePostStore } from '../stores/post.store'
import toast from 'react-hot-toast'

export default function PostForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const post = usePostStore((state) => state.getPostById(id!))
  const addPost = usePostStore((state) => state.addPost)
  const updatePost = usePostStore((state) => state.updatePost)

  const isEditMode = !!id && post

  useEffect(() => {
    if (isEditMode && post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [isEditMode, post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    if (isEditMode) {
      updatePost(post!.id, title, content)
      toast.success('Post updated!')
      navigate(`/posts/${post!.id}`)
    } else {
      addPost(title, content)
      toast.success('Post created!')
      navigate('/posts')
    }
  }

  return (
    <div className="container">
      <h2>{isEditMode ? 'Edit Post' : 'Create New Post'}</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button button-primary">
            {isEditMode ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => navigate(isEditMode ? `/posts/${id}` : '/posts')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
