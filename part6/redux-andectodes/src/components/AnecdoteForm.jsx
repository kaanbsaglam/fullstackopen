import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";



const AnecdoteForm = () => {
  const dispatch = useDispatch() 

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotificationWithTimeout(`you added '${content}'`));
  }
  return (
    <div>
      <form onSubmit={addAnecdote}>
        <input name="anecdote"></input>
          <button type="submit">create</button>
        
      </form>
    </div>
  )
}

export default AnecdoteForm