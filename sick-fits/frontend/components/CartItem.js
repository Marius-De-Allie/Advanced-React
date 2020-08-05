import React from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const cartItemsStyles = styled.li`

`;

const CartItem = ({ cartItem }) => (
    <cartItemsStyles>{cartItem.id}</cartItemsStyles>
);

CartItem.propTYpes = {
    cartItem: PropTypes.object.isREquired
};

export default CartItem;