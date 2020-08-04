import React from 'react';
import Link from 'next/link';
import Signout from './Signout';

const Nav = () => (
    <div>
        <Link href="/sell">
            <a>Sell!</a>
        </Link>
        <Link href="/">
            <a>Home!</a>
        </Link>
        <Link href="/items">
            <a>Shop</a>
        </Link>
        <Link href="/signup">
            <a>SignUp</a>
        </Link>
        <Signout />
      </div>
);

export default Nav;