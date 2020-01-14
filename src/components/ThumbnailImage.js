import React from 'react';

export default React.forwardRef(({ thumbnailURL, size, events, cursorNone, handleLoad }, ref) => (
  <img
    alt="thumbnail"
    ref={ref}
    src={thumbnailURL}
    style={{
      maxHeight: size[0],
      maxWidth: size[1],
      cursor: cursorNone ? 'none' : 'crosshair'
    }}
    {...events}
    {...(typeof handleLoad === 'function' && {
      onLoad: handleLoad
    })}
  />
));
