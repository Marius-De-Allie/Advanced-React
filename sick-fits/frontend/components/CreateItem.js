import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
        ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }

    }

`;

class CreateItem extends React.Component {

    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0
    }

    handleOnChange = ({ target }) => {
        const { name, type, value } = target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState(prevState => ({
            [name]: val
        }))

    }

    handleSubmit = async evt => {
        evt.preventDefault();
        // Call the mutation.
        const res = await createItem();
        // redirect to single item page
        Router.push({
            pathname: '/item',
            query: {
                id: res.data.createItem.id
            }
        })

    }



    render() {
        const {title, description, image, largeImage, price} = this.state;
        return (
            <Mutation 
                mutation={CREATE_ITEM_MUTATION} 
                variables={this.state}
            >
                {(createItem, { loading, error }) => (
                    <form onSubmit={this.handleSubmit}>
                        <ErrorMessage error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                placeholder="Title" 
                                required
                                value={title}
                                onChange={this.handleOnChange}
                            />
                            <label htmlFor="price">Price</label>
                            <input 
                                type="number" 
                                name="price" 
                                id="price" 
                                placeholder="Price" 
                                required
                                value={price}
                                onChange={this.handleOnChange}
                            />
                            <label htmlFor="description">Description</label>
                            <textarea 
                                name="description" 
                                id="description" 
                                placeholder="Enter a decsription" 
                                required
                                value={description}
                                onChange={this.handleOnChange}
                            />
                            <input type="submit" value="Submit" />
                        </fieldset>
                    </form>
                )}
                </Mutation>
        )
    }
};

export {CreateItem as default, CREATE_ITEM_MUTATION};
// label htmlFor="price">Price</label>
// <input type="text" name="Price" id="price" />