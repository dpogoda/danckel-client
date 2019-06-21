import React from 'react';

const Button = ({ text, onPress }) => (
  <button
    type="submit"
    style={{
      width: '100%',
      height: '100%',
      color: 'black',
      backgroundColor: 'white',
      borderRadius: 20,
      border: 'none'
    }}
    onClick={() => {
      onPress();
    }}
  >
    <span style={{ fontWeight: 'bold' }}>{text}</span>
  </button>
);

export default Button;
