import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Homepage from './Index/Homepage';
import OrderCreate from './Orders/OrderCreate'
import Order from './Orders/Order';



class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/create/:id/' component={OrderCreate} />
                    <Route exact path='/order/:id/' component={Order} />
                    <Route component={Homepage} />
                </Switch>
            </BrowserRouter>
           
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

