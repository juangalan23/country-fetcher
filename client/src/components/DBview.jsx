
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const flagStyle = {
    height: '20px',
    width: '30px',
    // border: '1px solid grey',
}
const tableStyle = {
    align: 'left',
    // border: '1px solid grey',
}

class DBview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            storedCountries: []
        }
        this.removeItem = this.removeItem.bind(this);
        this.getDatafromDB = this.getDatafromDB.bind(this);
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
    componentDidMount() {
        this.getDatafromDB();
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

    render() {
        return (
            <div>
                <table style={tableStyle}>
                    <tbody>
                        <tr> 
                            <th> Country </th>
                            <th> Capital </th>
                            <th> Region </th>
                            <th> Flag </th>
                        </tr>

                        {this.state.storedCountries.map((country, i) => 
                        <tr key={country._id}  > 
                            <td> {country.name} </td>
                            <td> {country.capital} </td>
                            <td> {country.subregion} </td>
                            <td> 
                            <img 
                            src={country.flag}
                            style = {flagStyle}
                            /> 
                            </td>
                            <td>  <button type='click' onClick={this.removeItem.bind(this, i)} >Remove</button> </td>
                        </tr>
                        )}         
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DBview;
