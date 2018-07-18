import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import cookie from 'react-cookies';
import {connect} from "react-redux";

class Login extends React.Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }


    loginUser(){
        let data = this.state;
        const endpoint = '/auth/login/';
        const csrfToken = cookie.load('csrftoken');
        const thisComp = this;
        const lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data)
        }
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            if (responseData !== null){
            thisComp.props.history.push('/')
            }
        })
    }

    onSubmit = e =>{
        e.preventDefault()
        console.log('bah!!!')
    }

    handleChange(event){
        event.preventDefault()
        let key = event.target.name
        let value = event.target.value
        this.setState({
            [key]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.loginUser()
    }

    render() {
        const {username} = this.state;
        const {password} = this.state;
        return(
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                    <div className="content">
                        Log-in to your account
                    </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input type="text" onChange={this.handleChange} name="username" value={username} placeholder="Username" />
                            </div>
                            </div>
                            <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon" />
                                <input onChange={this.handleChange} type="password" name="password" value={password} placeholder="Password" />
                            </div>
                            </div>
                            <div onClick={this.handleSubmit} className="ui fluid large teal submit button">Login</div>
                        </div>

                <div className="ui error message"></div>

                </form>

                <div className="ui message">
                New to us? <a href="#">Sign Up</a>
                </div>
            </div>
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {};
  }
  
  const mapDispatchToProps = dispatch => {
    return {};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);