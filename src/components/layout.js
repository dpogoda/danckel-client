import React from 'react';
import PropTypes from 'prop-types';
import './layout.css';

const Layout = ({ children }) => (
  <div>
    {/* {typeof window !== 'undefined' && !window.location.href.includes('maps') ? ( // eslint-disable-line
      <p>Cowo</p>
    ) : null} */}
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
