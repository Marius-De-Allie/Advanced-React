import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    // resolvers: {  
    //   Mutation: {
    //   toggleCart(_, variables, { cache }) {
    //     // read the cartOpen val from cache.
    //     const { cartOpen } = cache.readQuery({
    //       query: LOCAL_STATE_QUERY
    //     });
    //     // Write cart state to opposite.
    //     const data = {
    //       data: { cartOpen: !cartOpen }
    //     };
    //   },
    // }},
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  //   // LOCAL DATA
    // clientState: {
    //   resolvers: {
    //     Mutation: {
    //       toggleCart(_, variables, { cache }) {
    //         // read the cartOpen val from cache.
    //         const { cartOpen } = cache.readQuery({
    //           query: LOCAL_STATE_QUERY
    //         });
    //         // Write cart state to opposite.
    //         const data = {
    //           data: { cartOpen: !cartOpen }
    //         };
    //       },
    //     }
    //   },
    //   defaults: {
    //     cartOpen: false
    //   }
    // },
  })
};

export default withApollo(createClient);

// resolvers: {
//   Mutation: {
//     toggleCart(_, variables, { cache }) {
//     // read the cart open val from cache.
//       const { cartOpen } = cache.readQuery({
//         query: LOCAL_STATE_QUERY
//       })
//       // WRITE CART STATE TO OPPOSITE.
//       const data = {
//         data: { cartOpen: !cartOpen }
//       };
//       cache.writeData(data);
//       return data;
//     },
//   },
// },