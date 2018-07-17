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
            product_exists: false
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
            console.log(responseData)
        }).catch(function(error){
            console.log('error', error)
        })
    }

    updateOrderItem(id, qty) {
        let data = this.state;
        data.qty = date.qty + qty
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
            console.log('product exists',responseData)
            console.log('response id', responseData.id)
            let exists_product = responseData
            if (exists_product.length > 0) {
                thisComp.updateOrderItem(responseData.id, qty)
            } else {
                thisComp.createOrderItem(qty)
            }
            
        }).catch(function(error){
            console.log('error', error)
        })
    }

    handleClick(event){
        event.preventDefault()
        let qty = event.target.value
        console.log(qty)
        this.checkIfExists(this.state.product_related, this.props.order_id, qty)
    }


    componentDidMount(){
        const {product} = this.props;
        const {order_id} = this.props;
        this.setState({
            product_related: product.id,
            order_related: order_id,
            value: product.value
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

class OrderProducts extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            qty:1,
            product_related: null,
            order_related: null,
            value: 0,
            is_paid:false
        }
    }

    
    handleClick(event){
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        console.log(key, value)
        this.setState({
            qty: value,
            product_related: key
        })
        console.log('after click',this.state)
        
    }

    componentDidMount(){
        const {order_id} = this.props;
        this.setState({
            qty:1,
            product_related: null,
            order_related: order_id,
            value: 0,
            is_paid:false
        })
    }
    render() {
        const {products} = this.props;
        const {order_id} = this.props;
        return (
            <table className="ui orange table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                            </thead>
                            <tbody>
                                {products !== undefined ? 
                                    products.map((product)=>{
                                        return (
                                            <Product product={product} order_id={order_id} />
                                        )
                                    })
                            
                                :
                                <tr>
                                    <td>No hgdata</td>
                                </tr>
                                    
                                }
                                </tbody>
                            </table>
        )
    }


}

export default OrderProducts;