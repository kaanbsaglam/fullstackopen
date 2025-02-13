import { useState } from "react"
import { useDispatch } from 'react-redux'
import PropTypes from "prop-types"
import { createBlog } from "../reducers/blogReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"

const BlogForm = () => {

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }))
    dispatch(setNotificationWithTimeout(`Created a new blog: ${newTitle} ${newAuthor}`,5))
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }

  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }




  return (
    <form onSubmit={addBlog}>
      <div>
        title:{" "}
        <input
          className="titleInput"
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:{" "}
        <input
          className="authorInput"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:{" "}
        <input className="urlInput" value={newUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
}

export default BlogForm
