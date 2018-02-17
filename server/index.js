const express = require('express');
var path = require('path');
const countryMethods = require('../countryhelpers/countryfetcher');
const bodyparser = require('body-parser')
var db = require('../db/db')

const app = express();


app.use(express.static(__dirname + '/../client/dist'))
app.use(bodyparser.json())



app.post('/country', function(req, res) {
    countryMethods.countryDataRetriever(req.body.country, function(data) {
        // var cleanedData = countryMethods.countryArray(data); //array
        var cleanedData = countryMethods.dataCleaner(data); //object
        res.send(cleanedData);
    })
})

app.post('/datapost', function(req, res) {
    console.log('db post request body ', req.body)
    db.saveToDb(req.body);
})





app.listen(8080, ()=> console.log('listening to port 8080'));