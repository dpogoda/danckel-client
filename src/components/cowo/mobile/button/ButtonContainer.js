import React from 'react';

const ButtonContainer = ({ children, type }) => (
  <div
    style={{
      position: type === 'loose' ? 'relative' : 'absolute',
      bottom: 0,
      height: '15vh',
      width: '100vw'
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        paddingLeft: '2vw',
        paddingRight: '2vw'
      }}
    >
      {children.map ? (
        children.map(button => (
          <div style={{ width: `${94 / children.length}vw`, height: '6vh' }}>
            {button}
          </div>
        ))
      ) : (
        <div style={{ width: `${60}vw`, height: '5vh' }}>{children}</div>
      )}
    </div>
  </div>
);

export default ButtonContainer;
