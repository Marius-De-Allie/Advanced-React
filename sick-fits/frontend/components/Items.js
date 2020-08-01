import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// GQL query to retrive all items from backend.
const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

class Items extends React.Component {

    render() {
        return (
            <div>
                <Query query={ALL_ITEMS_QUERY}>
                    {({ data, error, loading }) => {
                        if(loading) {
                            <p>Loading...</p>
                        } else if(error) {
                            <p>Error: {error.message}</p>
                        } else {
                            console.log(data.items);
                            return <p>{`Found ${data.items.length} item${data.items.length === 1 ? '' : 's'}`}</p>
                        }
                    }}
                </Query>
            </div>
        );
    }
};

export default Items;