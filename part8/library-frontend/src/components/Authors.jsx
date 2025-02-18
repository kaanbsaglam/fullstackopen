import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import EditBirthyearForm from './EditBirthyearForm'


const Authors = () => {

  const result = useQuery(ALL_AUTHORS)
  console.log(result)



  if(result.loading) {
    return <div>loading...</div>
  }

  if(result.error) {  
    console.log(result.error)
    return <div>Error</div>
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
      <h2>Set birthyear</h2>
      <EditBirthyearForm /> 
    </div>
  )
}

export default Authors
