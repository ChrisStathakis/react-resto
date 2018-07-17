import React from 'react';
import 'whatwg-fetch';
import 'react-cookies';
import cookie from 'react-cookies';

class Product extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            product_related: null,
            order_related: null,
            value: 0,
            paid_value: 0,
            is_paid: false,
            qty: 1,
            
        }
    }

    createOrderItem(qty) {
        const data = this.state;
        data.qty = qty
        const endpoint = '/api/orders-items/';
        const thisComp = this;
        const csrfToken = cookie.load('csrftoken');
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            
        }).catch(function(error){
            console.log('error', error)
        })
    }

    updateOrderItem(id, qty) {
        let data = this.state;
        data.qty = qty;
        const endpoint = `/api/orders-items/detail/${id}/`
        const csrfToken = cookie.load('csrftoken') 
        const thisComp = this;
        let lookupOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken

            },
            credentials: 'include',
            body: JSON.stringify(data)
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            
        }).catch(function(error){
            console.log('error', error)
        })
    }
    


    checkIfExists(product_id, order_id, qty) {
        const endpoint = `/api/orders-items/?order_related=${order_id}&product_related=${product_id}`
        const thisComp = this;
        let lookupOptions = {
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
            let exists_product = responseData
            if (exists_product.length > 0) {
                thisComp.updateOrderItem(responseData[0].id, responseData[0].qty+ parseInt(qty))
            } else {
                thisComp.createOrderItem(qty)
            }
            thisComp.props.updateOrderPage()
            
            
        }).catch(function(error){
            console.log('error', error)
        })
    }

    handleClick(event){
        event.preventDefault()
        const qty = event.target.value;
        this.checkIfExists(this.state.product_related, this.props.order_id, qty)
    }


    componentDidMount(){
        const {product} = this.props;
        const {order_id} = this.props;
        this.setState({
            product_related: product.id,
            order_related: order_id,
            value: product.value,
        })
    }

    render() {
        const {product} = this.props;
        return(
            <tr>
                <td>{product.title}</td>
                <td>{product.tag_value}</td>
                <td><button name={product.id} value='1' onClick={this.handleClick} className='ui green button'>1</button>
                <button name={product.id} value='2'  onClick={this.handleClick} className='ui green button'>2</button>
                <button name={product.id} value='3'  onClick={this.handleClick} className='ui green button'>3</button>
                <button name={product.id} value='4'  onClick={this.handleClick} className='ui green button'>4</button>
                </td>
            </tr>
        )
    }


}

export default Product;