import React from 'react';
// Next Link component, similar to react router Link component.
import Link from 'next/link';
import UpdateItem from '../components/UpdateItem';

const Update = ({ query }) => (
    <div className="update-page">
        {/* <p>{JSON.stringify(query)}</p> */}
        <h2>Update Item</h2>
        <UpdateItem id={query.id} />
    </div>
);

export default Update;
