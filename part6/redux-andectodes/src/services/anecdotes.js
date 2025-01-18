import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {content, votes:0}
  const response = await axios.post(baseUrl,object)
  return response.data
}

const update = async (id, content, votes) => {
  const updatedAnecdote = {content, votes}
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data   // i dont know if i shouldve used patch and only provide id
}


export default {getAll, createNew, update }
