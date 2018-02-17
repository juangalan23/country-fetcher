const axios = require('axios');

var countryMethods = {};
countryMethods.countryDataRetriever = function(countryName, callback) {
    axios( {
        method: 'get',
        url: `https://restcountries.eu/rest/v2/name/${countryName}`,
    })
    .then(function(res) {
       callback(res.data);
    })
    .catch(function(err) {
        if(err) {
            console.log(err);
        }
    })
} 

countryMethods.dataCleaner = function(data) {
    var country = data[0];
    var cleanedCountry = {
        name: country.name,
        capital: country.capital,
        subregion: country.subregion,
        flag: country.flag,
        population: country.population,
        language: country.languages[0].name
    }
    return cleanedCountry;
}

countryMethods.countryArray = function(data) {
    var obj= this.dataCleaner(data);
    var dataArray = [];
    for (var key in obj) {
        dataArray.push(obj[key]);
    }
    return dataArray;
}   

module.exports = countryMethods;