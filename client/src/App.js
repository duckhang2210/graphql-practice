import React from 'react';
import ApolloClient from 'apollo-boost';

import BookList from './components/BookList';

//Apollo set up
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <div id='main'>
      <h1>Reading List</h1>
      <BookList />
    </div>
  );
}

export default App;
