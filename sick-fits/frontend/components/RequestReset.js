import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`;

class RequestReset extends Component {
    // Component state.
    state = {
        email: ''
    }

    handleChange = ({ target }) => {
        this.setState((prevState) => ({
            [target.name]: target.value
        }));
    }

    onSubmit = async (evt, mutation) => {
            evt.preventDefault();
        try {
            const response = await mutation();
            // Clear input fields.
            this.setState(() => ({
                email: ''
            }));
        } catch(error) {
            console.log(error.message)
        }
    };
 
    render() {
        const { email, name, password } = this.state;
        return (
            <Mutation
                mutation={REQUEST_RESET_MUTATION}
                variables={this.state}
            >
                {(requestReset, { error, loading, called }) => {
                    return (
                        <Form onSubmit={evt => {this.onSubmit(evt, requestReset)}} method="post">
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Request a password reset</h2>
                                <ErrorMessage error={error} />
                                {!error && !loading && called && <p>Success! Check your email for a reset link</p>}
                                <label htmlFor="reset-email">Email</label>
                                <input
                                    id="reset-email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={this.handleChange}
                                />
                                <button type="submit">Request Reset</button>
                            </fieldset>
                        </Form>
                    );
                }}
            </Mutation>
        );
    }
};

export default RequestReset;