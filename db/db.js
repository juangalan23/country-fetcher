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
    console.log('is save to db running')
    var newCountry = new countryModel(country);
    // TBD, CAN WE PASS IN THE OBJECT INTO OUR MODEL LIKE THIS?
    // HOPEFULLY IT'S OKAY BECAUSE WE NAMED OUR PROPERTIES EXACTLY
    // THE SAME AS THEY ARE COMING IN
    newCountry.save( function(err, newCountry) { }) 

}
 

module.exports = db;