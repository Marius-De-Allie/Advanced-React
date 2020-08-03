import React from 'react';
import Link from 'next/link';
// SingleItem Comp.
import SingleItem from '../components/SingleItem';
import { checkPropTypes } from 'prop-types';

const Item = ({ query }) => (
    <div>
        <SingleItem id={query.id} />
    </div>
);

export default Item;
