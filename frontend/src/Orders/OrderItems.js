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
            thisComp.props.updateOrderPage()
        }).catch(function(error){
            console.log(error)
        })

        if (data.qty === 0) {
            let lookupOptionsDEL = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
            }

            fetch(endpoint, lookupOptionsDEL)
            .then(function(response){
                return response.json()
            }).then(function(responseData){
                thisComp.props.updateOrderPage()
            }).catch(function(error){
                console.log(error)
            })
        }
        
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

        return (
            <tr>
                <td>
                    {item.is_paid === true ? 
                        <button className="ui blue icon button">
                        <i className="tiny payment icon"></i></button>
                        
                    : <button className="ui red icon button">
                    <i className="tiny payment icon"></i></button>
                    }
                   
                    
                    {item.tag_product_related}
                </td>
                <td>{item.tag_value}</td>
                <td>{item.tag_total_value}</td>
                <td className='warning'>{item.tag_remain}</td>
                <td>{item.qty}</td>
                <td>   
                    <div class="ui buttons">
                        <button onClick={this.handleMinus} className="ui red icon button">
                        <i className="minus icon"></i>
                        </button>
                        <div className="or"></div>
                        <button onClick={this.handlePlus} className="ui green icon button">
                            <i className="plus icon"></i>
                        </button>
                    </div>

                    
                </td>
            </tr>
        )
    }
}


export default Item;