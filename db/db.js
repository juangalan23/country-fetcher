var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/country-fetcher');

var db = mongoose.connection;

db.on('error', function() {
    console.log('error in mongoose connection');
})
db.once('open', function(){
    console.log('we connected to mongangsta son')
})

var countrySchema = mongoose.Schema({
    name: String,
    capital: String,
    subregion: String,
    // flag: String,
    population: Number,
    language: String
})
var countryModel = mongoose.model('Country', countrySchema);

db.saveToDb = function (country) {
    console.log('save to db is running')
    var newCountry = new countryModel(country);
    newCountry.save( function(err, newCountry) { }) 

}
 

module.exports = db;