import React from 'react';
import 'whatwg-fetch';
import 'react-cookies';
import cookie from 'react-cookies';

class Item extends React.Component {
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(event) {
        event.preventDefault()
        this.updateOrderItemStatus()
    }

    updateOrderItemStatus(item_id, qty) {
        this.props.updateOrderItemStatus(item_id, qty)
    }

    render(){
        const {item} = this.props;
        return (
            <tr>
                <td>
                    {item.is_paid === true ? 
                        <button className="ui blue icon button">
                        <i className="tiny payment icon"></i></button>
                        
                    : <button className="ui red icon button">
                    <i className="tiny payment icon"></i></button>
                    }
                    {item.tag_product_related}
                </td>
                <td>{item.tag_value}</td>
                <td>{item.tag_total_value}</td>
                <td className='warning'>{item.tag_remain}</td>
                <td>{item.qty}</td>
                <td>   
                    <div class="ui buttons">
                        <button onClick={this.handleClick} className="ui red icon button">
                        <i className="minus icon"></i>
                        </button>
                        <div className="or"></div>
                        <button onClick={this.handleClick} className="ui green icon button">
                            <i className="plus icon"></i>
                        </button>
                    </div>

                    
                </td>
            </tr>
        )
    }
}


export default Item;