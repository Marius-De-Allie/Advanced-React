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
            <Query 
                query={SINGLE_ITEM_QUERY} 
                variables={{id: this.props.id}}
            >
                {({ error, data, loading }) => {
                    if(error) return <ErrorMessage error={error} />
                    if(loading) return <p>Loading...</p>
                    if(!data.item) return <p>No item found for {this.props.id}</p>
                    return (
                        <div>
                            <p>Single Item Comp</p>
                        </div>
                    )
                }}
            </Query>
        );
    }
};

export default SingleItem;