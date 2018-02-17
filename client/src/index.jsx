
import React from 'react';
import ReactDOM from 'react-dom';
import SearchCountry from './components/searchCountry.jsx';
import Country from './components/Country.jsx';
import axios from 'axios';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchedCountry: {}
        }
        this.search = this.search.bind(this);
        // this.showCountry = this.showCountry.bind(this);
        this.saveToDb = this.saveToDb.bind(this);
    }

    saveToDb () {
        // can we pass in the state's searched country directly instead 
        // of just an arguments?
        console.log('save to db: this state searched country ', this.state.searchedCountry)
        axios.post('/datapost', this.state.searchedCountry)
    }

    search(term) {
        console.log('search running in class ', term);
        axios.post('/country', {
            country: term
        })
        .then( (res) => {
            // console.log('response ', res);
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

    // showCountry () {
    //     if(Object.keys(this.state.searchedCountry)) {

    //         <Country countryinfo={this.state.searchedCountry} />
            
    //         ReactDOM.render(<Country/>, document.getElementById('country'));
    //     }
    // }

    render() {
        // if( ) {

        // }
        return (
            <div>
                <h2> Search a country to retrieve its basic info </h2>

                <SearchCountry search={this.search} />

                
                 <Country countryinfo={this.state.searchedCountry} saveToDb={this.saveToDb} />

            </div>

        )
    }
}


ReactDOM.render(<App/>, document.getElementById('app'));