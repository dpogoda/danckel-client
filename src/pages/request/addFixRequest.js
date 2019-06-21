import React, { useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import TextField from '../../components/cowo/mobile/textfield/TextField';
import ButtonContainer from '../../components/cowo/mobile/button/ButtonContainer';
import Button from '../../components/cowo/mobile/button/Button';
import Margin from '../../components/cowo/mobile/margin/Margin';

const addFixRequest = ({ createFixRequest }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  return (
    <Margin>
      <h3>What`s broken?</h3>
      <p>{error}</p>
      <span>Please describe the location:</span>
      <TextField
        type="text"
        label="Location"
        placeholder="3rd floor red bathroom"
        onChange={value => setTitle(value)}
        maxLength="25"
      />
      <div style={{ margin: '38px' }} />
      <span>Please provide a short description of the problem:</span>
      <TextField
        multiline
        type="text"
        label="Message"
        placeholder="Light bulbs not working :("
        onChange={value => setText(value)}
        maxLength="140"
      />
      <ButtonContainer type="loose">
        <Button
          text="Send"
          loading={loading}
          onPress={() => {
            if (title.trim() !== '' && text.trim() !== '') {
              if (typeof window !== 'undefined') {
                setLoading(true);
                createFixRequest({ variables: { title, text } })
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
    </Margin>
  );
};

const createFixRequest = gql`
  mutation createFixRequest($title: String!, $text: String!) {
    createFixRequest(title: $title, text: $text) {
      id
    }
  }
`;

export default compose(graphql(createFixRequest, { name: 'createFixRequest' }))(
  addFixRequest,
);
