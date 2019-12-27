import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { withTranslation, getPlacementFunction } from '../lib/placement';
import { cropImage } from '../lib/crop';
import { isElement } from '../lib/utils';

const Zoom = ({ source, imgRef, placement, positions, translate }) => (
  <Fragment>
    {isElement(imgRef.current) && (
      <div
        className="perfect-zoom-container"
        style={withTranslation(translate)(
          getPlacementFunction(placement)(imgRef.current, positions)
        )}
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
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  })
};

export default React.memo(Zoom);
