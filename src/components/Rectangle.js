import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import {
  getTopCoordinates,
  getRightCoordinates,
  getBottomCoordinates,
  getLeftCoordinates
} from '../lib/rectangleCoordinates';
import { isNumber } from '../lib/utils';

const Rectangle = ({ positions, rectangleStyles }) => {
  if (!isNumber(positions.clickX) || !isNumber(positions.clickY)) {
    return null;
  }
  return (
    <Fragment>
      <div
        className="perfect-zoom-top-border"
        style={getTopCoordinates(positions, rectangleStyles)}
      />
      <div
        className="perfect-zoom-right-border"
        style={getRightCoordinates(positions, rectangleStyles)}
      />
      <div
        className="perfect-zoom-bottom-border"
        style={getBottomCoordinates(positions, rectangleStyles)}
      />
      <div
        className="perfect-zoom-left-border"
        style={getLeftCoordinates(positions, rectangleStyles)}
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
