import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userListSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setUserList(state, action) {
      console.log("action.payload", action.payload)
      return action.payload
    }
  }
})

export const initializeUserList = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log("iusers," , users)
    dispatch(setUserList(users))
  }
}

export const { setUserList } = userListSlice.actions
export default userListSlice.reducer