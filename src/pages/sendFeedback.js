import React, { useState } from 'react';
import _ from 'lodash';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import TextField from '../components/cowo/mobile/textfield/TextField';
import ButtonContainer from '../components/cowo/mobile/button/ButtonContainer';
import Button from '../components/cowo/mobile/button/Button';
import Margin from '../components/cowo/mobile/margin/Margin';

const SendFeedback = ({ sendFeedback }) => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  return (
    <Margin>
      <h3>Send Feedback</h3>
      <p>{error}</p>
      <span>
        Feel free to send us feedback if you have ideas for new features, want
        to get things improved or whatever :)
      </span>
      <TextField
        multiline
        type="text"
        label="Feedback"
        placeholder="Your Feedback"
        onChange={value => setFeedback(value)}
        maxLength="1500"
      />
      <ButtonContainer type="loose">
        <Button
          text="Send"
          loading={loading}
          onPress={() => {
            if (feedback.trim() !== '') {
              if (typeof window !== 'undefined') {
                setLoading(true);
                sendFeedback({ variables: { feedback } })
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
            }
          }}
        />
      </ButtonContainer>
    </Margin>
  );
};

const sendFeedback = gql`
  mutation sendFeedback($feedback: String!) {
    sendFeedback(feedback: $feedback)
  }
`;

export default compose(graphql(sendFeedback, { name: 'sendFeedback' }))(
  SendFeedback,
);
