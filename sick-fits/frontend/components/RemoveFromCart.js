import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
// import { CURRENT_USER_QUERY } from ',.User';

const BigButton = styled.button`
font-size: 3rem;
background: none;
border: 0;

&:hover {
    color: red;
    cursor: pointer;
}
`;

class RemoveFromCart extends React.Component {

    render() {
        return (
            <BigButton title="Delete Item">&times;</BigButton>
        );
    }
};

export default RemoveFromCart;