import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import {
  getBottomCoordinates,
  getLeftCoordinates,
  getRightCoordinates,
  getTopCoordinates
} from '../lib/coordinates';
import { isNumber } from '../lib/utils';

const Rectangle = ({ positions }) => {
  if (!isNumber(positions.clickX) || !isNumber(positions.clickY)) {
    return null;
  }
  return (
    <Fragment>
      <div
        className="perfect-zoom-top-border"
        style={getTopCoordinates(positions)}
      />
      <div
        className="perfect-zoom-right-border"
        style={getRightCoordinates(positions)}
      />
      <div
        className="perfect-zoom-bottom-border"
        style={getBottomCoordinates(positions)}
      />
      <div
        className="perfect-zoom-left-border"
        style={getLeftCoordinates(positions)}
      />
    </Fragment>
  );
};

Rectangle.propTypes = {
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    currentX: PropTypes.number,
    currentY: PropTypes.number
  })
};

export default React.memo(Rectangle);
