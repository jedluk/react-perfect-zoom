import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import {
  withTranslation,
  getPlacementFunction,
  areValidPositions
} from '../lib/placement';
import { cropImage } from '../lib/crop';
import { getProperty } from '../lib/utils';
import Canvas from './Canvas';

const Zoom = ({
  imgRef,
  source,
  translate,
  allowDownload,
  placement = 'right',
  margin = 20,
  positions = {}
}) => (
  <Fragment>
    {!!getProperty(imgRef, 'current', null) && areValidPositions(positions) && (
      <div
        className="perfect-zoom-container"
        style={withTranslation(translate)(
          getPlacementFunction(placement)(imgRef.current, positions, margin)
        )}
      >
        {allowDownload && <Canvas image={imgRef.current} positions={positions} />}
        <img src={source} alt="realImage" style={cropImage(imgRef.current, positions)} />
      </div>
    )}
  </Fragment>
);

Zoom.propTypes = {
  source: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
  imgRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
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
