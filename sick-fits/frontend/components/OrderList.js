import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';
import { formatDistance } from 'data-fns';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';


class OrderList extends React.Component {

    render() {
        return (
            <div>
                <p>Order list</p>
            </div>
        );
    }
};

export default OrderList;