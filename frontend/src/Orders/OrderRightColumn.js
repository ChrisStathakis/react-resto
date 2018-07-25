import React from 'react';

import Item from './OrderItems'

class OrderRightColumn extends React.Component {

    constructor(props){
        super(props)
        this.updateOrderItemStatus = this.updateOrderItemStatus.bind(this);
    }
    
    updateOrderItemStatus(id, qty){
        this.props.updateOrderItemStatus(id, qty)
    }

    submitPaidButton = () =>{
        this.props.submitPaidButton()
    }

    render() {
        const { order } = this.props;
        const { order_items} = this.props;
        console.log('props', order)
        return (
            <div className='column'>
               <div className="ui raised segment">
                    <h3 className='ui blue header'>Actions</h3>
                    {order.is_paid === true ?
                        <div className="ui labeled button" tabindex="0">
                            <div onClick={this.submitPaidButton} className="ui blue button">
                                <i className="payment icon"></i> Pay
                            </div>
                            <a className="ui basic label">Is Paid</a>
                        </div>
                    :
                    <div className="ui labeled button" tabindex="0">
                        <div onClick={this.submitPaidButton} className="ui red button">
                            <i className="payment icon"></i> Pay
                        </div> 
                         <a className="ui basic label">{order.tag_remain_value}</a>
                    </div>
                    }
                </div>
                <br /> <br />
                <div className="ui raised segment">
                    <h3 className='ui blue header'>Order Items</h3>
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
                            {order_items !== undefined && order_items !== null ? 
                                order_items.map((item)=>{
                                        return (
                                            <Item item={item} updateOrderItemStatus={this.updateOrderItemStatus} />
                                        )
                                    })        
                                    :
                                    <tr>
                                        <td>No data</td>
                                    </tr>                  
                            }
                            </tbody>
                    </table>   
                </div>
                <br /> 
                <div className='ui raised segment'>
                        <div className="ui buttons">
                                <button className="ui button">Cancel</button>
                                <div className="or"></div>
                                <button onClick={this.submitCloseTable} className="ui positive button">Close Table</button>
                        </div>
                </div>              
            </div>
        )
    }
}

export default OrderRightColumn;