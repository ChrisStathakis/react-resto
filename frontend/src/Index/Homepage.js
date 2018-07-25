import React from 'react';
import 'whatwg-fetch';
import Navbar from './Navbar';
import Tables from './Tables';
import NavbarPusher from './NavbarPusher';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tables: null,
            doneLoading: false
        }
    }

    loadTables() {
        const endpoint = '/api/tables/'
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response) {
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                tables: responseData,
                doneLoading: true
            })
        })
    }

    componentDidMount(){
        this.setState({
            tables: null,
            doneLoading: false
        });

        this.loadTables()
    }

    render() {
        const {tables} = this.state;
        const {doneLoading} = this.state;
        return(
            <div>
                <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarPusher />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">Reports</h1>
                        <br /> <br />
                    </div>
                </div>
                <h3 className="ui center aligned header">Data Flow</h3>
                {doneLoading === true && tables !== null ?
                    <Tables tables={tables} />
                    :<p>bb</p>
                }


        </div>
            
        )
    }

}

export default Homepage;