import React from 'react';

class DeleteItem extends React.Component {

    render() {
        return (
            <div>
                <button>{this.props.children}</button>
            </div>
        );
    }
};

export default DeleteItem;