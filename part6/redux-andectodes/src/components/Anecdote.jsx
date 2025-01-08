const Anecdote = ({anecdote, handleVote}) => {
  return (
    <li>
      <span>{anecdote.content}</span> <br></br>
      <span>has {anecdote.votes} <button onClick={handleVote}>vote</button></span>
    </li>
  )
}


export default Anecdote