import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

// GQL query to retrieve all items from backend.
const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

// styled center comp
const Center = styled.div`
    text-align: center;
`;

// styled itemList comp
const ItemsList = styled.div`
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
                <Pagination page={this.props.page} />
                <Query 
                    query={ALL_ITEMS_QUERY}
                    // fetchPolicy="network-only"
                    variables={{
                        skip: this.props.page * perPage - perPage,
                        first: perPage
                    }}
                >
                    {({ data, error, loading }) => {
                        if(loading) {
                            return <p>Loading...</p>
                        } else if(error) {
                            return <p>Error: {error.message}</p>
                        }
                        console.log(data.items);
                        return <ItemsList>
                            {data.items.map(item => 
                                <Item key={item.id} item={item} />
                            )}
                        </ItemsList>
                    }}
                </Query>
                <Pagination page={this.props.page} />
            </Center>
        );
    }
};

export { Items as default, ALL_ITEMS_QUERY };


// {/*<button 
//                     onClick={this.onButtonClick}
//                     style={{backgroundColor: 'orange', border: 'none', padding: '15px'}}
//                 >Add +</button>
//                 <p>{this.state.count}</p>*/}