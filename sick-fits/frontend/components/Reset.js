import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($resetToken: String!, password: String!, confirmPassword: String!) {
        reset(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
            id
            email
            name
        }
    }
`;

class Reset extends Component {
    static PropTypes = {
        resetToken: PropTypes.string.isRequired
    };
    // Component state.
    state = {
        password: '',
        confirmPassword: ''
    };

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
                password: '',
                confirmPassword: ''
            }));
        } catch(error) {
            console.log(error.message)
        }
    };
 
    render() {
        const { email, name, password } = this.state;
        return (
            <Mutation
                mutation={RESET_MUTATION}
                variables={{ resetToken: this.props.resetToken, password: this.state.password,
                 confirmPassword: this.state.confirmPassword }}
                 refetchQueries={[{ QUERY: CURRENT_USER_QUERY }]}
            >
                {(reset, { error, loading, called }) => {
                    return (
                        <Form onSubmit={evt => {this.onSubmit(evt, reset)}} method="post">
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Reset your Password.</h2>
                                <ErrorMessage error={error} />
                                <label htmlFor="reset-password">Email</label>
                                <input
                                    id="reset-password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    placeholder="password"
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="conf-password">Email</label>
                                <input
                                    id="conf-password"
                                    type="password"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    placeholder="confirm password"
                                    onChange={this.handleChange}
                                />
                                <button type="submit">Reset your password</button>
                            </fieldset>
                        </Form>
                    );
                }}
            </Mutation>
        );
    }
};

export default Reset;