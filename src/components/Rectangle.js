import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import Loader from './Loader';
import {
  getTopCoordinates,
  getRightCoordinates,
  getBottomCoordinates,
  getLeftCoordinates
} from '../lib/rectangleCoordinates';
import { areValidPositions } from '../lib/placement';

const getLoaderCoordinates = ({ clickX, clickY, currentX, currentY }, style) => ({
  top: Math.floor((clickY + currentY) / 2 - 47 / 2),
  left: Math.floor((clickX + currentX) / 2 - 57 / 2),
  color: style.color
});

const Rectangle = ({ positions, rectangleStyles }) => {
  if (!areValidPositions(positions)) {
    return null;
  }
  return (
    <Fragment>
      <Loader position={getLoaderCoordinates(positions, rectangleStyles)} />
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
  }),
  rectangleStyles: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number
  })
};

export default React.memo(Rectangle);
