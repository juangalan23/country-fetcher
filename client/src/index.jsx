
import React from 'react';
import ReactDOM from 'react-dom';
import SearchCountry from './components/searchCountry.jsx';
import axios from 'axios';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchedCountry: null
        }
        this.search = this.search.bind(this);
    }

    search(term) {
        console.log('search running in class ', term);
        axios.post('/country', {
            country: term
        })
        .then( function(res) {
            console.log(res);
        }) 

    }

    render() {
        return (
            <div>
                <h1> Search a country to retrieve its basic info </h1>

                <SearchCountry search={this.search} />

            </div>

        )
    }
}


ReactDOM.render(<App/>, document.getElementById('app'));