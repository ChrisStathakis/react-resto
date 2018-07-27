import React from 'react';
import 'whatwg-fetch';
import 'react-cookies';



class Item extends React.Component {
    
    constructor(props){
        super(props);
    }

    handleAdd = () => {
        let id = this.props.item.id;
        let qty = this.props.item.qty + 1;
        this.props.updateOrderItemStatus(id, qty)

    };

    handleRemove = () => {
        let id = this.props.item.id;
        let qty = this.props.item.qty - 1;
        this.props.updateOrderItemStatus(id, qty)
    };



    render(){
        const {item} = this.props;
        return (
            <tr>
                <td>
                    {item.is_paid === true ? 
                        <button className="ui blue icon button">
                        <i className="tiny payment icon" /></button>
                        
                    : <button className="ui red icon button">
                    <i className="tiny payment icon" /></button>
                    }
                    {item.tag_product_related}
                </td>
                <td>{item.tag_value}</td>
                <td>{item.tag_total_value}</td>
                <td className="warning">{item.qty}</td>
                <td>   
                    <div className="ui buttons">
                        <button onClick={this.handleRemove} className="ui red icon button">
                        <i className="minus icon" />
                        </button>
                        <div className="or" />
                        <button onClick={this.handleAdd} className="ui green icon button">
                            <i className="plus icon" />
                        </button>
                    </div>

                    
                </td>
            </tr>
        )
    }
}


export default Item;