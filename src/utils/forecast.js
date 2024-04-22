const keys = require('dotenv').config()
const httpReq = require('postman-request')

const weatherstack_key = process.env.WEATHER_STACK_KEY
// console.log(weatherstack_key)

const forecast = (latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=${weatherstack_key}&query=${latitude},${longitude}`
    // console.log(url)
    httpReq({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } 
        else if(body.error){
            callback('Unable to find the location!',undefined)
        }
        else {
            const data = body.current
            callback(undefined,`${data.weather_descriptions[0]}. The current temperature is ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out`)
        }    
    })
}

module.exports = forecast