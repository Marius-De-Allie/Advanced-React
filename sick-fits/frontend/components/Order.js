import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!) {
        order(id: $id) {
            id
            charge
            total
            createdAt
            user {
                id
            }
            items {
                id
                title
                description
                price
                image
                quantity
            }
        }
    }
`;

class Order extends React.Component {
    static propTypes = {
        id: this.propTypes.string.isRequired
    }

    render() {
        return (
            <Query 
                query={SINGLE_ORDER_QUERY}
                variables={{ id: this.props.id}}
            >
                {({ data, error, loading }) => {
                    if(error) return <ErrorMessage error={error.message} />
                    if(loading) return <p>Loading...</p>
                    return (
                    <div>
                        <p>Order ID: {this.props.id}</p>
                    </div>
                    );
                }}
            </Query>
        );
    }
};

export default Order;