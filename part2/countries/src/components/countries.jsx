import Country from "./country"


const Countries = ({countries}) => {
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
            {countries.map((c) =>
                c.name.common)}       
        </div>
    )
}

export default Countries