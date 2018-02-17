
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
            showDB: false,
             storedCountries: []
        }
        this.search = this.search.bind(this);
        this.saveToDb = this.saveToDb.bind(this);
        this.toggleShowDB = this.toggleShowDB.bind(this);
        this.getDatafromDB = this.getDatafromDB.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    removeItem(i) {
        axios.post('/deleteItem', {
            name: this.state.storedCountries[i].name
        }) 
        .then( (res) => {
            this.getDatafromDB();
            console.log(res)
        })
    }

    getDatafromDB () {
        axios.get('/datapost', {
        })
        .then( (res) => {
            this.setState({
                storedCountries: res.data
            })
            console.log('current state ', this.state.storedCountries)
        })
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
        this.getDatafromDB()
    }

    render() {
        const countryInState = this.state.searchedCountry.name;
        if(countryInState) {
            var countryToShow =  <Country countryinfo={this.state.searchedCountry} saveToDb={this.saveToDb} getDatafromDB={this.getDatafromDB} />
        } else {
           var  countryToShow = null;
        }

        var showDBBoolean = this.state.showDB;
        if (showDBBoolean) {
            var dbComponent = <DBview 
            removeItem={this.removeItem}
            storedCountries={this.state.storedCountries}
            getDatafromDB={this.getDatafromDB} 

            />

        } else {
            var dbComponent = null;
        }

        return (
            <div>
                <h2> Search a country to retrieve its basic info </h2>
                
                <SearchCountry search={this.search}  getDatafromDB={this.getDatafromDB} />

                <button type="click" value="Save" onClick={this.toggleShowDB} > View your Vacation wishlist </button>

                {countryToShow}

                {dbComponent}
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('app'));