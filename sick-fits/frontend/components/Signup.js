import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    handleChange = ({ target }) => {
        this.setState(() => ({
            [target.name]: target.value
        }));
    }

    render() {
        const { email, name, password } = this.state;
        return (
            <Form>
                <fieldset>
                    <h2>Sign up for an account</h2>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Enter name"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Submit</button>
                </fieldset>

            </Form>
        );
    }
};

export default Signup;