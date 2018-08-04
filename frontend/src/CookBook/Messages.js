import React from 'react';

class Messages extends React.Component {

    static propTypes = {
        users: PropTypes.array.is_required,
        initialActiveChatId: PropTypes.number,
        messages: PropTypes.array.is_required
    }

    static childContextTypes = {
        users: PropTypes.array,
        userMap: PropTypes.object
    }

    getChildContext () {
        return {
            users: this.getUsers(),
            userMap: this.getUserMap()
        }
    }
}