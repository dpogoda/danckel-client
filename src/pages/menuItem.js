import React from 'react';
import { navigate } from 'gatsby';

const MenuItem = ({ title, description, navigateTo }) => (
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
    <button
      type="submit"
      style={{
        border: 'none',
        background: 'none',
        textAlign: 'left',
        margin: 0,
      }}
      onClick={() => navigate(navigateTo)}
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
          <span style={{ fontWeight: 'bold' }}>{title}</span>
          <br />
          <span style={{ color: 'grey' }}>{description}</span>
        </div>
      </div>
    </button>
  </div>
);

export default MenuItem;
