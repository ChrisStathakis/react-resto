import React from 'react'

class ThreadList extends React.Component {

    static contexTypes = {
        userMap: PropTypes.object
    }

    render () {
        return (
            <div className={styles.threadList}>
                <ul className={styles.list}>
                    {this.context.users.map((u, idx)=>{
                        return (
                            <UserListing
                                onClick={this.props.onClick}
                                key={idx}
                                index={idx}
                                user={u}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }

    componentWillReceiveProps(nextProps, nextContent) {

    }

    shouldComponentUpdate(nextProps, nextState, nextContent) {

    }

    componentWillUpdate(nextProps, nextState, nextContent) {

    }

    componentDidUpdate(prevProps, prevState, prevContent) {

    }
    
}
