import React from 'react';
import Link from 'next/link';
import Nav from './Nav';
import Cart from './Cart';

const Header = () => (
    <div>
        <div className="bar">
            <Link href="">
                <a>Sick Fits</a>
            </Link>
            <Nav />
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <Cart />
    </div>
);

export default Header;