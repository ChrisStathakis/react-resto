import React from 'react';


class Tables extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        const {tables} = this.props;

        return (
            <div className='ui grid container'>
                <div className='row'>
                    <h2 className="ui center aligned icon header">
                        <i className="circular users icon" />
                        Τραπέζια
                    </h2>
                </div>

                <div className='centered row'>
                    <div className="ui link cards">
                        {tables !== null ?
                            tables.map((table)=>{
                                return (
                                    <div className="card">
                                        <div className="content">
                                            <div className="header">{table.title}</div>
                                            <div className="meta">
                                                    Σερβιτόρος...{table.user_using}
                                            </div>
                                        </div>
                                        <div className="extra content">
                                            {table.is_using === false ?
                                                <div className="ui green  button">Αδειο</div>
                                                :
                                                <div className="ui labeled button" tabindex="0">
                                                <div className="ui basic blue button">
                                                  <i className="cart icon"></i> Αξία
                                                </div>
                                                <a className="ui basic left pointing blue label">
                                                  1,048
                                                </a>
                                              </div>
                                                }
                                        </div>
                                    </div>
                                )
                            })
                            :<div className="card">No data</div>
                            }
                    </div>
                </div>
            </div>

        )
    }
}

export default Tables;