import { useState, useEffect } from 'react'
import countryService from './service/countries'
import Filter from './components/filter'
import Countries from './components/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searched, setSearched] = useState('')



  const filteredCountries = (searched == '') 
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(searched.toLowerCase())) 

  useEffect(() => {
    countryService
      .getAll()
      .then((allCountries => {
        setCountries(allCountries)
      }
      ))
  },[])
  
  const handleSearchedChange = (event) => {
    setSearched(event.target.value)
  }

  const handleShow = (commonName) => {
    setSearched(commonName)
  }

 // i can pass the searched value to Filter if we want to reflect it in the Filter form
  return (
    <div>
      <Filter handleSearchedChange={handleSearchedChange}/>
      <Countries countries={filteredCountries} handleShow={handleShow}/>

    </div>
  )
}

export default App
