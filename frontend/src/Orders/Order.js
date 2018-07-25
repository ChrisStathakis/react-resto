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
        this.updateOrderPage = this.updateOrderPage.bind(this);
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
        this.loadOrderItems(id)
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
        }
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
            let new_data = thisComp.state.order_items.concat(responseData)
            thisComp.setState({
                order_items: new_data
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }

    updateOrderItem(order_item, qty) {
        let data = order_item;
        data.qty = qty;
        const endpoint = `/api/orders-items/detail/${order_item.id}/`
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
            let current_data = thisComp.state.order_items
            const end_data = current_data.map((data_)=>{
                console.log('loop', data_, responseData)
                if (data_.id === responseData.id){
                    return (
                        Object.assign({}, responseData,{
                            qty: qty
                        })
                    )
                } else {
                    return data
                }
            })
            thisComp.setState({
                order_items: end_data
            })
        }).catch(function(error){
            console.log('error', error)
        })
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

    handleMinus(event){
        event.preventDefault();
        let qty_ = this.state.qty -1
        this.setState({
            qty: qty_
        })
        let type_ = 'minus'
        this.updateItem(type_)
    }

    updateOrderItemStatus = () =>{

    }

    submitPaidButton = () =>{
        this.submitPaidOrder()
    }

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
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            let order_items_ = thisComp.state.order_items
            new_order_items = order_items_.map((item)=>{
                let new_item = item
                new_item.is_paid = !item.is_paid
                return new_item
            })
            thisComp.setState({
                order: responseData,
                order_items: new_order_items
            })
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
                thisComp.props.history.push('/')
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

    render(){
        console.log('render', this.state.order, this.state.products)
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