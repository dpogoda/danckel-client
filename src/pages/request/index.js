import React, { useState } from 'react';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ButtonContainer from '../../components/cowo/mobile/button/ButtonContainer';
import Button from '../../components/cowo/mobile/button/Button';
import Margin from '../../components/cowo/mobile/margin/Margin';
import Request from './request';

const Requests = ({ fixRequests }) => {
  const [requests, setRequests] = useState(fixRequests);

  /* eslint-disable */
  const myId = typeof window !== 'undefined' && localStorage.getItem('id');
  const myRoles =
    typeof window !== 'undefined' && localStorage.getItem('roles');
  /* eslint-disable */
  return (
    <div>
      <h3 style={{ paddingLeft: '5vw' }}>Fix Requests</h3>
      <ButtonContainer type="loose">
        <Button
          text="Add new fix request"
          onPress={() => {
            navigate('./request/addFixRequest');
          }}
        />
      </ButtonContainer>
      <Margin />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {fixRequests &&
          fixRequests.map(request => (
            <Request
              key={request.id}
              createdAt={request.createdAt}
              title={request.title}
              text={request.text}
              id={request.id}
              isOwn={request.author.id === myId || myRoles.includes('SV')}
              state={request.state}
              username={request.author.username}
              likes={request.likes ? request.likes.length : 0}
              onDelete={() => {
                const index = requests.findIndex(x => x.id === request.id);
                const newRequestArray = fixRequests.splice(index, 1);
                setRequests(newRequestArray);
              }}
            />
          ))}
        <Margin />
      </div>
    </div>
  );
};
const allFixRequestsQuery = gql`
  query {
    allFixRequests {
      createdAt
      id
      title
      text
      likes {
        id
      }
      author {
        id
        username
      }
      state
    }
  }
`;

export default () => (
  <Query
    query={allFixRequestsQuery}
    fetchPoallFixRequestslicy="cache-and-network"
  >
    {({ data: { allFixRequests }, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>An error occured. Please try to reload the page.</p>;

      const fixRequests = allFixRequests.sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
      console.log(fixRequests);
      return <Requests fixRequests={fixRequests} />;
    }}
  </Query>
);
