import React, { Fragment } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import Signout from './Signout';
import CartCount from './CartCount';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from './styles/NavStyles';
import User from './User';


const Nav = () => (
        <User>
            {({ data: { me }} ) => (
                <NavStyles>
                    <Link href="/items">
                        <a>Shop</a>
                    </Link>
                    {me && (
                        <Fragment>
                            <Link href="/sell">
                                <a>Sell!</a>
                            </Link>
                            <Link href="/orders">
                                <a>Orders</a>
                            </Link>
                            <Link href="/me">
                                <a>Account</a>
                            </Link>
                            <Signout />
                        </Fragment>
                    )}
                    {!me && (
                        <Link href="/signup">
                            <a>SignIn</a>
                        </Link>
                    )}
                    <Mutation mutation={TOGGLE_CART_MUTATION}>
                        {(toggleCart) => 
                        <button onClick={toggleCart}>
                            My Cart
                            <CartCount count={menubar.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
                        </button>}
                    </Mutation>
                </NavStyles>
            )}
        </User>
);

export default Nav;