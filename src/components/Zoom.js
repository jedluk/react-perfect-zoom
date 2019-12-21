import React from 'react';
import { cropImage } from '../lib/coordinates';
import { isElement } from '../lib/utils';

// zoom container should has absolute position??
const Zoom = ({ source, imgRef, positions }) => (
  <>
    {isElement(imgRef.current) && (
      <div className="zoom-container">
        <img
          src={source}
          alt="realimage"
          style={cropImage(imgRef.current, positions)}
        />
      </div>
    )}
  </>
);

export default React.memo(Zoom);
