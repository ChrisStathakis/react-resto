import React from 'react';
import 'whatwg-fetch';

import Navbar from '../Index/Navbar';
import NavbarPusher from '../Index/NavbarPusher';

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
                products: responseData
            })
        })
    }

    loadOrder(){
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
                products: responseData
            })
        })
    }

    componentDidMount() {
        this.setState({
            order: null,
            products: [],
            doneLoading: false

        })
        this.loadOrder();
        this.loadProducts();
    }

    render(){
        const {products} = this.state;
        const {order} = this.state;

        return (
            <div>
                <Navbar />
                <div class="pusher">
                <div class="ui inverted vertical masthead center aligned segment">
                    <div class="ui container">
                        <div class="ui large secondary inverted pointing menu">
                            <a class="toc item">
                                <i class="sidebar icon"></i>
                            </a>
                                <a class="active item">Products</a>
                                <a class="item">Items</a>
                                <a class="item">Details</a>
                                <a class="item">Careers</a>
                                <div class="right item">
                                    <a class="ui inverted button">Back</a>
                                    <a class="ui inverted button">Sign Up</a>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='ui grid container'>
                    <div className='row'>
                            <div className="ui top attached tabular menu">
                                <a className="item" data-tab="first active">Products</a>
                                <a className="item" data-tab="second">Order Items</a>
                                <a className="item" data-tab="third">Details</a>
                                </div>
                                <div className="ui bottom attached tab segment active" data-tab="first">
                                <table className="ui orange table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Actions</th>
                                            <th>In Cart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>Apples</td>
                                        <td>200</td>
                                        <td>0g</td>
                                        </tr>
                                        <tr>
                                        <td>Orange</td>
                                        <td>310</td>
                                        <td>0g</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                <div className="ui bottom attached tab segment" data-tab="second">
                                Second
                                </div>
                                <div className="ui bottom attached tab segment" data-tab="third">
                                Third
                            </div>
                        </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Order;