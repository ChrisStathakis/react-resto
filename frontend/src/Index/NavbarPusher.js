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
            <div className="ui large secondary inverted pointing menu">
                <a className="toc item">
                    <i className="sidebar icon"></i>
                </a>
                <Link to={{
                    pathname:`/`
                }}><a className="item">Home</a></Link>
                <a className="item">History</a>

                {user.username !== undefined && user.username.length > 1 ?
                    <div className="right menu">
                        <a class="ui button">{this.state.user.username}</a>
                        <a href='logout'class="ui primary button">Logout</a>           
                    </div>
                :
                    <div className="right menu">
                        <a href='login/' class="ui button">Log in</a>
                        <a claclassName="ui primary button">Sign Up</a>
                    </div>
            
                }
            </div>
        )
    }
}

export default NavbarPusher;