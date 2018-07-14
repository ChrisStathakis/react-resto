import React from 'react';

class NavbarPusher extends React.Component{

    render(){

        return (
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
        )
    }
}

export default NavbarPusher;