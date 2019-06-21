import React from 'react';

const Button = ({ text, onPress, loading }) => (
  <button
    type="submit"
    style={{
      width: '100%',
      height: '100%',
      color: 'black',
      backgroundColor: loading ? 'lightgrey' : 'white',
      borderRadius: 20,
      border: 'none',
    }}
    onClick={() => {
      if (!loading) {
        onPress();
      }
    }}
  >
    <span style={{ fontWeight: 'bold' }}>{text}</span>
  </button>
);

export default Button;
