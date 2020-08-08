import React from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RemoveFromCart from './RemoveFromCart';

const CartItemsStyles = styled.li`
    padding: 1rem;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    display: grid;
    aligh-items: center;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 10px;
    }
    h3, p {
        margin: 0;
    }
`;

const CartItem = ({ cartItem }) => {
    // check if that item exists.
    if(!cartItem.item) return 
        <CartItemsStyles>
            <p>This Item has been removed.</p><RemoveFromCart />
        </CartItemsStyles>
    return (
        <CartItemsStyles>
            <img src={cartItem.item.image} alt={cartItem.item.title} witdh="100" />
            <div className="cart-item-details">
                <h3>{cartItem.item.title}</h3>
                <p>
                    {formatMoney(cartItem.item.price * cartItem.quantity)}
                    {' - '}
                    <em>
                        {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
                    </em>
                </p>
                <p>{cartItem.item.description}</p>
            </div>
            <RemoveFromCart id={cartItem.id} />
        </CartItemsStyles>
    );
};

CartItem.propTYpes = {
    cartItem: PropTypes.object.isREquired
};

export default CartItem;