var mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://ds239648/country-fetcher');
} else {
    mongoose.connect('mongodb://localhost/country-fetcher');
}


var db = mongoose.connection;

db.on('error', function() {
    console.log('error in mongoose connection');
})
db.once('open', function(){
    console.log('we connected to mongangsta')
})

var countrySchema = mongoose.Schema({
    name: {type:String,
        unique: true,
        dropDups: true
        },
    capital: String,
    subregion: String,
    flag: String,
    population: Number,
    language: String
})
var countryModel = mongoose.model('Country', countrySchema);

db.saveToDb = function (country) {
    var newCountry = new countryModel(country);
    newCountry.save( function(err, newCountry) { }) 
}

db.getAllData = function(callback) {

    countryModel.find( function(err, res){
        if (err) {
            console.log('error in db get request ', err)
        }
        callback(err, res);
    })
}

db.deleteItem = function (name) {
    countryModel.remove({name: name}, function(err) {
        if(err) {
            console.log('err in delete item: ', err)
        }
    })
}
 
// juangalan23:Asturias23?@ds239648.mlab.com:39648
module.exports = db;