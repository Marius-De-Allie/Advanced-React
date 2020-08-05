import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class AddToCart extends Component {

    render() {
        const { id} = this.props;
        return (
            <button>Add To Cart</button>

        );
    }
};

export default AddToCart;