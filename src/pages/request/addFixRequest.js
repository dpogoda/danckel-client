import React, { useState } from 'react';
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
  return (
    <Margin>
      <h3>What's broken?</h3>
      <span>Please describe the location:</span>
      <TextField
        type="text"
        label="Location"
        placeholder="3rd floor red bathroom"
        onChange={value => setTitle(value)}
      />
      <div style={{ margin: '38px' }} />
      <span>Please provide a short description of the problem:</span>
      <TextField
        multiline={true}
        type="text"
        label="Message"
        placeholder="Light bulbs not working :("
        onChange={value => setText(value)}
      />
      <ButtonContainer type="loose">
        <Button
          text="Send"
          onPress={() => {
            if (title !== '' && text !== '') {
              if (typeof window !== 'undefined') {
                createFixRequest({ variables: { title, text } }).then(() =>
                  navigate('./request'),
                );
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
