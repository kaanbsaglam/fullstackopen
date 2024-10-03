import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './service/persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[searched, setSearched] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])


  const addNewPerson = (event) => {
    event.preventDefault()
    if(persons.some((person) => person.name == newName)){
      if(confirmNumberReplacement(newName)){
        const oldPerson = persons.find(person => person.name == newName)
        const updatedPerson = {
          ...oldPerson, number:newNumber
        }
        personService.update(oldPerson.id,updatedPerson).then(updatedPerson => {
          console.log(updatedPerson)
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
        })
      }
      else{
        // i dont know whether or not its better to clear the name and number inputs if user declines
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (id) => {
    // TODO: maybe check if person with id exists

    if(window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`))
    personService.remove(id).then(deletedPerson => {
      setPersons(persons.filter(person => person.id != id))
    })
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

  

  const confirmNumberReplacement = (name) => {
    return window.confirm(`${name} is already added to phonebook, replace the old number with the new one?`)
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
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App