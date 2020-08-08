import React from 'react';
// Next Link component, similar to react router Link component.
import Link from 'next/link';
import PleaseSignin from '../components/PleaseSignin';
import OrderList from '../components/OrderList';

const Orders = (props) => (
    <PleaseSignin>
        <OrderList />
    </PleaseSignin>
);

export default Orders;