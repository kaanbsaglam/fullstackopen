import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";



const AnecdoteForm = () => {
  const dispatch = useDispatch() 

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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