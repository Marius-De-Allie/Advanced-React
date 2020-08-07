import React from 'react';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import calcTotalPrice  from '../lib/calcTotalPrice';
import formatMoney  from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';

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

const Composed = adopt({
    user: ({ render }) => <User>{render}</User>,
    toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
    localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

const Cart = props => {
    return (
        <Composed>
            {({ user, toggleCart, localState }) => {
                const { me } = user.data;
                if(!me) return null;
                return (
                    <CartStyles open={localState.data.cartOpen}>
                        <header>
                            <CloseButton title="Close" onClick={toggleCart}>&times;</CloseButton>
                            <Supreme>Your Cart</Supreme>
                            <p>You Have  __ Items in your cart.</p>
                        </header>
                        <ul>
                            {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
                        </ul>
                        <footer>
                            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                            {me.cart.length && (
                                <TakeMyMoney><SickButton>Checkout</SickButton></TakeMyMoney>
                            )}
                        </footer>
                    </CartStyles>
                )
            }}
        </Composed>
    );
};

export { Cart as default, LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };