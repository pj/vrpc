import ApolloClient from 'apollo-boost';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});


import { gql } from "apollo-boost";
client
  .query({
    query: gql`
    {
      courses {
        title
      }
    }`
  })
  .then(result => console.log(result));

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
