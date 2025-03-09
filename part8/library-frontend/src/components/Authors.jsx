import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

const Authors = () => {

  const result = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [born, setBorn] = useState("")
  const [ changeBirthyear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if(result.loading) {
    return <div>loading...</div>
  }


  if(result.error) {  
    console.log(result.error)
    return <div>Error</div>
  }

  const submit = (event) => {
    event.preventDefault()
    if(!selectedAuthor || !born) {
      console.error("Author and birthyear must be selected")
      return
    }
    changeBirthyear({ variables: { name:selectedAuthor, setBornTo: Number(born) } })

    setSelectedAuthor('')
    setBorn('')
  }

  const authors = result.data.allAuthors


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <label>Author:</label>
          <select
            value={selectedAuthor}
            onChange={({ target }) => setSelectedAuthor(target.value)}
          >
            <option value="" disabled>Select an author</option>
            {result.data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Birth Year:</label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}



export default Authors
