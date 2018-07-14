import React from 'react';
import 'whatwg-fetch';


class Order extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            order: null,
            table: null,
            order_items: null,
            doneLoading: null
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
}

