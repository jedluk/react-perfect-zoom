import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { areValidPositions, getContainerPosition } from '../lib/placement';
import { cropImage } from '../lib/crop';
import Canvas from './Canvas';
import { isObject } from '../lib/utils';

const Zoom = ({ source, allowDownload, imgRef, ...placementProps }) => (
  <Fragment>
    {isObject(imgRef) && imgRef.current && areValidPositions(placementProps.positions) && (
      <div
        className="perfect-zoom-container"
        style={getContainerPosition({ ...placementProps, img: imgRef.current })}
      >
        {allowDownload && (
          <Canvas image={imgRef.current} positions={placementProps.positions} />
        )}
        <img
          src={source}
          alt="realImage"
          style={cropImage(imgRef.current, placementProps.positions)}
        />
      </div>
    )}
  </Fragment>
);

Zoom.propTypes = {
  source: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
  align: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
  imgRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  }),
  translate: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  margin: PropTypes.number
};

export default React.memo(Zoom);
