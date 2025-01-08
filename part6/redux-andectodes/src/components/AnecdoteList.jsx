import Anecdote from "./Anecdote"
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state.anecdotes]
    .filter(anecdote => anecdote.content.includes(state.filter))
    .sort((a,b) => b.votes-a.votes))


  return (
    <ul>
      {anecdotes.map(anecdote => 
        <Anecdote
          key = {anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(voteAnecdote(anecdote.id))}
        />
      )}
    </ul>
  )
}

export default AnecdoteList