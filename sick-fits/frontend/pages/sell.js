import React from 'react';
// Next Link component, similar to react router Link component.
import Link from 'next/link';
import CreateItem from '../components/CreateItem';
import PleaseSignin from '../components/PleaseSignin';
import Header from '../components/Header';
const Sell = () => (
    <div>
        <Header />
        <PleaseSignin>
            <CreateItem />
        </PleaseSignin>
    </div>
);

export default Sell;
