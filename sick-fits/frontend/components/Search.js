import React from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY ($searchTerm: String!) {
        items(where: {
            OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }]
        }) {
            id
            image
            title
        }
    }
`;

class AutoComplete extends React.Componnent {

    state = {
        items: [],
        loading: false
    };

    handleChange = debounce(async (evt, client) => {
        //  Turn loading on.
        this.setState(() => ({
            loading: true
        }));
        // Manually query Apollo client.
        const res = await client.query({
            uqery: SEARCH_ITEMS_QUERY,
            variables: { searchTerm: evt.target.value }
        });
        this.setState(() => ({
            items: res.data.items,
            loading: false
        }));
    }, 350);
    
    render() {
        const { items } = this.state;
        return (
            <SearchStyles>
                <div>
                    <ApolloConsumer>
                        {(client) => (
                            <input 
                            type="search" 
                            value={this.state.searchTerm} 
                            name="search" 
                            onChange={evt => {
                                evt.persist();
                                this.handleChange(evt, client);
                            }} 
                        />
                        )}
                    </ApolloConsumer>
                    <DropDown>
                        {items.map(item => (
                            <DropDownItem key={item.id}>
                                <img 
                                    src={item.image} 
                                    witdh="50" 
                                    alt={item.title} 
                                />
                                {item.title}
                            </DropDownItem>
                        ))}
                    </DropDown>
                </div>
            </SearchStyles>
        );
    }
};

export default AutoComplete;

// class Search extends React.Component