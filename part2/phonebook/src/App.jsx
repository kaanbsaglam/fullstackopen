import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

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
          <Filter handleSearchedChange={handleSearchedChange}/>



      <h3>add a new</h3>

      <PersonForm 
      addNewPerson={addNewPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App