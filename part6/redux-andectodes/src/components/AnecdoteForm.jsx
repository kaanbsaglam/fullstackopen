import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch() 

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteService.createNew(content)
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