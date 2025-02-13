import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      console.error("failed login:", error)
      dispatch(setUser(null))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBloglistUser")
    blogService.setToken(null)
    dispatch(clearUser())
  }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
