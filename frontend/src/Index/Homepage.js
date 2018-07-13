import React from 'react';
import 'whatwg-fetch';
import Navbar from './Navbar';
import Tables from './Tables';

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
                <div class="pusher">
                    <div class="ui inverted vertical masthead center aligned segment">
                        <div class="ui container">
                            <div class="ui large secondary inverted pointing menu">
                                <a class="toc item">
                                <i class="sidebar icon"></i>
                                </a>
                                <a class="active item">Home</a>
                                <a class="item">Work</a>
                                <a class="item">Company</a>
                                <a class="item">Careers</a>
                                <div class="right item">
                                <a class="ui inverted button">Log in</a>
                                <a class="ui inverted button">Sign Up</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {doneLoading === true && tables !== null ?
                        <Tables tables={tables} />
                        :<p>bb</p>
                    }


                </div>
            </div>
        )
    }

}

export default Homepage;