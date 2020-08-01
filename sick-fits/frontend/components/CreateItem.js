import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import formartMoney from '../lib/formatMoney';

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

    handleSubmit = (evt) => {
        evt.preventDefault();

    }



    render() {
        const {title, description, image, largeImage, price} = this.state;
        return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
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
        )
    }
};

export default CreateItem;
// label htmlFor="price">Price</label>
// <input type="text" name="Price" id="price" />