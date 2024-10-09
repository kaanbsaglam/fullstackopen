import { useEffect, useState } from "react"
import weatherService from "../service/weather"

const Country = ({country}) => {
    const capital = country.capital ? country.capital.join(",") : "N/A" /* some countries like bouvet island dont have capitals, so checking nullity first*/
    const firstCapital = country.capital[0] // just weather in for multiple capital'ed countries
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        if(capital != "N/A") {
            weatherService.getWeatherData(firstCapital).then(w => {
                setWeatherData(w)
            }).catch(err => {
                console.error("failed api fetch", err)
            })
        }
    }, [capital])


    return (
        <div>
            <h1>{country.name.common}</h1>
            <br></br>
            <p>capital {capital}</p> 
            <p>area {country.area}</p>
            <br></br>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key,value]) => 
                    <li key={key}>{value}</li>
                ) }
            </ul>
            <img src={country.flags.png}/>
            <h3>Weather in {firstCapital}</h3> 
            { weatherData ? (
            <div>
            <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
            <p>wind {weatherData.wind.speed} m/s</p>
            </div>
            ) : (
                <p>no weather data available</p>
            )
            }       

            </div>
    )
}

export default Country