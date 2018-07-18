import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


class OrderForm extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: '',
            active: true,
            is_paid: false,
            table_related: null,
            is_using: true
        }
    }

    createOrder(){
        const endpoint = '/api/orders/';
        const data = this.state; 
        const thisComp = this;
        const csrfToken = cookie.load('csrftoken')
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            console.log('daad', responseData, thisComp.props)
            thisComp.props.history.push(`/order/${responseData.id}`)
        }).catch(function(error){
            console.log(error)
        })
    }

    updateTable(id){
        const endpoint = `/api/table/detail/${id}/`
        const csrfToken = cookie.load('csrftoken')
        let lookupOptionsGET = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptionsGET)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            let data = responseData;
            data.is_using = true
            let lookupOptionsPUT = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data),
                credentials: 'include'
            }
            fetch(endpoint, lookupOptionsPUT)
            .then(function(response){
                return response.json()
            }).then(function(responseData){
                
            }).catch(function(error){
                console.log(error)
            }) 
        }).catch(function(error){
            console.log(error)
        })

    }
    

    componentDidMount(){
        console.log(this.props)
        const {id} = this.props;
        console.log('props', id)
        this.setState({
            title: '',
            active: true,
            is_paid: false,
            table_related: id,
            is_using: true
        })
    }

    handleChange(event){
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.updateTable(this.state.table_related)
        this.createOrder();
    }


    render() {
        const {state} = this;
        return (
            <div className='ui grid container'>
                <div className='row'>
                    <h4 className='ui header green'>New Order</h4>
                </div>
                <div className='centered row'>
                    <div className='column'>
                        <form className='ui form' method='POST'>
                            <div className='field'>
                                <label>Title</label>
                                <input type='text' name='title' placeholder='No need' onChange={this.handleChange} value={state.title} />
                            </div>
                            <div class="ui buttons">
                                <Link to={{
                                    pathname:`/`
                                }}>
                                <button class="ui button">Cancel</button></Link>
                                <div class="or"></div>
                                <button type='submit' onClick={this.handleSubmit} class="ui positive button">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(OrderForm);