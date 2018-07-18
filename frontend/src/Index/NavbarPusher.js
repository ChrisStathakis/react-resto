import React from 'react';
import {Link} from 'react-router-dom';


class NavbarPusher extends React.Component{

    render(){

        return (
            <div class="ui inverted vertical masthead center aligned segment">
                <div class="ui container">
                    <div class="ui large secondary inverted pointing menu">
                        <a class="toc item">
                                <i class="sidebar icon"></i>
                                </a>
                                <Link to={{
                                    pathname:`/`
                                }}>
                                <a class="active item">Home</a></Link>
                                <a class="item">History</a>
                                
                                <div class="right item">
                                <Link to={{
                                    pathname:`/login/`
                                }}><a class="ui inverted button">Log in</a></Link>
                                <a class="ui inverted button">Sign Up</a>
                                </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavbarPusher;