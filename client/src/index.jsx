
import React from 'react';
import ReactDOM from 'react-dom';
import SearchCountry from './components/searchCountry.jsx';
import Country from './components/Country.jsx';
import axios from 'axios';
import DBview from './components/DBview.jsx'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchedCountry: {},
            showDB: false
        }
        this.search = this.search.bind(this);
        this.saveToDb = this.saveToDb.bind(this);
        this.toggleShowDB = this.toggleShowDB.bind(this);
    }

    saveToDb () {
        console.log('save to db: this state searched country ', this.state.searchedCountry)
        axios.post('/datapost', this.state.searchedCountry)
    }

    search(term) {
        axios.post('/country', {
            country: term
        })
        .then( (res) => {
            this.setState({
                searchedCountry: res.data
            })
            this.saveToDb();
            
        })
        .catch((err) => {
            if (err) {
                console.log('error ', err)
            }
        }) 
    }

    toggleShowDB ( ) {
        this.setState({
            showDB: true
        })
    }

    render() {
        const countryInState = this.state.searchedCountry.name;
        if(countryInState) {
            var countryToShow =  <Country countryinfo={this.state.searchedCountry} saveToDb={this.saveToDb} />
        } else {
           var  countryToShow = null;
        }

        var showDBBoolean = this.state.showDB;
        if (showDBBoolean) {
            var dbComponent = <DBview />
        } else {
            var dbComponent = null;
        }

        return (
            <div>
                <h2> Search a country to retrieve its basic info </h2>
                
                <SearchCountry search={this.search} />

                <button type="click" value="Save" onClick={this.toggleShowDB} > View your Vacation wishlist </button>

                {countryToShow}

                {dbComponent}
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('app'));