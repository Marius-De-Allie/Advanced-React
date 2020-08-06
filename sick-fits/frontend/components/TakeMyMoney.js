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

class TakeMyMoney extends Component {

    totalItems = cart => {
        return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
    }

    render() {
        return (
            <div>
                {/*<>User>
                    {({ data: { me } }) => (
                        <StripeCheckout>{this.props.children}</StripeCheckout>
                    )}
                </User>*/}
                {this.props.children}
                <StripeCheckout
                    amount={calcTotalPrice(me.cart)}
                    name="Sick Fits"
                    description={`Order of ${this.totalItems(me.cart)} items`}
                    image={me.cart[0].item && me.cart[0].item.image}
                    stripeKey="placeholder"
                    currency="USD"
                    email={me.email}
                    token={res => this.onToken(res)}
                >
                    {this.props.children}
                </StripeCheckout>

            </div>
        );
    }
};

export default TakeMyMoney;


