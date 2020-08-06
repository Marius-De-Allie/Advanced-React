import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import ErrorMessage from './ErrorMessage';
// import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        # call serverside mutation.
        createOrder(token: $token) {
            id
            charge
            total
            items {
                id
                title
            }
        }
    }
`;

class TakeMyMoney extends Component {

    totalItems = cart => {
        return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
    }

    onToken = async (res, createOrder) => {
        const id = await res.id
        // manually call the createOrder mutation once we have the stripe token.
        const order = await createOrder({
            variables: {
                token: id
            }
        })
        .catch(e => {
            alert(e.message);
        });
    };

    render() {
        return (
            <div>
                {/*<>User>
                    {({ data: { me } }) => (
                        <StripeCheckout>{this.props.children}</StripeCheckout>
                    )}
                </User>*/}
                {this.props.children}
                <Mutation
                    mutation={CREATE_ORDER_MUTATION}
                    {/*refetchQueries={[{ query: CURRENT_USER_QUERY }]}*/}
                >
                    {(createOrder) => (
                        <StripeCheckout
                            amount={calcTotalPrice(me.cart)}
                            name="Sick Fits"
                            description={`Order of ${this.totalItems(me.cart)} items`}
                            image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
                            stripeKey={process.env.STRIPE_PUB_KEY}
                            currency="USD"
                            email={me.email}
                            token={res => this.onToken(res, createOrder)}
                        >
                            {this.props.children}
                        </StripeCheckout>
                    )}
                </Mutation>

            </div>
        );
    }
};

export default TakeMyMoney;


