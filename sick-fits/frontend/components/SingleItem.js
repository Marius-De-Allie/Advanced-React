import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            title
            id
            description
            largeImage
        }
    }
`;

class SingleItem extends Component {

    render() {
        return (
            <div>
                <p>Single Item Comp</p>
            </div>
        );
    }
};

export default SingleItem;