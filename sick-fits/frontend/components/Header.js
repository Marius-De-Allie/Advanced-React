import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';
import { SearchStyles } from './styles/DropDown';

const Header = () => (
    <div>
        <div className="bar">
            <Link href="">
                <a>Sick Fits</a>
            </Link>
           <Nav />
        </div>
        <div className="sub-bar">
            <Search />
        </div>
       {/* <Cart /> */}
    </div>
);

export default Header;