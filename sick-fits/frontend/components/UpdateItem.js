import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            price
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
        ) {
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
        ) {
            id
            title
            description
            price
        }

    }

`;

class UpdateItem extends React.Component {
    // component state
    state = {};

    handleOnChange = ({ target }) => {
        const { name, type, value } = target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState(prevState => ({
            [name]: val
        }))

    }

    updateItem = async (evt, mutation) => {
        evt.preventDefault();
        // Call the mutation.
        const res = await mutation({
            variables: {
                id: this.props.id,
                ...this.state
            }
        });
        // redirect to single item page
        Router.push({
            pathname: '/item',
            query: {
                id: res.data.updateItem.id
            }
        })
    }

    
    render() {
        return (
            <Query
                query={SINGLE_ITEM_QUERY}
                variables={{
                    id: this.props.id
                }}
            >
                {({ data, loading }) => {
                    if(loading) return <p>Loading...</p>
                    if(!data.item) return <p>No Item found for ID {this.props.id}</p>
                    return (
                    <Mutation 
                    mutation={UPDATE_ITEM_MUTATION} 
                    variables={this.state}
                    >
                        {(updateItem, { loading, error }) => (
                            <Form onSubmit={evt => this.updateItem(evt, updateItem)}>
                                <ErrorMessage error={error} />
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <label htmlFor="title">Title</label>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        id="title" 
                                        placeholder="Title" 
                                        required
                                        defaultValue={data.item.title}
                                        onChange={this.handleOnChange}
                                        />
                                    <label htmlFor="price">Price</label>
                                    <input 
                                        type="number" 
                                        name="price" 
                                        id="price" 
                                        placeholder="Price" 
                                        required
                                        defaultValue={data.item.price}
                                        onChange={this.handleOnChange}
                                        />
                                    <label htmlFor="description">Description</label>
                                    <textarea 
                                        name="description" 
                                        id="description" 
                                        placeholder="Enter a decsription" 
                                        required
                                        defaultValue={data.item.description}
                                        onChange={this.handleOnChange}
                                        />
                                    <button type="submit">Save{loading ? 'ing' : ''} Changes</button>
                                </fieldset>
                            </Form>
                        )}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
};

export {UpdateItem as default, UPDATE_ITEM_MUTATION};