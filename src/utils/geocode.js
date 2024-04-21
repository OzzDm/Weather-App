const keys = require('dotenv').config()
const httpReq = require('postman-request')

const geocoding_token = process.env.GEOCODING_TOKEN

const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geocoding_token}&limit=1`

    httpReq({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to geocoding service!',undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location on map!',undefined)
        } else{
            const data = body.features[0]
            callback(undefined, {
                    latitude: data.center[1], 
                    longitude: data.center[0],
                    location: data.place_name
                }
            )
        }
    })
}

module.exports = geocode