import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { likeBlog, removeBlog } from "../reducers/blogReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"

const BlogDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.user)

  if (!blog) {
    return <div>Loading...</div>
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotificationWithTimeout(`You liked "${blog.title}"`, 5))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotificationWithTimeout(`Removed "${blog.title}"`, 5))
    }
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <p>
        <a href={blog.url}>
          {blog.url}
        </a>
      </p>
      <p>
        likes: {blog.likes}{" "}
        <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {user && user.username === blog.user.username && (
        <button onClick={handleRemove}>remove</button>
      )}
    </div>
  )
}

export default BlogDetails
