import React from 'react';
import styled from 'styled-components';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';
// for testing only, need ot remove
import Cart from '../components/Cart';
const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
`;


const SignupPage = props => (
    <Columns>
        <Cart />
        <Signup />
        <Signin />
        <RequestReset />
    </Columns>
);

export default SignupPage;