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

    // state = {
    //     count: 0
    // };

    // onButtonClick = () => {
    //     this.setState(prevState => ({
    //         count: prevState.count + 1
    //     }))
    // }

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
                {/*<button 
                    onClick={this.onButtonClick}
                    style={{backgroundColor: 'orange', border: 'none', padding: '15px'}}
                >Add +</button>
                <p>{this.state.count}</p>*/}
            </div>
        );
    }
};

export default Items;