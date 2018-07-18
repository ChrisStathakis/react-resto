import React from 'react';
import {Link} from 'react-router-dom';


class Navbar extends React.Component{

    render(){

        return (
            <div>
                <div class="ui large top fixed hidden menu">
                    <div class="ui container">
                    <Link to={{
                        pathname:`/`
                    }}>
                    <a class="active item">Home</a></Link>
                    <a class="item">History</a>
                    <div class="right menu">
                    <Link to={{
                            pathname:`/login/`
                    }}><div class="item">
                        <a class="ui button">Log in</a>
                    </div>
                    </Link>
                   
                    <div class="item">
                        <a class="ui primary button">Sign Up</a>
                    </div>
                    </div>
                </div>
            </div>


            <div class="ui vertical inverted sidebar menu">
            <Link to={{
                pathname:`/`
            }}>
            <a class="active item">Home</a></Link>
            <a class="item">History</a>
            <a class="item">Login</a>
            <a class="item">Signup</a>
            </div>

        </div>
        )
    }
}

export default Navbar;