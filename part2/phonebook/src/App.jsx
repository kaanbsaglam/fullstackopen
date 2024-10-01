import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const[searched, setSearched] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    if(persons.some((person) => person.name == newName)){
      alertSameNameExists()

    }
    else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(searched)
  }

  const handleSearchedChange = (event) => {
    setSearched(event.target.value)
  }

  

  const alertSameNameExists = () => {
    alert(`${newName} is already added to phonebook`)
  }

  const filteredPersons = (searched == '') 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(searched.toLowerCase())) 

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input onChange={handleSearchedChange}/>
        </div>


      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App