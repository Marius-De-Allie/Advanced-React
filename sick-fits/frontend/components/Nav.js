import React from 'react';
import Link from 'next/link';

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
      </div>
);

export default Nav;