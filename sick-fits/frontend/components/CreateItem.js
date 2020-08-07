import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

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

    handleOnChange = evt => {
        const { name, type, value } = evt.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState(prevState => ({
            [name]: val
        }));
    }

    handleSubmit = async evt => {
        evt.preventDefault();
        // Call the mutation.
        const res = await createItem();
        // redirect to single item page
        Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id }
        })
    };

    // Handle uploading of images
    // uploadFile =  async (evt) => {
    //     const files = evt.target.files;
    //     const data = new FormData();
    //     data.append('file', files[0]);
    //     data.append('upload_preset', 'sickfits');
    //     const res = await fetch('https://res.cloudinary.com/dvvysxtc9/image/upload/', 
    //     {
    //         method: 'POST',
    //         body: data
    //     });
    //     const file = await res.json(); 
    //     console.log(file);
    //     this.setState(() => ({
    //         image: file.secure_url,
    //         // largeImage: file.eager[0].secure_url
    //     }));
    // }

    render() {
        const {title, description, image, largeImage, price} = this.state;
        return (
            <Mutation 
                mutation={CREATE_ITEM_MUTATION} 
                variables={this.state}
            >
                {(createItem, { loading, error }) => (
                    <Form onSubmit={this.handleSubmit}>
                        <h2>Sell an Item</h2>
                        <ErrorMessage error={error} />
                        <fieldset 
                            disabled={loading} 
                            aria-busy={loading}
                        >
                          
                            {image && <img src={image} alt="Upload Preview" />}
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
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
                </Mutation>
        )
    }
};

export {CreateItem as default, CREATE_ITEM_MUTATION};
// label htmlFor="price">Price</label>
// <input type="text" name="Price" id="price" />




                    // <label htmlFor="file">Image</label>
                    // <input 
                    //     type="file" 
                    //     name="file" 
                    //     id="file" 
                    //     placeholder="Upload an image" 
                    //     required
                    //     value={image}
                    //     onChange={this.uploadFile}
                    // />