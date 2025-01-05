import PropTypes from 'prop-types'
import { useState } from 'react'
const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      userid: blog.user.id
    }
    await updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = async () => {
    await removeBlog(blog.id)
  }


  const [isDetailed, setDetailed] = useState(false)
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setDetailed(!isDetailed)}>{isDetailed ? "hide" : "view"}</button>
      {isDetailed && (
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
          {currentUser.username === blog.user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default Blog