import React from 'react';
// Next Link component, similar to react router Link component.
import Link from 'next/link';
import CreateItem from '../components/CreateItem';

const Sell = () => (
    <div className="sell-page">
        <h2>Sell an Item.</h2>
        <CreateItem />
    </div>
);

export default Sell;
