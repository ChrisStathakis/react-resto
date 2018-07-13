import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Homepage from './Index/Homepage';





class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route component={Homepage} />
                </Switch>
            </BrowserRouter>
           
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

