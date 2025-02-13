import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import Togglable from "./components/Togglable"
import { loginUser, logoutUser } from './reducers/userReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Users from "./components/Users"
import UserDetails from "./components/UserDetails"
import BlogDetails from "./components/BlogDetails"
import { initializeUserList } from "./reducers/userListReducer"


const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const notificationMessage = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserList())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])



  const handleLogout = () => {
    dispatch(logoutUser())
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />

      {user ? (
        <div>
          <p>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <nav>
            <Link to="/">Home</Link> | <Link to="/users">Users</Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm />
                  </Togglable>

                  {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <Blog key={blog.id} blog={blog} currentUser={user} />
                    ))}
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />

            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
