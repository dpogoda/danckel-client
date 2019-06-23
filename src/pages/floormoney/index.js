import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Margin from '../../components/cowo/mobile/margin/Margin';

const Floormoney = ({ remainingFloorMoney }) => (
  <Margin>
    <h3>Floor money</h3>
    {/* eslint-disable */}
    <p>Your floor has {remainingFloorMoney}€ left for this semester.</p>
    {/* eslint-disable */}
  </Margin>
);

const remainingFloorMoney = gql`
  query {
    remainingFloorMoney
  }
`;

export default () => (
  <Query
    query={remainingFloorMoney}
    fetchPoallFixRequestslicy="cache-and-network"
  >
    {({ data: { remainingFloorMoney: floorMoney }, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>An error occured. Please try to reload the page.</p>;
      return <Floormoney remainingFloorMoney={floorMoney} />;
    }}
  </Query>
);
