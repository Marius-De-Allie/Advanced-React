import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

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

const Center = styled.div`
text-align: center
`;

const ItemList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: 1000px;
    margin: 0 auto;
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
            <Center>
                <Query query={ALL_ITEMS_QUERY}>
                    {({ data, error, loading }) => {
                        if(loading) {
                            <p>Loading...</p>
                        } else if(error) {
                            <p>Error: {error.message}</p>
                        } else {
                            console.log(data.items);
                            return <ItemList>
                                {data.items.map(item => <p key={item.id}>{item.description}</p>
                                )}
                            </ItemList>
                        }
                    }}
                </Query>
                {/*<button 
                    onClick={this.onButtonClick}
                    style={{backgroundColor: 'orange', border: 'none', padding: '15px'}}
                >Add +</button>
                <p>{this.state.count}</p>*/}
            </Center>
        );
    }
};

export default Items;