import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom'
import Navbar from '../Index/Navbar';
import NavbarPusher from '../Index/NavbarPusher';
import Product from './OrderProducts';
import Item from './OrderItems';
import cookie from '../../../node_modules/react-cookies';


class Order extends React.Component {
    
    constructor(props) {
        super(props);
        this.updateOrderPage = this.updateOrderPage.bind(this);
        this.submitPaidButton = this.submitPaidButton.bind(this);
        this.submitCloseTable = this.submitCloseTable.bind(this);
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

    submitPaidButton(event){
        console.log('works!')
        event.preventDefault();
        this.submitPaidOrder()
    }

    submitPaidOrder(){
        let data = {
            is_paid: true
        }
        const {id} = this.props.match.params;
        const endpoint = `/api/order/detail/${id}/`;
        const csrfToken = cookie.load('csrftoken');
        const thisComp = this;
        const lookupOptions = {
            method: 'PUT',
            headers:{
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
            thisComp.updateOrderPage()
        }).catch(function(error){
            console.log(error)
        })
    }

    renderRedirect = () => {
      return <Redirect to='/target' />    
    }

    submitCloseTable(event){
        event.preventDefault()
        let data = {}
        const thisComp = this;
        const id = this.state.order.table_related;
        const endpoint = `/api/table/detail/${id}/`
        const csrfToken = cookie.load('csrftoken'); 
        const lookupOptionsGET = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            
        }

        fetch(endpoint, lookupOptionsGET)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            console.log(responseData)
            data = responseData
            data.is_using = false
            const lookupOptionsPUT = {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify(data)
            }


            fetch(endpoint, lookupOptionsPUT)
            .then(function(response){
                return response.json()
            }).then(function(responseData){
                thisComp.renderRedirect()
            }).catch(function(error){
                console.log(error)
            })

            }).catch(function(error){
                console.log(error)
            })
    }

    updateOrderPage(){
        const {id} = this.props.match.params;
        this.loadOrder(id);
        this.loadOrderItems(id);
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
                    <br /> <br />
                    <div className='ui grid container'>
                        <div className='eight wide centered column'>
                            <div className='ui raised segment'>
                                <h3 className='ui blue header'>Order Details</h3>
                                {doneLoading === true && order !== null ?
                                <div className="ui small statistics">
                                    <div className="blue statistic">
                                        <div className="value">
                                        {order.tag_table_related}
                                        </div>
                                        <div className="label">
                                        Table
                                        </div>
                                    </div>
                                    <div className="red statistic">
                                        <div className="value">
                                            {order.tag_value}
                                        </div>
                                        <div class="label">
                                        Value
                                        </div>
                                    </div>
                                    <div class=" green statistic">
                                        <div className="value">
                                            {order.tag_paid_value}
                                        </div>
                                        <div className="label">
                                        Paid Value
                                        </div>
                                    </div>
                                </div>
                                :<p>Order</p>
                                }
                            </div>
                            <div className='ui raised segment'>
                                <h3 className='ui blue header'>Products</h3>
                                    {doneLoading === true && products !== null ? 
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
                                                        <Product product={product} order_id={id} updateOrderPage={this.updateOrderPage} />
                                                        )
                                                    })
                                                :
                                                <tr>
                                                    <td>No hgdata</td>
                                                </tr>          
                                            }
                                        </tbody>
                                    </table>
                                    :<p>No data</p>
                                    }
                            </div>
                        </div>
                        
                        <div className='eight wide column'>
                            {doneLoading === true && order !== null ? 
                            <div className="ui raised segment">
                                <h3 className='ui blue header'>Actions</h3>
                                { order.is_paid === true ?
                                    <button className="ui labeled button" tabindex="0">
                                        <div onClick={this.submitPaidButton} className="ui blue button">
                                            <i className="payment icon"></i> Pay
                                        </div>
                                        <a className="ui basic label">
                                            Is Paid
                                        </a>
                                    </button>
                                    
                                    :
                                    <button className="ui labeled button" tabindex="0">
                                        <div onClick={this.submitPaidButton} className="ui red button">
                                            <i className="payment icon"></i> Pay
                                        </div>
                                            {order.tag_remain_value}
                                        <a className="ui basic label">
                                        </a>
                                    </button>
                                    }
                                
                                
                            </div>
                            :<p>h</p>
                            }
                            <br /> <br />
                            <div className="ui raised segment">
                                <h3 className='ui blue header'>Order Items</h3>
                                {doneLoading === true && order_items !== null ?
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
                                                    <Item item={item} updateOrderPage={this.updateOrderPage} />
                                                )
                                            })        
                                            :
                                            <tr>
                                                <td>No data</td>
                                            </tr>
                                                            
                                        }
                                        </tbody>
                                    </table>   
                                    :
                                    <p>Null?</p>
                                }
                            </div>
                        
                        <br /> 
                        <div className='ui raised segment'>
                            <div className="ui buttons">
                                <button className="ui button">Cancel</button>
                                <div className="or"></div>
                                <button onClick={this.submitCloseTable} className="ui positive button">Close Table</button>
                            </div>
                            </div>
                            <div className='eight wide column'>
                                <p>gr</p>
                            </div>
                        </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Order;