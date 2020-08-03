import React from 'react';
import Link from 'next/link';
// Import Items Comp.
import Items from '../components/Items';
import { printIntrospectionSchema } from 'graphql/utilities';

const Home = ({ query }) => (
    <div>
        <Items page={parseFloat(query.page) || 1} />
    </div>
);

export default Home;
