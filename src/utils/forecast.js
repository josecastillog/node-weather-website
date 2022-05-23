const request = require('request')

const forecast = (latitud, longitud, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=2ff560b72b867529a05fcf9834aa318c&query=' + latitud + ',' + longitud + '&units=m'
    // console.log(url)
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body)
            const data = {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                humidity: body.current.humidity
            }
            callback(undefined, "The temperature is " + data.temperature + "°C. Feels like " + data.feelsLike + "°C. Description: " + data.description + ". The humidity is " + data.humidity + "%")
        }
    })
    
}

module.exports = forecast