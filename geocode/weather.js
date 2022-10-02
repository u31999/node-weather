const request = require('request')

const getWeather = (lat, lon, API_KEY, callback) => {

    request({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
        json: true
    }, (error, response, body) => {
        if(error || body.length === 0 || response.statusCode !== 200) {
            callback('Unable to retrieve data !'.toUpperCase().red)
        }else{
            callback(undefined, {
                temperature: body.main.temp,
                apparentTemperature: body.main.feels_like,
                
            })
            
        }
    })
}

module.exports.getWeather = getWeather