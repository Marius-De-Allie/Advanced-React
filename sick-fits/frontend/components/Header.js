import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';
import { SearchStyles } from './styles/DropDown';

const Header = () => {
    
    const [cartOpen, setCartOpen] = useState(false);
    console.log(cartOpen)

    const handleToggle = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <div>
            <div className="bar">
                <Link href="">
                    <a>Sick Fits</a>
                </Link>
            <Nav toggleCart={handleToggle} />
            </div>
            <div className="sub-bar">
                <Search />
            </div>
        <Cart toggleCart={handleToggle} isOpen={cartOpen} />
        </div>
    );
};

export default Header;