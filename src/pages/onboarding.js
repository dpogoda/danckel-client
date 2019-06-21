import React, { useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import TextField from '../components/cowo/mobile/textfield/TextField';
import ButtonContainer from '../components/cowo/mobile/button/ButtonContainer';
import Button from '../components/cowo/mobile/button/Button';
import Margin from '../components/cowo/mobile/margin/Margin';

const Onboarding = ({ updateUsername }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Margin>
      <h2>Welcome!</h2>
      <p>{error}</p>
      <div>
        <span>What`s your name?</span>
        <TextField
          type="text"
          label="Name"
          placeholder=""
          onChange={value => setUsername(value)}
          maxLength="20"
        />
        <Margin />
        <ButtonContainer type="loose">
          <Button
            text="Let's Go!"
            loading={loading}
            onPress={() => {
              if (username.trim() !== '') {
                if (typeof window !== 'undefined') {
                  updateUsername({ variables: { username } })
                    .then(() => navigate('./request'))
                    .catch(error_ => {
                      const errorMessage = _.get(error_, 'message', '').split(
                        'GraphQL error: ',
                      );
                      if (errorMessage.length > 1) {
                        setError(errorMessage[1]);
                      }
                    })
                    .finally(() => setLoading(false));
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
