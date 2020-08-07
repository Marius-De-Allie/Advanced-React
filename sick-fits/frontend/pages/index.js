import React from 'react';
// Import Items Comp.
import Items from '../components/Items';
// import Item from '../components/Item';

const Home = ({ query }) => (
    <div>
      TEST
      <Items page={parseFloat(query.page) || 1} /> 
    </div>
);

export default Home;


{/* <Items page={parseFloat(query.page) || 1} /> */}