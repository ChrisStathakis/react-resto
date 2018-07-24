import React from 'react';
import {Link} from 'react-router-dom';
import getData from './help';

class Navbar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user: '',
            doneLoading: false
        }
    }

    componentDidMount(){
        this.loadUser();
        
    }

    loadUser(){
        const endpoint = '/api/user/';
        const thisComp = this;
        getData(endpoint, thisComp, 'user')

        this.setState({
            doneLoading: true
        })
    }

    render(){
        const {user} = this.state;

        return (
            <div>
                <div class="ui large top fixed hidden menu">
                    <div class="ui container">
                    <Link to={{
                        pathname:`/`
                    }}>
                    <a class="item">Home</a></Link>
                    <a class="item">History</a>
                    <div class="right menu">
                    {user.username !== undefined && user.username.length >1 ?
                        <div>
                        <div class="item"><a class="ui button">{this.state.user.username}</a></div>
                        
                        <div class="item">
                            <a href='/logout/' class="ui primary button">Logout</a>
                        </div>
                       
                    </div>
                    :
                    <div>
                        <div class="item">
                        <a href='/login/' class="ui button">Log in</a>
                    </div>
                    <div class="item">
                        <a class="ui primary button">Sign Up</a>
                    </div>
                    </div>
                    }
                    </div>
                </div>
            </div>


            <div class="ui vertical inverted sidebar menu">
            <Link to={{
                pathname:`/`
            }}>
            <a class="item">Home</a></Link>
            <a class="item">History</a>
            <a class="item">Login</a>
            <a class="item">Signup</a>
            </div>

        </div>
        )
    }
}

export default Navbar;