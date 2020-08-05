import React from 'react';
import styled from 'styled-components';

const Dot = styled.div`
    background-color: red;
    color: white;
    border-radius: 50%;
    line-height: 2rem;
    min-width: 3rem;
    margin-left: 1rem;
    font-weight: 100;
    font-feature-setting: 'tnum';
    font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => (
    <Dot>
        {count}
    </Dot>
);

export default CartCount;

