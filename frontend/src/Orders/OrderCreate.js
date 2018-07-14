import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import OrderForm from './OrderForm';
import Navbar from '../Index/Navbar';
import NavbarPusher from '../Index/NavbarPusher';


class OrderCreate extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            table_related: null,
            active: true,
            is_paid: false,
            table_related: null, 
            doneLoading: false
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        console.log(id)
        this.setState({
            title: '',
            table_related: null,
            active: true,
            is_paid: false,
            table_related: id,
            doneLoading: true
        })
    }

    render() {
        const {state} = this;
        const {doneLoading} = this.state;
        console.log(state.table_related, 'status')
        return(
            <div>
                <Navbar />
                <div class="pusher">
                    <NavbarPusher />
                    {doneLoading === true && state.table_related !== null ? 
                        <OrderForm id={state.table_related} />
                        :<p>oups</p>
                        }
                    
                </div>
            </div>
        )
    }
}

export default OrderCreate;