import React, { useState } from 'react';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import TextField from '../components/cowo/mobile/textfield/TextField';
import ButtonContainer from '../components/cowo/mobile/button/ButtonContainer';
import Button from '../components/cowo/mobile/button/Button';
import Margin from '../components/cowo/mobile/margin/Margin';

const Onboarding = ({ updateUsername }) => {
  const [username, setUsername] = useState('');
  return (
    <Margin>
      <h2>Welcome!</h2>
      <div>
        <span>What's your name?</span>
        <TextField
          type="text"
          label="Name"
          placeholder=""
          onChange={value => setUsername(value)}
        />
        <ButtonContainer type="loose">
          <Button
            text="Let's Go!"
            onPress={() => {
              if (username !== '') {
                if (typeof window !== 'undefined') {
                  updateUsername({ variables: { username } }).then(() =>
                    navigate('./request'),
                  );
                }
              }
            }}
          />
        </ButtonContainer>
      </div>
    </Margin>
  );
};

const updateUsername = gql`
  mutation updateUsername($username: String!) {
    updateUsername(username: $username) {
      id
    }
  }
`;

export default compose(graphql(updateUsername, { name: 'updateUsername' }))(
  Onboarding,
);
