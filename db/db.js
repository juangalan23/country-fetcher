var mongoose = require('mongoose');

    mongoose.connect('mongodb://juangalan23:juan@ds239648.mlab.com:39648/country-fetcher'
    , 
    {
        useMongoClient: true
    }
    );



var db = mongoose.connection;

db.on('error', function() {
    console.log('error in mongoose connection');
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
 
module.exports = db;