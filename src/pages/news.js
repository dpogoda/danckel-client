import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Margin from '../components/cowo/mobile/margin/Margin';

const News = ({ news }) => (
  <Margin>
    <h3>News</h3>
    <p>Here you see the news provided by the SV.</p>
    {news && news.length ? (
      news.map(n => (
        <div
          key={n.id}
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
          <div style={{ margin: '10px' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ color: 'black', width: '100%' }}>
              <span style={{ fontWeight: 'bold' }}>{n.title}</span>
              <br />
              <span style={{ color: 'grey' }}>{n.text}</span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>Currently there are no news.</p>
    )}
  </Margin>
);

const allNews = gql`
  query {
    allNews {
      id
      createdAt
      updatedAt
      title
      text
    }
  }
`;

export default () => (
  <Query query={allNews} fetchPolicy="cache-and-network">
    {({ data: { allNews: news }, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>An error occured. Please try to reload the page.</p>;

      const news2 = news.sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
      return <News news={news2} />;
    }}
  </Query>
);
