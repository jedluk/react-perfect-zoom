import React, { Fragment } from 'react';
import {
  getBottomCoordinates,
  getLeftCoordinates,
  getRightCoordinates,
  getTopCoordinates
} from '../lib/coordinates';
import { isNumber } from '../lib/utils';

const Rectangle = ({ positions: { clickX, clickY, currentX, currentY } }) => {
  if (!isNumber(clickX) || !isNumber(clickY)) {
    return null;
  }
  return (
    <Fragment>
      <div
        className="zoom-top-border"
        style={getTopCoordinates(clickX, clickY, currentX, currentY)}
      />
      <div
        className="zoom-right-border"
        style={getRightCoordinates(clickX, clickY, currentX, currentY)}
      />
      <div
        className="zoom-bottom-border"
        style={getBottomCoordinates(clickX, clickY, currentX, currentY)}
      />
      <div
        className="zoom-left-border"
        style={getLeftCoordinates(clickX, clickY, currentX, currentY)}
      />
    </Fragment>
  );
};

export default React.memo(Rectangle);
