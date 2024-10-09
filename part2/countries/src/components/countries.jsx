import Country from "./country"


const Countries = ({countries, handleShow}) => {
    if(countries.length > 10){
        return <div><p>Too many matches, specify another filter</p></div>
    }
    else if(countries.length == 0){
        return <div><p>No country matches, specify another filter</p></div>
    } 
    else if(countries.length == 1){
        return <Country country={countries[0]}/>
    }
    return(
        <div>
            <p>
            {countries.map((c) => (
                <div key={c.name.common}>
                {c.name.common}
                <button type="button" onClick={() => handleShow(c.name.common)}>show</button>
                <br></br>
                </div>
                ))}       
            </p>
            
            
        </div>
    )
}

export default Countries