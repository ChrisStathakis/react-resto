import React from 'react';
import 'whatwg-fetch';
import 'react-cookies';
import cookie from 'react-cookies';

class Item extends React.Component {
    
    constructor(props){
        super(props)
        this.handleMinus = this.handleMinus.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.state = {
            qty:0,
            product_related: null,
            order_related: null,
            value: 0,
            paid_value: 0,
            is_paid: 0,
            id: 0
        }

    }

    updateItem(type_){
        const {id} = this.state;
        const endpoint = `/api/orders-items/detail/${id}/`;
        let data = this.state;
        if(type_ === 'plus'){
            data.qty = data.qty+1
        } else {
            data.qty = data.qty-1
        }
        
        const thisComp = this;
        const csrfToken = cookie.load('csrftoken');
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
            console.log(error)
        })

    }

    componentDidMount(){
        const {item} = this.props;
        this.setState({
            qty: item.qty,
            product_related: item.product_related,
            order_related: item.order_related,
            value: item.value,
            paid_value: item.paid_value,
            is_paid: item.is_paid,
            id: item.id
        })
    }

    handleMinus(event){
        event.preventDefault();
        let qty_ = this.state.qty -1
        this.setState({
            qty: qty_
        })
        let type_ = 'minus'
        this.updateItem(type_)
    }

    handlePlus(event) {
        event.preventDefault()
        let qty_ = this.state.qty + 1
        console.log(this.state, qty_)
        this.setState({
            qty: qty_
        })
        console.log(this.state)
        let type_ = 'plus'
        this.updateItem(type_)
    }

    render(){
        const {item} = this.props;
        const {qty} = this.state;
        return (
            <tr>
                <td>{item.tag_product_related}</td>
                <td>{item.tag_value}</td>
                <td>{item.tag_total_value}</td>
                <td className='warning'>{item.tag_remain}</td>
                <td>{qty}</td>
                <td>
                    <button onClick={this.handleMinus} class="ui red icon button">
                    <i class="minus icon"></i>
                    </button>
                    <button onClick={this.handlePlus} class="ui green icon button">
                        <i class="plus icon"></i>
                    </button>
                </td>
            </tr>
        )
    }
}


class OrderItems extends React.Component {

    constructor(props) {
        super(props);
        this.updateOrderItems = this.updateOrderItems.bind(this)
        this.state = {
            
        }
    }

    updateOrderItems() {
        this.props.updateOrderItems()
    }

    render() {
        const {order_items} = this.props;
        return (
            <table className="ui orange table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Total Price</th>
                        <th>Remain</th>
                        <th>Qty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {order_items !== undefined ? 
                    order_items.map((item)=>{
                        return (
                            <Item item={item} updateOrderItems={this.updateOrderItems} />
                        )
                    })        
                    :
                    <tr>
                        <td>No data</td>
                    </tr>
                                    
                }
                </tbody>
            </table>
        )
    }

}

export default OrderItems;