import React, { useState } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import moment from 'moment';
import _ from 'lodash';
import styles from './request.module.css';

const Request = ({
  title,
  text,
  state,
  isOwn,
  likeFixRequest,
  unlikeFixRequest,
  deleteFixRequest,
  openFixRequest,
  closeFixRequest,
  id,
  onDelete,
  createdAt,
  username,
  likes,
}) => {
  const [requestState, setRequestState] = useState(state);
  const [likesState, setLikesState] = useState(likes);
  const [likeLoading, setLikeLoading] = useState(false);
  const createdAtFormatted = moment(createdAt).format('DD.MM.YYYY');

  return (
    <div
      style={{
        width: '90vw',
        backgroundColor: 'white',
        alignSelf: 'center',
        color: 'black',
        padding: '2vw',
        borderRadius: '1vw',
        marginTop: '1vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: 'lightgrey' }}>{username}</span>
        <span />
        <span style={{ color: 'black' }}>{createdAtFormatted}</span>
      </div>
      <div style={{ margin: '10px' }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ color: 'black', width: '100%' }}>
          <span style={{ fontWeight: 'bold' }}>{title}</span>
          <br />
          <span>{text}</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            textAlign: 'center',
            width: `50px`,
          }}
        >
          <button
            type="submit"
            disabled={likeLoading}
            onClick={() => {
              setLikeLoading(true);
              likeFixRequest({ variables: { id } }).then(result => {
                const {
                  data: {
                    likeFixRequest: { likes: likesResult, dislikes },
                  },
                } = result;
                if (likesResult && dislikes) {
                  setLikesState(likesResult.length - dislikes.length);
                }
                setLikeLoading(false);
              });
            }}
            style={{ border: 'none', background: 'none' }}
          >
            <div className={styles.arrowUp} />
          </button>
          <span style={{ textAlign: 'center' }}>{likesState}</span>
          <button
            type="submit"
            disabled={likeLoading}
            onClick={() => {
              setLikeLoading(true);
              unlikeFixRequest({ variables: { id } }).then(result => {
                const {
                  data: {
                    unlikeFixRequest: { likes: likesResult, dislikes },
                  },
                } = result;
                if (likesResult && dislikes) {
                  setLikesState(likesResult.length - dislikes.length);
                }
                setLikeLoading(false);
              });
            }}
            style={{ border: 'none', background: 'none' }}
          >
            <div className={styles.arrowDown} />
          </button>
        </div>
      </div>
      <div style={{ margin: '10px' }} />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              border: 'solid',
              paddingLeft: '1vw',
              paddingRight: '1vw',
              borderColor: requestState === 'OPEN' ? 'orange' : 'green',
              borderRadius: '5px',
              color: requestState === 'OPEN' ? 'orange' : 'green',
            }}
          >
            {typeof requestState !== 'undefined' && requestState.toLowerCase()}
          </span>
          {isOwn ? (
            <button
              onClick={() => {
                if (requestState === 'OPEN') {
                  closeFixRequest({ variables: { id } }).then(result => {
                    const {
                      data: { closeFixRequest: success },
                    } = result;
                    if (success) {
                      setRequestState('SOLVED');
                    }
                  });
                } else if (requestState === 'SOLVED') {
                  openFixRequest({ variables: { id } }).then(result => {
                    const {
                      data: { openFixRequest: success },
                    } = result;
                    if (success) {
                      setRequestState('OPEN');
                    }
                  });
                }
              }}
              type="submit"
              style={{ background: 'none', border: 'none' }}
            >
              {requestState === 'OPEN' ? 'Mark as solved' : 'Reopen'}
            </button>
          ) : null}
          <div />
        </div>
        {isOwn ? (
          <button
            type="submit"
            style={{ background: 'none', border: 'none' }}
            onClick={() => {
              if (typeof window !== 'undefined') {
                /* eslint-disable */
                const yes = confirm(
                  'Do you really want to delete the request?',
                );
                /* eslint-disable */
                if (yes) {
                  // delete
                  deleteFixRequest({ variables: { id } }).then(result => {
                    const {
                      data: { deleteFixRequest: success },
                    } = result;
                    if (success) {
                      onDelete();
                    }
                  });
                }
              }
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

const closeFixRequest = gql`
  mutation closeFixRequest($id: String!) {
    closeFixRequest(fixRequestId: $id) {
      id
    }
  }
`;

const openFixRequest = gql`
  mutation openFixRequest($id: String!) {
    openFixRequest(fixRequestId: $id) {
      id
    }
  }
`;

const deleteFixRequest = gql`
  mutation deleteFixRequest($id: String!) {
    deleteFixRequest(fixRequestId: $id)
  }
`;

const likeFixRequest = gql`
  mutation likeFixRequest($id: String!) {
    likeFixRequest(fixRequestId: $id) {
      likes {
        id
      }
      dislikes {
        id
      }
    }
  }
`;

const unlikeFixRequest = gql`
  mutation unlikeFixRequest($id: String!) {
    unlikeFixRequest(fixRequestId: $id) {
      likes {
        id
      }
      dislikes {
        id
      }
    }
  }
`;

export default compose(
  graphql(deleteFixRequest, { name: 'deleteFixRequest' }),
  graphql(closeFixRequest, { name: 'closeFixRequest' }),
  graphql(openFixRequest, { name: 'openFixRequest' }),
  graphql(likeFixRequest, { name: 'likeFixRequest' }),
  graphql(unlikeFixRequest, { name: 'unlikeFixRequest' }),
)(Request);
