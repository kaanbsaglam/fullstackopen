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


  return (
    <div>
      <Filter handleSearchedChange={handleSearchedChange}/>
      <Countries countries={filteredCountries}/>
    </div>
  )
}

export default App
