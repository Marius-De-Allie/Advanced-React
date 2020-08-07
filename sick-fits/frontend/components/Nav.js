import React from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import Signout from './Signout';
import CartCount from './CartCount';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from './styles/NavStyles';
import User from './User';


const Nav = () => (
    <NavStyles>
        <User>
            {({ data: { me }} ) => {
                console.log(me)
                if(me) return <p>{me.name}</p>;
                return null;
;            }}
        </User>
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
            {(toggleCart) => 
            <button onClick={toggleCart}>
                My Cart
                <CartCount count={menubar.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
            </button>}
        </Mutation>
      </NavStyles>
);

export default Nav;