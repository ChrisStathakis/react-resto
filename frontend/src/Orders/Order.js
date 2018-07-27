import React from 'react';
import 'whatwg-fetch';
import { withRouter } from 'react-router-dom';
import getData from '../index/help';
import Navbar from '../Index/Navbar';
import NavbarPusher from '../Index/NavbarPusher';
import cookie from '../../../node_modules/react-cookies';
import OrderLeftColumn from './OrderLeftColumn';
import OrderRightColumn from './OrderRightColumn';



class Order extends React.Component {
    
    constructor(props) {
        super(props);
        this.submitPaidButton = this.submitPaidButton.bind(this);
        this.submitCloseTable = this.submitCloseTable.bind(this);
        this.state = {
            products: null,
            order: null,
            order_items: [],
            doneLoading: false
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.loadOrder(id);
        this.loadOrderItems(id);
        this.loadProducts();

        this.setState({
            doneLoading: true
        })
    }

    loadProducts(){
        const endpoint = '/api/products/';
        const thisComp = this;
        getData(endpoint, thisComp, 'products')
    }
    
    loadOrder(id){
        const endpoint = `/api/order/detail/${id}/`;
        const thisComp = this;
        getData(endpoint, thisComp, 'order')
    }

    loadOrderItems(id){
        const endpoint = `/api/orders-items/?order_related=${id}`;
        const thisComp = this;
        getData(endpoint, thisComp, 'order_items')
    }

    handleAddProduct = (id, qty)=> {
        this.checkIfExists(id, this.state.order.id, qty)
    };

    checkIfExists(product_id, order_id, qty) {
        const endpoint = `/api/orders-items/?order_related=${order_id}&product_related=${product_id}`;
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            let exists_product = responseData;
            if (exists_product.length > 0) {
                thisComp.updateOrderItem(exists_product[0], responseData[0].qty+ parseInt(qty))
            } else {
                thisComp.createOrderItem(product_id, order_id, qty)
            }
            
        }).catch(function(error){
            console.log('error', error)
        })
    }


    createOrderItem(product_id, order_id, qty) {
        const data = {
            product_related: product_id,
            order_related: order_id,
            qty: qty,
            is_paid:false
        };
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
        };

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            let new_data = thisComp.state.order_items.concat(responseData);
            thisComp.setState({
                order_items: new_data
            });
            thisComp.loadOrder(order_id)
        }).catch(function(error){
            console.log('error', error)
        })
    }

    updateOrderItem(order_item, qty) {
        let data = order_item;
        data.qty = qty;
        const endpoint = `/api/orders-items/detail/${order_item.id}/`;
        const csrfToken = cookie.load('csrftoken') ;
        const thisComp = this;
        let lookupOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(data)
        };

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.loadOrder(order_item.order_related);
            thisComp.loadOrderItems(order_item.order_related)
        }).catch(function(error){
            console.log('error', error)
        })
    }

    updateOrderItemStatus = (order_item_id, qty) =>{
        const endpoint = `/api/orders-items/detail/${order_item_id}/`;
        let thisComp = this;
        let data = {};
        let lookupOptionsGET = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        };

        fetch(endpoint, lookupOptionsGET)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                data = responseData;
                data.qty = qty;
                const csrfToken = cookie.load('csrftoken');
                if (qty === 0) {
                    let lookupOptionsDEL = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrfToken
                        },
                        credentials: 'include',
                    };

                    fetch(endpoint, lookupOptionsDEL)
                    .then(function(response){
                        thisComp.loadOrderItems(thisComp.props.match.params.id);
                        thisComp.loadOrder(thisComp.props.match.params.id);
                        return response.json()
                    })
                } else {
                    let lookupOptions = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrfToken
                        },
                        credentials: 'include',
                        body: JSON.stringify(data)
                    };

                    fetch(endpoint, lookupOptions)
                        .then(function(response){
                            return response.json()
                        }).then(function(responseData){
                            thisComp.loadOrderItems(thisComp.props.match.params.id);
                            thisComp.loadOrder(thisComp.props.match.params.id)
                        }).catch(function(error){
                            console.log(error)
                        });
                    }
            });
    };

    submitPaidButton = () =>{
        this.submitPaidOrder()
    };

    submitPaidOrder(){
        let data = this.state.order;
        if (data.is_paid === false) {
            data.is_paid = true
        } else {
            data.is_paid= false
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
        };

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                order: responseData,
            });
            thisComp.loadOrderItems(responseData.id)
        }).catch(function(error){
            console.log(error)
        })
    }


    submitCloseTable(){
        let data = {};
        const thisComp = this;
        const id = this.state.order.table_related;
        const endpoint = `/api/table/detail/${id}/`;
        const csrfToken = cookie.load('csrftoken'); 
        const lookupOptionsGET = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            
        };

        fetch(endpoint, lookupOptionsGET)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            data = responseData;
            data.is_using = false;
            data.is_paid = true;
            const lookupOptionsPUT = {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify(data)
            };


            fetch(endpoint, lookupOptionsPUT)
            .then(function(response){
                return response.json()
            }).then(function(responseData){
                thisComp.props.history.push('/')
            }).catch(function(error){
                console.log(error)
            })

            }).catch(function(error){
                console.log(error)
            })
    }


    render(){
        console.log('render', this.state.order, this.state.products);
        return (
            <div>
               <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarPusher />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">Λεπτο</h1>
                        <br /> <br />
                    </div>
                </div>
                <h3 className="ui center aligned header">Δεδομένα</h3>
                <div className="ui two column doubling grid">
                    {this.state.products !== null && this.state.order !== null ? 
                    <OrderLeftColumn 
                        products={this.state.products}
                        order={this.state.order}
                        handleAddProduct={this.handleAddProduct}
                    />
                    :<p>No data</p>
                    }
                    {this.state.order !== undefined && this.state.order !== null ?
                         <OrderRightColumn 
                         order_items={this.state.order_items} 
                         order={this.state.order}  
                         updateOrderItemStatus={this.updateOrderItemStatus}
                         submitPaidButton={this.submitPaidButton}
                         submitCloseTable={this.submitCloseTable}

                     />  
                    :
                    <p>No data</p>
                    }                 
                </div>
            </div>
        )
    }
}

export default withRouter(Order);