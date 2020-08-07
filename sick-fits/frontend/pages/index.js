import React from 'react';
// Import Items Comp.
import Items from '../components/Items';
import { Query } from 'react-apollo';
// import Item from '../components/Item';

const Home = ({ query }) => {
  return (
    <div>
      <Items page={parseFloat(query.page) || 1} /> 
    </div>
  );
}

export default Home;


{/* <Items page={parseFloat(query.page) || 1} /> */}