import React from React;
import getData from '../index/help';


class HistoryPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            orders: []
        }

    }

    componentDidMount(){
        this.loadOrders(
    }

    loadOrders(){
        const endpoint = '/api/orders/';
        const thisComp = this;
        getData(endpoint, thisComp, 'orders')
    }
}