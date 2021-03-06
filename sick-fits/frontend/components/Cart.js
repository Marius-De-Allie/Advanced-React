import React from 'react';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import calcTotalPrice  from '../lib/calcTotalPrice';
import formatMoney  from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';

// const LOCAL_STATE_QUERY = gql`
//     query LOCAL_STATE_QUERY {
//         # this is client side date don't go to graphql api for this.
//         cartOpen @client
//     }
// `;

// const TOGGLE_CART_MUTATION = gql`
//     mutation TOGGLE_CART_MUTATION {
//         toggleCart @client
//     }
// `;

// const Composed = adopt({
//     user: ({ render }) => <User>{render}</User>,
//     toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
//     localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
// });

const Cart = props => {
    return (
        <User>
            {({ data: { me } }) => {
                if(!me) return null;
                console.log(me);
                return (
                    <CartStyles open={props.isOpen}>
                        <header>
                            <CloseButton title="close" onClick={props.toggleCart}>&times;</CloseButton>
                            <Supreme>{me.name}'s Cart</Supreme>
                            <p>
                                You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart.
                            </p>
                        </header>
                        <ul>
                            {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
                        </ul>
                        <footer>
                            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                            {me.cart.length && (
                                <TakeMyMoney>
                                    <SickButton>Checkout</SickButton>
                                </TakeMyMoney>
                            )}
                        </footer>
                    </CartStyles>
                )}
            }
        </User>
    );
};

export { Cart as default/*, LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION */};
// const Cart = props => {
//     return (
//         <User>
//             {({ data: { me } }) => {
//                 if(!me) return null;
//                 console.log(me);
//                 return (
//                     <Mutation mutation={TOGGLE_CART_MUTATION}>
//                         {(toggleCart) => (
//                             <Query query={LOCAL_STATE_QUERY}>
//                                 {({ data }) => {
//                                     console.log(data);
//                                     return (
//                                         <CartStyles open={data.cartOpen}>
//                                             <header>
//                                                 <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
//                                                 <Supreme>{me.name}'s Cart</Supreme>
//                                                 <p>
//                                                     You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart.
//                                                 </p>
//                                             </header>
//                                             <ul>
//                                                 {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
//                                             </ul>
//                                             <footer>
//                                                 <p>{formatMoney(calcTotalPrice(me.cart))}</p>
//                                                 {me.cart.length && (
//                                                     <TakeMyMoney><SickButton>Checkout</SickButton></TakeMyMoney>
//                                                 )}
//                                             </footer>
//                                         </CartStyles>
//                                     );
//                                 }}
//                             </Query>
//                         )}
//                     </Mutation>
//                 );
//             }}
//         </User>
//     );
// };
// return (
//     <Composed>
//         {({ user, toggleCart, localState }) => {
//             const { me } = user.data;
//             if(!me) return null;
//             return (
//                 <CartStyles open={localState.data.cartOpen}>
//                     <header>
//                         <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
//                         <Supreme>Your Cart</Supreme>
//                         <p>You Have  __ Items in your cart.</p>
//                     </header>
//                     <ul>
//                         {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
//                     </ul>
//                     <footer>
//                         <p>{formatMoney(calcTotalPrice(me.cart))}</p>
//                         {me.cart.length && (
//                             <TakeMyMoney><SickButton>Checkout</SickButton></TakeMyMoney>
//                         )}
//                     </footer>
//                 </CartStyles>
//             );
//         }}
//     </Composed>
// );