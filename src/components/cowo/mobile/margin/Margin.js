import React from 'react';

const Margin = ({ children, all }) => (
  <div style={{ margin: all ? `${all}px` : `20px` }}>{children}</div>
);

export default Margin;
