import React from 'react';
import {Link} from 'react-router-dom';
import getData from './help'

class NavbarPusher extends React.Component{

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
            <div class="ui inverted vertical masthead center aligned segment">
                <div class="ui container">
                    <div class="ui large secondary inverted pointing menu">
                        <a class="toc item">
                                <i class="sidebar icon"></i>
                                </a>
                                <Link to={{
                                    pathname:`/`
                                }}>
                                <a class="item">Home</a></Link>
                                <a class="item">History</a>
                                {user.username !== undefined && user.username.length >1 ?
                                <div class="right menu">
                                
                                  
                                    <div class="item"><a class="ui button">{this.state.user.username}</a></div>
                                    
                                    <div class="item">
                                        <a href='logout'class="ui primary button">Logout</a>
                                    </div>
                                
                                    </div>
                                :
                                <div class="right menu">
                                    <div class="item">
                                    <a href='login/' class="ui button">Log in</a>
                                </div>
                              
                            
                                <div class="item">
                                    <a class="ui primary button">Sign Up</a>
                                </div>
                                </div>
                                
                                }
                                
                                </div>
                            </div>
                        </div>
        )
    }
}

export default NavbarPusher;