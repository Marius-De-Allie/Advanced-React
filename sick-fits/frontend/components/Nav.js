import React from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import Signout from './Signout';
import { TOGGLE_CART_MUTATION } from './Cart';


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
        <Mutation mutation={TOGGLE_CART_MUTATION}>
            {(toggleCart) => <button>My Cart</button>}
        </Mutation>
      </div>
);

export default Nav;