import React from 'react';

const width = typeof window !== 'undefined' ? window.innerWidth - 50 : 200; // eslint-disable-line
const maxWidth = 200;
const maxHeight = 50;
const height =
  width < maxWidth
    ? Math.min(width / 10, maxHeight)
    : Math.min(width / 10, maxHeight);

const ButtonContainer = ({ children, type }) => (
  <div
    style={{
      position: type === 'loose' ? 'relative' : 'absolute',
      bottom: 0,
      width: '100%',
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
        paddingRight: '2vw',
      }}
    >
      {children.map ? (
        children.map(button => (
          <div
            style={{
              width: `${width / children.length}px`,
              height: `${height}px`,
              maxWidth: `${maxWidth}px`,
            }}
          >
            {button}
          </div>
        ))
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: `${maxWidth}px`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  </div>
);

export default ButtonContainer;
