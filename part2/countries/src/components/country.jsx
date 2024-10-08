
const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <br></br>
            <p>capital {country.capital.join(",")}</p>
            <p>area {country.area}</p>
            <br></br>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key,value]) => 
                    <li key={key}>{value}</li>
                ) }
            </ul>
            <img src={country.flags.png}/>
        </div>
    )
}

export default Country