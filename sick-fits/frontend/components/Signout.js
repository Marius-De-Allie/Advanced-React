import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// TODO add CURRENT_USER_MUTATION when it's created.

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
        signout {
            message
        }
    }
`;

const Signout = props => (
    <Mutation 
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
        {(signout) => <button onClick={signout}>SignOut</button>}
    </Mutation>
);

export default Signout;