const express = require('express')
const path = require('path')
const hbs = require('hbs')
const config = require('../config.json')
const weather = require('./utility/weather')

const app = express();
const port = process.env.PORT || 3000

const publicpath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../template/views')
const partialpath = path.join(__dirname, '../template/partials')

app.set('views', viewpath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialpath);

app.use(express.static(publicpath))

app.get('', function(req, res) {
    res.render('index',{
        title : config.weatherpage.title,
        name :config.authername
    });
});

app.get('/weather', (req, res) => {
   
    const address = req.query.location
    if(!address){
            return res.send( {error : 'Please Enter Location...'})
    } else {
        weather(address, (error, data) => {
            if(error){
                return res.send(error)
            } else {
                return res.send(data)
            }
        })
    }
});

app.get('/about', function(req, res) {
    res.render('about',{
        title : config.aboutpage.title,
        name :config.authername
    });
});

app.get('/help', function(req, res) {
    res.render('help',{
        title : config.helppage.title,
        helptext :config.helppage.helptext,
        name :config.authername
    });
});


app.get('/help/*', (req, res) => {
    res.render('error',{
        title : 'Error',
        name: config.authername,
        errormsg :'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Web-server app running on port ${port}`)
})