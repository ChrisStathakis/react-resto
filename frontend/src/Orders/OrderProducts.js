import React from 'react';
import 'whatwg-fetch';
import 'react-cookies';
import cookie from 'react-cookies';

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

    createOrderItem() {
        const data = this.state;
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