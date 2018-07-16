import React from 'react';
import 'whatwg-fetch';
import 'react-cookies';
import cookie from 'react-cookies';

class Item extends React.Component {
    
    constructor(props){
        super(props)
        this.state({
            qty:0,
            id:0
        })

    }

    componentDidMount(){
        const {item} = this.props;
        this.setState({
            qty: item.qty,
            id: item.id
        })
    }

    handleMinus(event){
        event.preventDefault();
        
    }

    render(){
        const {item} = this.props;

        return (
            <tr>
                <td>{item.tag_product_related}</td>
                <td>{item.tag_value}</td>
                <td>{item.tag_total_value}</td>
                <td className='warning'>{item.tag_remain}</td>
                <td>{item.qty}</td>
                <td>
                    <button class="ui red icon button">
                    <i class="minus icon"></i>
                    </button>
                    <button class="ui green icon button">
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
        this.state = {
            
        }
    }

    handleMinus(event){
        event.preventDefault()
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            
        })
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
                            <Item item={item} />
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