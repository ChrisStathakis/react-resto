import React from 'react';
import 'whatwg-fetch';

import Navbar from '../Index/Navbar';
import NavbarPusher from '../Index/NavbarPusher';
import OrderProducts from './OrderProducts';


class Order extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            order: null,
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

    loadOrder(){
        const endpoint = '/api/products/';
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

    componentDidMount() {
        this.setState({
            order: null,
            products: null,
            doneLoading: false

        })
        this.loadOrder();
        this.loadProducts();
    }

    render(){
        const {products} = this.state;
        const {order} = this.state;
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
                            <OrderProducts products={products} order_id={order.id} />
                        :<p>No data</p>}
                        </div>
                        <div className='eight wide column'>
                            <h3 className='ui blue header'>Order Details</h3>
                            <table className="ui orange table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total Price</th>
                                    <th>Remain Value</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doneLoading === true && products !== null ? 
                                    products.map((product)=>{
                                        return (
                                            <tr>
                                                <td>{product.title}</td>
                                                <td>{product.tag_final_value}</td>
                                                <td><button className='ui green button'>Add</button></td>
                                            </tr>
                                        )
                                    })
                            
                                :
                                <tr>
                                    <td>No data</td>
                                </tr>
                                    
                                }
                                </tbody>
                            </table>
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