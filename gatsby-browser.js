import React from 'react';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import fetch from 'node-fetch';
import Layout from './src/components/layout';

const cache = new InMemoryCache();

/* eslint-disable */
const authLink = setContext((_, { headers, cache }) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});
/* eslint-disable */

const client = new ApolloClient({
  ssrMode: true,
  // defaultOptions,
  link: authLink.concat(
    new HttpLink({
      uri: process.env.GATSBY_APOLLO_ENDPOINT,
      fetch,
    }),
  ),
  cache,
});

export const onRouteUpdate = ({ location, prevLocation }) => {
  Layout.layoutRef.handleRouteChange(
    location.pathname,
    prevLocation ? prevLocation.pathname : null,
  );
};

// todo check mobility
/* eslint-disable import/prefer-default-export */
export const wrapRootElement = ({ element }) => (
  <Layout>
    <ApolloProvider client={client} style={{ flex: 1, display: 'flex' }}>
      {element}
    </ApolloProvider>
  </Layout>
);

/* eslint-disable import/prefer-default-export */
