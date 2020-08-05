import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';

const LOCAL_STATE_QUERY = gql`
    query LOCAL_STATE_QUERY {
        cartOpen @client
    }
`;

const TOGGLE_CART_MUTATION = gql`
    mutation TOGGLE_CART_MUTATION {
        toggleCart @client
    }
`;

const Cart = props => {

    return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
            {(toggleCart) => {
                <Query query={LOCAL_STATE_QUERY}>
                    {({ data }) => {
                        return (
                            <CartStyles open={data.cartOpen}>
                                <header>
                                    <CloseButton title="Close" onClick={toggleCart}>&times;</CloseButton>
                                    <Supreme>Your Cart</Supreme>
                                    <p>You Have  __ Items in your cart.</p>
                                </header>
                                <ul>
                                    {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
                                </ul>
                                <footer>
                                    <p>$10.10</p>
                                    <SickButton>Checkout</SickButton>
                                </footer>
                            </CartStyles>
                        );
                    }}
                </Query>
            }}
        </Mutation>
    );
};

export { Cart as default, LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };