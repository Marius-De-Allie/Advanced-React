import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

class Signin extends Component {
    // Component state.
    state = {
        email: '',
        password: ''
    }

    handleChange = ({ target }) => {
        this.setState((prevState) => ({
            [target.name]: target.value
        }));
    }

    onSubmit = async (evt, signinMutation) => {
            evt.preventDefault();
        try {
            const response = await signinMutation();
            // console.log('Success!!');
            // Clear input fields.
            this.setState(() => ({
                email: '',
                password: ''
            }));
        } catch(error) {
            console.log(error.message)
        }
    };
 
    render() {
        const { email, password } = this.state;
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signin, { error, loading }) => {
                    return (
                        <Form onSubmit={evt => {this.onSubmit(evt, signin)}} method="post">
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign Into your Account</h2>
                                <ErrorMessage error={error} />
                                <label htmlFor="signin-email">Email</label>
                                <input
                                    id="signin-email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="signin-password">Password</label>
                                <input
                                    id="signin-password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Enter password"
                                    onChange={this.handleChange}
                                />
                                <button type="submit">Sign In</button>
                            </fieldset>
                        </Form>
                    );
                }}
            </Mutation>
        );
    }
};

export default Signin;