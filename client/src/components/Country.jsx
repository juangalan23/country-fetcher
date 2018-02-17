
import React from 'react';
import ReactDOM from 'react-dom';

const flagStyle = {
    height: '200px',
    width: '300px',
    border: '1px solid grey',
}

function Country (props) {

    


    return (
        <div> 

            <table> 
                <tbody>
            
                    <tr>
                    <td> Country: {props.countryinfo.name} </td>
                    </tr>

                    <tr>
                    <td> Region: {props.countryinfo.subregion} </td>
                    </tr>

                    <tr>   
                    <td> Capital: {props.countryinfo.capital} </td>
                    </tr>

                    <tr>
                    <td> Main Language: {props.countryinfo.language} </td>
                    </tr>

                    <tr>
                    <td> Population: {props.countryinfo.population} </td>
                    </tr>
                    
                    <tr>
                    <td> <img 
                    src={props.countryinfo.flag}
                    style = {flagStyle}
                    /> </td>
                    </tr>

                </tbody>
            </table>

            <button type="submit" value="Save to vaca list" onSubmit={props.saveToDb}> Save to vaca list! </button>

        </div>
    )
}


export default Country;