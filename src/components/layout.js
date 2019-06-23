import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './layout.css';
import { navigate } from 'gatsby';

const Layout = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (
      /* eslint-disable */
      typeof window !== 'undefined' &&
      localStorage.getItem('token') &&
      !window.location.href.includes('settings') &&
      !window.location.href.includes('onboarding')
      /* eslint-disable */
    ) {
      setShowSettings(true);
    }
  });

  return (
    <div>
      {/* {typeof window !== 'undefined' && !window.location.href.includes('maps') ? ( // eslint-disable-line
      <p>Cowo</p>
    ) : null} */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: `5px`,
        }}
      >
        {typeof window !== 'undefined' &&
        !window.location.href.includes('onboarding') &&
        !window.location.href.includes('main') ? (
          <button
            type="submit"
            style={{
              border: 'none',
              background: 'none',
              color: 'white',
              marginLeft: '10px',
            }}
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back();
              }
            }}
          >
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
        {showSettings ? (
          <button
            type="submit"
            style={{
              border: 'none',
              background: 'none',
              color: 'white',
              marginRight: `10px`,
            }}
            onClick={() => {
              navigate('/settings');
            }}
          >
            <span>Settings</span>
          </button>
        ) : null}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <h2 style={{ paddingTop: '2vh' }}>DanckelApp</h2>
      </div>
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
