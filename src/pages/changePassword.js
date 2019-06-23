import React, { useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import TextField from '../components/cowo/mobile/textfield/TextField';
import ButtonContainer from '../components/cowo/mobile/button/ButtonContainer';
import Button from '../components/cowo/mobile/button/Button';
import Margin from '../components/cowo/mobile/margin/Margin';

const ChangePassword = ({ changePassword }) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  return (
    <Margin>
      <h3>ChangePassword</h3>
      <p>{error}</p>
      <span>Please enter your new password:</span>
      <TextField
        type="password"
        label="Password"
        placeholder="password"
        onChange={value => setPassword(value)}
        maxLength="100"
      />
      <div style={{ margin: '38px' }} />
      <span>Please repeat your new password:</span>
      <TextField
        type="password"
        label="Repeated password"
        placeholder="password"
        onChange={value => setPassword2(value)}
        maxLength="100"
      />
      <ButtonContainer type="loose">
        <Button
          text="Send"
          loading={loading}
          onPress={() => {
            if (password.length < 8) {
              setError('Your password needs at least 8 characters');
            } else if (password !== password2) {
              setError('Your entered passwords do not match');
            } else {
              setLoading(true);
              changePassword({ variables: { password } })
                .then(() => navigate('./settings'))
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
          }}
        />
      </ButtonContainer>
    </Margin>
  );
};

const changePassword = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password)
  }
`;

export default compose(graphql(changePassword, { name: 'changePassword' }))(
  ChangePassword,
);
