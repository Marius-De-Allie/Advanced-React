import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import ErrorMessage from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

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
        return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
    }

    onToken = async (res, mutation) => {
        NProgress.start();
        const id = await res.id
        // manually call the createOrder mutation once we have the stripe token.
        const order = await mutation({
            variables: {
                token: id
            }
        })
        .catch(e => {
            alert(e.message);
        });
        console.log(order);
        Router.push({
            pathname: '/order',
            query: { id: order.data.createOrder.id }
        })
    };

    render() {
        return (
            <div>
                <User>
                    {({ data: { me } }) => (
                        <Mutation 
                            mutation={CREATE_ORDER_MUTATION}
                            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                        >
                            {(createOrder) => (
                            <StripeCheckout
                                amount={calcTotalPrice(me.cart)}
                                name="Sick Fits"
                                description={`Order of ${this.totalItems(me.cart)} items`}
                                image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
                                stripeKey="pk_test_51Gvru9BC8emmIHok575meXvz37Ly5cn5BhiKZ6vfuojHhDQoCGbu64WLEuD9ui5bzKcSbWHXf02kQh8ie8bHArSm00bUe3IFxb"
                                currency="USD"
                                email={me.email}
                                token={res => this.onToken(res, createOrder)}
                            >
                                {this.props.children}
                            </StripeCheckout>
                            )}
                        </Mutation>
                    )}
                </User>
            </div>
        );
    }
};

export default TakeMyMoney;


//  {/*refetchQueries={[{ query: CURRENT_USER_QUERY }]}*/} gos to line 62