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

    render() {
        return (
            <div>
                {/*<>User>
                    {({ data: { me } }) => (
                        <p>Checkout</p>
                    )}
                </User>*/}


            </div>
        );
    }
};

export default TakeMyMoney;


