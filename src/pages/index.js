import React, { useState } from 'react';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import TextField from '../components/cowo/mobile/textfield/TextField';
import ButtonContainer from '../components/cowo/mobile/button/ButtonContainer';
import Button from '../components/cowo/mobile/button/Button';

const SignIn = ({ signIn }) => {
  const [roomnumber, setRoomnumber] = useState('');
  const [password, setPassword] = useState('');

  /* eslint-disable */
  if (typeof window !== 'undefined' && window.localStorage.getItem('token')) {
    navigate('./request/');
  }
  /* eslint-disable */

  return (
    <div>
      <div>
        <h3 style={{ paddingLeft: '5vw' }}>Login</h3>
        <div style={{ textAlign: 'center' }}>
          <TextField
            label="Room number"
            placeholder="e.g. 112"
            onChange={value => setRoomnumber(value)}
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
          onPress={() => {
            if (roomnumber !== '' && password !== '') {
              signIn({
                variables: {
                  roomnumber: parseInt(roomnumber, 10),
                  password,
                },
              })
                .catch(error => {
                  console.log(error);
                })
                .then(signInResult => {
                  const {
                    data: {
                      signIn: { token, id },
                    },
                  } = signInResult;
                  // save to localstorage
                  if (typeof window !== 'undefined') {
                    window.localStorage.setItem('token', token); // eslint-disable-line
                    window.localStorage.setItem('id', id); // eslint-disable-line
                    navigate('./onboarding');
                  }
                });
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
    }
  }
`;

export default compose(graphql(signIn, { name: 'signIn' }))(SignIn);
