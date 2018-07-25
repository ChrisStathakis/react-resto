import React from 'react';
import getData from '../index/help';
import Navbar from '../Index/Navbar';
import NavbarPusher from '../index/NavbarPusher';


class HistoryPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            orders: []
        }

    }

    componentDidMount(){
        this.loadOrders()
        
    }

    loadOrders(){
        const endpoint = '/api/orders/';
        const thisComp = this;
        getData(endpoint, thisComp, 'orders')
    }

    render(){

        return (
            <div>
                <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarPusher />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">Reports</h1>
                        <br /> <br />
                    </div>
                </div>
                <h3 className="ui center aligned header">Data Flow</h3>
                <div className='ui two column doubling grid'>
                    <div className='column'>
                        <table className='ui table'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Title</th>
                                    <th>Is paid</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.orders.length > 0 ? this.state.orders.map((order)=>{
                                return (
                                    <tr>
                                        <td>{order.timestamp}</td>
                                        <td>{order.title}</td>
                                        <td>{order.tag_is_paid}</td>
                                        <td>{order.tag_value}</td>
                                    </tr>
                                )

                            })
                        
                            :
                                <p>No data</p>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default HistoryPage