import React from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RemoveFromCart from './RemoveFromCart';

const cartItemsStyles = styled.li`
    padding: 1rem;
    border-bottom: 1px solid lightgrey;
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

const CartItem = ({ cartItem }) => (
    <cartItemsStyles>
        <img src={cartItem.item.image} alt={cartItem.item.title} witdh="100" />
        <div className="cart-tem-details">
            <h3>{cartItem.item.title}</h3>
            <p>
                {formartMoney(cartItem.item.price * cartItem.quantity)}
                {' - '}
                <em>
                    {cartItem.quantity} &times; {formatMoney(cartItem.item.price)}
                </em>
            </p>
            <p>{cartItem.item.description}</p>
        </div>
        <RemoveFromCart id={cartItem.id} />
    </cartItemsStyles>
);

CartItem.propTYpes = {
    cartItem: PropTypes.object.isREquired
};

export default CartItem;