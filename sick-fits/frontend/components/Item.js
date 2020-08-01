import React from 'react';
class Item extends React.Component {

    render() {
        const { title, description, price, image, largeImage } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>{`Price: $${price / 100}.00`}</p>
            </div>

        );
    }
};

export default Item;