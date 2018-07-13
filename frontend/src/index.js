import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';





class App extends React.Component {

    render() {
        return (
            <div>
                <p>hello</p>
            </div>
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

