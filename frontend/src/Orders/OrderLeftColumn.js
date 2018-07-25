import React from 'react';

class OrderLeftColumn extends React.Component {

    constructor(props){
        super(props)
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }
    
    handleAddProduct(id, qty){
        this.props.handleAddProduct(id, qty)
    }

    render() {
        const products = this.props.products.map((product)=>{
            return (
                <Product product={product} 
                         order={this.props.order}
                         updateOrderPage={this.updateOrderPage}
                         handleAddProduct={this.handleAddProduct}
                />
                )
            })
        return (
            <div className='column'>
                <div className='ui raised segment'>
                    <h3 className='ui blue header'>Order Details</h3>
                    <div className="ui small statistics">
                        <div className="blue statistic">
                            <div className="value">
                                {this.props.order.tag_table_related}
                            </div>
                            <div className="label">
                                Table
                            </div>
                        </div>
                        <div className="red statistic">
                            <div className="value">
                                {this.props.order.tag_value}
                            </div>
                            <div class="label">
                                Value
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ui raised segment'>
                    <h3 className='ui blue header'>Products</h3>
                    <table className="ui orange table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


class Product extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
    }

   
    handleClick(event){
        event.preventDefault()
        let qty = event.target.value;
        this.props.handleAddProduct(this.props.product.id, qty)
    }

   
    render() {
        const {product} = this.props;
        
        return(
            <tr>
                <td>{product.title}</td>
                <td>{product.tag_value}</td>
                <td><button name={product.id} value='1' onClick={this.handleClick} className='ui green button'>1</button>
                <button name={product.id} value='2'  onClick={this.handleClick} className='ui green button'>2</button>
                <button name={product.id} value='3'  onClick={this.handleClick} className='ui green button'>3</button>
                <button name={product.id} value='4'  onClick={this.handleClick} className='ui green button'>4</button>
                </td>
            </tr>
        )
    }


}

export default OrderLeftColumn;