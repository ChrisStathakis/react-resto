import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Homepage from './Index/Homepage';
import OrderCreate from './Orders/OrderCreate'




class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/create/:id/' component={OrderCreate} />
                    
                    <Route component={Homepage} />
                </Switch>
            </BrowserRouter>
           
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

