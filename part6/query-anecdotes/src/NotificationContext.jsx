import { createContext, useReducer, useContext } from 'react'



const notificationReducer = (state,action) => {
  switch(action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return ''
    default:
      return state
  }
}

const notificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer,'')

  return (
    <notificationContext.Provider value={[notification,notificationDispatch]} >
      {props.children}
    </notificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(notificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(notificationContext)
  return notificationAndDispatch[1]
}


export default notificationContext