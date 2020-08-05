import React from 'react';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

class Item extends React.Component {

    render() {
        const { id, title, description, price, image, largeImage } = this.props;
        return (
            <div>
                {image && <img src={image} alt="title" />}
                <h2>
                    <Link href={{
                        pathname: '/item',
                        query: {id}
                    }}>
                        <a>{title}</a>
                    </Link>
                </h2>
                <p>{formatMoney(price)}</p>
                <p>{description}</p>
                <div className="buttonList">
                    <Link href={{
                        pathname: 'update',
                        query: { id }
                    }}>
                        <a>Edit</a>
                    </Link>
                    <AddToCart />
                    <DeleteItem id={id}>Delete Item</DeleteItem>
                </div>
            </div>

        );
    }
};

export default Item;