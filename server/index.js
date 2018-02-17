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
    // console.log('db post request body ', req.body)
    db.saveToDb(req.body);
    res.sendStatus(201);
})

app.get('/datapost', function(req, res) {
    // console.log('db get request body ', req.body)
    db.getAllData(function(err, data) {
        if(err) {
            console.log('error in getting all data from db ', err)
            res.status(404)
        }
    //    console.log('results from get to db ', data)
       res.status(201)
       res.send(data)
    })
})

app.post('/deleteItem', function(req, res) {
    console.log('db delete request ', req.body)
    db.deleteItem(req.body.name);
    res.sendStatus(201);
})





app.listen(8080, ()=> console.log('listening to port 8080'));