const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialsPath)

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

// Setup static directory to serve - css, img, etc
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Andrew'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Andrew'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help Page!',
        name: 'Andrew'
    })
})

app.get('/weather-app',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    else{
        geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({error}) 
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })               
            })            
        })
    }
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Please provide a search string'
        })
    }
    // console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Andrew',
        error: 'Help article not found!'
    })
})

app.get('*',(req,res)=>{   // express provides wild-card character to be placed in place of URLs. Here '*' means everything thats matching
    res.render('error',{
        title: '404',
        name: 'Andrew',
        error: '404 Page not found!'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running...')
})