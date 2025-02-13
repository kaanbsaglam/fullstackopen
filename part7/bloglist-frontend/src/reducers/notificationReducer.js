import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state,action){
      return action.payload
    },
    clearNotification(state,action){
      return ''
    }
  }
})


export const setNotificationWithTimeout = (message, duration) => (dispatch) => {
  dispatch(setNotification(message))
  setTimeout(() => {
    dispatch(clearNotification())
  }, duration * 1000)
}


export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer