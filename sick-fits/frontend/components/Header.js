import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';
import { SearchStyles } from './styles/DropDown';

Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};
Router.onRouteChangeError = () => {
    NProgress.done();
};
const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    a {
        padding: 05rem 1rem;
        background-color: ${props => props.theme.red};
        color: white;
        text-transform: uppercase;
    }
    @media (max-width: 1300px) {
        margin: 0;
        text-align: center;
    }
`;

const StyledHeader = styled.header`
    .bar {
        border-bottom: 10px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width: ${props => props.theme.breakPoint}) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }
    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightgrey};
    }
`;
const Header = () => {
    
    const [cartOpen, setCartOpen] = useState(false);
    console.log(cartOpen)

    const handleToggle = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <StyledHeader>
            <div className="bar">
                <logo>
                    <Link href="/">
                        <a>Sick Fits</a>
                    </Link>
                </logo>
                <Nav toggleCart={handleToggle} />
            </div>
            <div className="sub-bar">
                <Search />
            </div>
            <Cart toggleCart={handleToggle} isOpen={cartOpen} />
        </StyledHeader>
    );
};

export default Header;