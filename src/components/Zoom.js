import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { cropImage, getZoomContainerDistance } from '../lib/coordinates';
import { isElement } from '../lib/utils';

const Zoom = ({ source, imgRef, placement, positions }) => (
  <Fragment>
    {isElement(imgRef.current) && (
      <div
        className="perfect-zoom-container"
        style={{
          [placement]: getZoomContainerDistance(imgRef.current, positions) - 20
        }}
      >
        <img
          src={source}
          alt="realImage"
          style={cropImage(imgRef.current, positions)}
        />
      </div>
    )}
  </Fragment>
);

Zoom.propTypes = {
  source: PropTypes.string,
  imgRef: PropTypes.object,
  placement: PropTypes.oneOf(['left', 'right']),
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  })
};

export default React.memo(Zoom);
