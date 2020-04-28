const request = require('request')



const getWeater = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7ac97e67dd285e72c827408a495b4318&query=${address}`

    request({ url , json : true}, (error, data)  => {
        if(error){
            callback('Unable to connect to Weather App!',undefined)
        } else if(data.body.error){
            callback('Unable to find Location, Please Enter the location',undefined)
        } else {
            callback(undefined,{
                location: `${data.body.location.name}, ${data.body.location.region}, ${data.body.location.country}`,
                weather_Desc: `${data.body.current.weather_descriptions[0]}, Temperature is ${data.body.current.temperature} degree`
            })
        }
    })
}
module.exports = getWeater