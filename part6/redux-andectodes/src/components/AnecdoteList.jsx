import Anecdote from "./Anecdote"
import { useDispatch, useSelector } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state.anecdotes]
    .filter(anecdote => anecdote.content.includes(state.filter))
    .sort((a,b) => b.votes-a.votes))
  
    const handleVote = (anecdote) => {
      dispatch(vote(anecdote))
      dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}`,10))
    }


  return (
    <ul>
      {anecdotes.map(anecdote => 
        <Anecdote
          key = {anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote)}
        />
      )}
    </ul>
  )
}

export default AnecdoteList