
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
        }
    }

    componentDidMount() {
        this.props.getDatafromDB();
    }
    
    render() {
        return (
            <div>
                <table style={tableStyle}>
                    <tbody>
                        <tr> 
                             <th>  </th>
                            <th> Country </th>
                            <th> Capital </th>
                            <th> Region </th>
                           
                        </tr>

                        {this.props.storedCountries.map((country, i) => 
                        <tr key={country._id}  > 
                            <td> 
                                <img 
                                src={country.flag}
                                style = {flagStyle}
                                /> 
                            </td>
                            <td> {country.name} </td>
                            <td> {country.capital} </td>
                            <td> {country.subregion} </td>
                           
                            <td>  
                                <button type='click' onClick={this.props.removeItem.bind(this, i)}  >Remove</button> 
                            </td>
                        </tr>
                        )}         
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DBview;
