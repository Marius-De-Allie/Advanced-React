import React from 'react';
// Next Link component, similar to react router Link component.
import Link from 'next/link';
import Order from '../components/Order';

const OrderPage = () => (
    <div>
        <Order id={props.query.id} />
    </div>
);

export default OrderPage;
