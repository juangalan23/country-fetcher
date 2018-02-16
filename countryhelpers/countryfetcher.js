const axios = require('axios');


var countryDataRetriever = function(countryName, callback) {
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

module.exports = countryDataRetriever;