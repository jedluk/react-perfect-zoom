import React from 'react';

export default React.forwardRef(
  ({ thumbnailURL, events, cursorNone, handleLoad, size = [] }, ref) => (
    <img
      alt="thumbnail"
      ref={ref}
      src={thumbnailURL}
      style={{
        maxHeight: size[0] || 300,
        maxWidth: size[1] || 500,
        cursor: cursorNone ? 'none' : 'crosshair'
      }}
      {...events}
      {...(typeof handleLoad === 'function' && {
        onLoad: handleLoad
      })}
    />
  )
);
