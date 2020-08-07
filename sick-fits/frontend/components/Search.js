import React from 'react';
import Downshift, { resetIdCounter} from 'downshift';
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

const routeToItem = item => {
    Router.push({
        pathname: '/item',
        query: {
            id: item.id
        }
    })
};
class AutoComplete extends React.Component {

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
        resetIdCounter();
        const { items, loading } = this.state;
        return (
            <SearchStyles>
                <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>
                    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
                        <div>
                            <ApolloConsumer>
                                {(client) => (
                                    <input 
                                    {...getInputProps({
                                        type: "search",
                                        placeholder: 'Search for an item',
                                        id: "search",
                                        className: loading ? 'loading' : '',
                                        onChange: evt => {
                                            evt.persist();
                                            this.handleChange(evt, client);
                                        }
                                    })}
                                    value={this.state.searchTerm} 
                                    name="search" 
                                />
                                )}
                            </ApolloConsumer>
                            {isOpen && (
                                <DropDown>
                                    {items.map((item, index) => (
                                        <DropDownItem 
                                            {...getItemProps({ item })}
                                            key={item.id}
                                            highlighted={index === highlightedIndex}
                                        >
                                            <img 
                                                src={item.image} 
                                                witdh="50" 
                                                alt={item.title} 
                                            />
                                            {item.title}
                                        </DropDownItem>
                                    ))}
                                    {!items.length && loading && 
                                        <DropDownItem>
                                            Nothing Found {inputValue}
                                        </DropDownItem>
                                    }
                                </DropDown>
                            )}
                        </div>
                    )}
                </Downshift>
            </SearchStyles>
        );
    }
};

export default AutoComplete;

// class Search extends React.Component