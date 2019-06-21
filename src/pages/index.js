import React, { useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import TextField from '../components/cowo/mobile/textfield/TextField';
import ButtonContainer from '../components/cowo/mobile/button/ButtonContainer';
import Button from '../components/cowo/mobile/button/Button';

const SignIn = ({ signIn }) => {
  const [roomnumber, setRoomnumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* eslint-disable */
  if (typeof window !== 'undefined' && window.localStorage.getItem('token')) {
    navigate('./request/');
  } else if (loading) {
    setLoading(false);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  /* eslint-disable */

  return (
    <div>
      <div>
        <h3 style={{ paddingLeft: '5vw' }}>Login</h3>
        <p style={{ paddingLeft: '5vw' }}>{error}</p>
        <div style={{ textAlign: 'center' }}>
          <TextField
            label="Room number"
            placeholder="e.g. 112"
            onChange={value => setRoomnumber(value)}
            type="number"
          />
          <TextField
            type="password"
            label="Password"
            placeholder=""
            onChange={value => setPassword(value)}
          />
        </div>
      </div>
      <div style={{ height: '2vh' }} />
      <ButtonContainer type="loose">
        <Button
          text="Sign In"
          loading={loading}
          onPress={() => {
            if (roomnumber !== '' && password !== '') {
              setLoading(true);
              signIn({
                variables: {
                  roomnumber: parseInt(roomnumber, 10),
                  password,
                },
              })
                .then(signInResult => {
                  setError('');
                  const {
                    data: {
                      signIn: { token, id, roles },
                    },
                  } = signInResult;
                  // save to localstorage
                  if (typeof window !== 'undefined') {
                    window.localStorage.setItem('token', token); // eslint-disable-line
                    window.localStorage.setItem('id', id); // eslint-disable-line
                    window.localStorage.setItem('roles', roles); // eslint-disable-line
                    navigate('./onboarding');
                  }
                })
                .catch(error => {
                  const errorMessage = _.get(error, 'message', '').split(
                    'GraphQL error: ',
                  );
                  if (errorMessage.length > 1) {
                    setError(errorMessage[1]);
                  }
                })
                .finally(() => setLoading(false));
            }
          }}
        />
      </ButtonContainer>
    </div>
  );
};

const signIn = gql`
  mutation signIn($roomnumber: Int!, $password: String!) {
    signIn(roomnumber: $roomnumber, password: $password) {
      id
      token
      roles
    }
  }
`;

export default compose(graphql(signIn, { name: 'signIn' }))(SignIn);
