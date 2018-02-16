
import React from 'react';
import ReactDOM from 'react-dom';

class SearchCountry extends React.Component{
    constructor({search}){
        super();
        this.state = {
            searchText: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            searchText: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.search(this.state.searchText);
        this.setState({
            searchText: ''
        })
    }

    render() {
        return (
            <div>

               <form onSubmit={this.handleSubmit}>

                   <label>
                       Search country:  
                       <span> </span>
                       <input type="text" value={this.state.value} onChange={this.handleChange} /> 
                    </label>
                    <input type="submit" value="Search" />

                </form>

            </div>
        )
    }

}

export default SearchCountry;