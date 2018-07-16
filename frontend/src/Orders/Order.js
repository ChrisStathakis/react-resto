import React from 'react';
import 'whatwg-fetch';

import Navbar from '../Index/Navbar';
import NavbarPusher from '../Index/NavbarPusher';
import OrderProducts from './OrderProducts';
import OrderItems from './OrderItems';

class Order extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            order: null,
            order_items: null,
            doneLoading: false
        }
    }

    loadProducts(){
        const endpoint = '/api/products/';
        const thisComp = this;
        const lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){

            thisComp.setState({
                products: responseData,
                doneLoading: true
            })
        })
    }

    loadOrder(id){
        const endpoint = `/api/order/detail/${id}/`;
        const thisComp = this;
        const lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                order: responseData
            })
        })
    }

    loadOrderItems(id){
        const endpoint = `/api/orders-items/?order_related=${id}`;
        const thisComp = this;
        const lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){

            thisComp.setState({
                order_items: responseData,
            })
        })
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            order: null,
            products: null,
            order_items: null,
            doneLoading: false

        })
        this.loadOrder(id);
        this.loadOrderItems(id)
        this.loadProducts();
    }

    render(){
        const {products} = this.state;
        const {order} = this.state;
        const {id} = this.props.match.params;
        const {order_items} = this.state;
        const {doneLoading} = this.state;
        return (
            <div>
                <Navbar />
                <div class="pusher">
                    <NavbarPusher />
                <div className='ui grid container'>
                    <div className='eight wide centered column'>
                        <h3 className='ui blue header'>Products</h3>
                        {doneLoading === true && products !== null ? 
                            <OrderProducts products={products} order_id={id} />
                        :<p>No data</p>}
                        </div>
                        <div className='eight wide column'>
                            <h3 className='ui blue header'>Order Details</h3>
                            {doneLoading === true && order_items !== null ?
                            <OrderItems order_items={order_items} />   
                        :
                        <p>Null?</p>
                        }
                        </div>
                        <div className='eight wide column'>
                            <p>gr</p>
                        </div>
                   
                </div>
            </div>
            </div>
        )
    }
}

export default Order;