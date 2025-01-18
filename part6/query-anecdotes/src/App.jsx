import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests/requests'

const App = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const addAnecdote = async (content) => {
    newAnecdoteMutation.mutate({content, votes:0})
  }

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(['anecdotes'],updatedAnecdotes)
    }
  })





  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes+1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry:false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data

  if(result.isLoading){
    return <div>loading...</div>
  }

  if (result.isError){
    return <div>{result.error.message}</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
