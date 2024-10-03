import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './service/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searched, setSearched] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
        }).catch((error) => {
          setErrorMessage(`Information of ${updatedPerson.name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
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
        setSuccessMessage(`added ${personObject.name}`)
        setTimeout(() => {
        setSuccessMessage(null)
        },5000)
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
      <Notification.ErrorNotification message={errorMessage}/>
      <Notification.SuccessNotification message={successMessage}/>
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