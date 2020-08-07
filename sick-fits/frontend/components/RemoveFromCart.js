import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation removeItemFromCart($id: ID!) {
        removeItemFromCart(id: $id) {
            id
        }
    }
`;

const BigButton = styled.button`
font-size: 3rem;
background: none;
border: 0;
&:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
}
`;

class RemoveFromCart extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired
    };
    // This gets called as soon as we get a response back from the server after a mutation has been called.
    update = (cache, payload) => {
        // Read the cache
        const data = cache.readQuery({ query: CURRENT_USER_QUERY });
        // Remove item from cart
        const cartItemId = payload.data.removeItemFromCart.id;
        data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId)
        // Write it back to the cache.
        cache.writeQuery({ query: CURRENT_USER_QUERY, data });
    }

    render() {
        return (
            <Mutation 
                mutation={REMOVE_FROM_CART_MUTATION}
                variables={{ id: this.props.id }}
                update={this.update}
                optimisticResponse={{
                    __typename: 'Mutation',
                    removeItemFromCart: {
                        __typename: 'CartItem',
                        id: this.props.id
                    }
                }}
            >
                {(removeItemFromCart, { loading, error }) => 
                    <BigButton 
                        onClick={() => removeItemFromCart().catch(e => alert(e.message))}
                        disabled={loading} 
                        title="Delete Item">
                        &times;
                    </BigButton>
                }
            </Mutation>
        );
    }
};

export default RemoveFromCart;