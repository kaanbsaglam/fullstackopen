import { useState } from "react"
const Blog = ({ blog, updateBlog, removeBlog}) => {

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
    await updateBlog(blog.id,updatedBlog)
  }

  const handleDelete = async () => {
    await removeBlog(blog.id)
  }

  const [isDetailed, setDetailed] = useState(false)
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} 
    <button onClick={() => setDetailed(!isDetailed)}>{isDetailed?"hide":"view"}</button>
    {isDetailed && (
      <div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={handleDelete}>remove</button>
      </div>
    )}
    
  </div>  
)}

export default Blog