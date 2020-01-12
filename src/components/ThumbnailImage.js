import React from 'react';

export default React.forwardRef(({ thumbnail, events }, ref) => (
  <img
    alt="thumbnail"
    ref={ref}
    src={thumbnail.url}
    style={{
      maxHeight: thumbnail.size[0],
      maxWidth: thumbnail.size[1]
    }}
    {...events}
  />
));
