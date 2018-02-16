const express = require('express');
var path = require('path');
const countryDataRetriever = require('../countryhelpers/countryfetcher');
const bodyparser = require('body-parser')

const app = express();
app.use(express.static(__dirname + '/../client/dist'))
app.use(bodyparser.json())



app.post('/country', function(req, res) {
    console.log('req body, ', req.body);
    //TBD how to get the country name from the request body
    countryDataRetriever(req.body.country, function(data) {
        console.log(data);
    })

})





app.listen(8080, ()=> console.log('listening to port 8080'));