import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[searched, setSearched] = useState('')

  useEffect(() => {
    console.log("effect")
    axios.get('http://localhost:3001/persons').then(response => {
      console.log("inside then")
      setPersons(response.data)
    })
  },[])


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