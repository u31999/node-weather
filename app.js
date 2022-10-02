require('dotenv').config()

// Add your API key here
const API_KEY = process.env.API_KEY

const geocode = require('./geocode/openWeatherGeocode')
const weather = require('./geocode/weather')

const colors = require('colors')
const yargs = require('yargs')

const argv = yargs.options({
    city: {
        demand: true,
        describe: 'Address to fetch weather for',
        alias: 'c',
        string: true
    }
}).help().alias('help', 'h').argv


geocode.geoCodeAddress(argv.city, API_KEY, (errorMessage, result) => {
    if(errorMessage) console.log(errorMessage)
    else {
        console.log('The address you entered : '.cyan, `${result.address}`.blue.bold)
        console.log('It\'s Latitude is : '.cyan, `${result.latitude}`.green.bold)
        console.log('It\'s Longitude is : '.cyan, `${result.longitude}`.green.bold)
        console.log('------'.yellow)
        weather.getWeather(result.latitude, result.longitude, API_KEY, (errorMessage, weatherResult) => {
            if(errorMessage) console.log(errorMessage)
            else console.log(`The temperature is now `.green,`${weatherResult.temperature}`.underline.red,
             `, it's feels like `.green, `${weatherResult.apparentTemperature}`.underline.red)
             console.log('------'.yellow)
        })
    }
})

