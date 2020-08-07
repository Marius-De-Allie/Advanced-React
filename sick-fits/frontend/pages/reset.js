import React from 'react';
// Next Link component, similar to react router Link component.
import Link from 'next/link';
import ResetPage from '../components/Reset';

const Reset = props => (
    <div>
        <Reset resetToken={props.query.resetToken} />
    </div>
);

export default ResetPage;
