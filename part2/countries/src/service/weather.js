import axios from 'axios'

const api_key = import.meta.env.VITE_OPENWEATHER_API

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"



const getWeatherData = (capital) => {
    const request = axios.get(`${baseUrl}?q=${capital}&appid=${api_key}`)
    return request.then(response => {
        console.log(`${baseUrl}?q=${capital}&appid=${api_key}`)
        return response.data
    })
}


export default {getWeatherData}

