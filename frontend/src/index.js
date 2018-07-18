import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import 'whatwg-fetch';


import Homepage from './Index/Homepage';
import OrderCreate from './Orders/OrderCreate'
import Order from './Orders/Order';
import Login from './Login/Login';


class App extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            user: null,
            doneLoading: false
        }
    }



    render() {
        const {user} = this.state;
        const {doneLoading} = this.state;
        return (
            <div>
            
            <BrowserRouter>
                <Switch>
                    <Route exact path='/create/:id/' component={OrderCreate} />
                    <Route exact path='/order/:id/' component={Order} />
                    <Route exact path='/login/' component={Login} />
                    <Route component={Homepage} />
                </Switch>
            </BrowserRouter>
           
            
           </div>
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

