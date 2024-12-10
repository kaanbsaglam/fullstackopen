import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: username,
        password: password
      }
      const loggedInUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      setNotificationMessage(`Successfully logged in as ${username}`)
      setTimeout(() => {
        setNotificationMessage(null)
      },3000)
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage("wrong username or password")
      setTimeout(() => {
        setNotificationMessage(null)
      },3000)
    }

  }


  const handleLogout = () => {
    try{
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
    setNotificationMessage("user successfully logged out.")
    setTimeout(() => {
      setNotificationMessage(null)
    },3000)
    }catch(error){
      setNotificationMessage("error logging out")
      setTimeout(() => {
        setNotificationMessage(null)
      },3000)
    }
  }



  const createNewBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setNotificationMessage(`Created a new blog: ${newBlog.title} ${newBlog.author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      },3000)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
    } catch (error) {
      setNotificationMessage(error.response.data.error) //i should check if this null and write something else if so
      setTimeout(() => {
        setNotificationMessage(null)
      },3000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try{
      const updatedBlog = await blogService.update(id, blogObject)
      setNotificationMessage(`Liked blog: ${updatedBlog.title} ${updatedBlog.author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      },3000)
      setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))

    }
    catch(error){
      setNotificationMessage("error encountered while trying to like the post") 
      setTimeout(() => {
        setNotificationMessage(null)
      },3000)
    }
  }


  const deleteBlog = async (id) => {
    try{
      const blogToDelete = blogs.find(blog => blog.id === id)
      if(window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)){
        const deletedBlog = await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotificationMessage(`removed blog: ${deletedBlog.title} ${deletedBlog.author}`)
        setTimeout(() => {
          setNotificationMessage(null)
        },3000)
      }
    }
    catch(error){
      setNotificationMessage("error encountered while trying to delete the post") 
      setTimeout(() => {
        setNotificationMessage(null)
      },3000)
    }
  }



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage}/>
        <LoginForm
          loginUser={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage}/>
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createNewBlog={createNewBlog}
        />
      </Togglable>

      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App