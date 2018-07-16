import React from 'react';
import 'whatwg-fetch';
import 'react-cookies';

class OrderProducts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            qty:1
        }
    }

    render() {
        const {products} = this.props;
        const {qty} = this.props;
        return (
            <table className="ui orange table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Actions</th>
                    </tr>
                            </thead>
                            <tbody>
                                {products !== undefined ? 
                                    products.map((product)=>{
                                        return (
                                            <tr>
                                                <td>{product.title}</td>
                                                <td>{product.tag_value}</td>
                                                <td><input type='number' className='ui item' value={qty} name={product.id} /></td>
                                                <td><button className='ui green button'>Add</button></td>
                                            </tr>
                                        )
                                    })
                            
                                :
                                <tr>
                                    <td>No hgdata</td>
                                </tr>
                                    
                                }
                                </tbody>
                            </table>
        )
    }


}

export default OrderProducts;