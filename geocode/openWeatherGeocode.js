const request = require('request')

const geoCodeAddress = (city, API_KEY, callback) => {
    let encodeCity = encodeURIComponent(city)
        request({
        url: `https://api.openweathermap.org/geo/1.0/direct?q=${encodeCity}&limit=1&appid=${API_KEY}`,
        json: true
    }, (error, response, body) => {
        if(error || body.length === 0 || response.statusCode !== 200) {
            callback('Unable to retrieve data !'.toUpperCase().red)
        }else{
            callback(undefined, {
                address: body[0].state + ', ' + body[0].country,
                latitude: body[0].lat,
                longitude: body[0].lon
            })
            
        }
    })
}

module.exports.geoCodeAddress = geoCodeAddress