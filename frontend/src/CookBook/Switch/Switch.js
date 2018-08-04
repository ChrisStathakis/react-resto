import React from 'react';
190
const CREDITCARD = 'CreditCard';
const BTC = 'Bitcoin';

class Switch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            payMethod: BTC
        }
    }

    select = (choice) => {
        return(event) => {
            this.setState({
                payMethod: choice
            })
        }
    }

    renderChoice = (choice) => {
        const cssClasses = [];
        if (this.state.payMethod === choice) {
            cssClasses.push(styles.active);
        }
        return (
            <div className='choice' 
                 onClick={this.select(choice)}
                 className={cssClasses}
                 >{choice}
            </div>
        )
        
    } 


    render() {
        
        return (
            <div className='switch'>
                {this.renderChoice(CREDITCARD)}
                {this.renderChoice(BTC)}
                Pay with: {this.state.payMethod}
            </div>
        )
    }
}


export default Switch;