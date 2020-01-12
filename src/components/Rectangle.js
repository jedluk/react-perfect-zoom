import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import Loader from './Loader';
import {
  getTopCoordinates,
  getRightCoordinates,
  getBottomCoordinates,
  getLeftCoordinates,
  getLoaderCoordinates
} from '../lib/rectangleCoordinates';
import { areValidPositions } from '../lib/placement';
import { realImageStates } from '../lib/imageState';

const Rectangle = ({ singleSource, realImageState, positions, rectangleStyles }) => {
  if (!areValidPositions(positions)) {
    return null;
  }
  if (!singleSource && realImageState === realImageStates.IN_PROGRESS) {
    return (
      <Loader color={rectangleStyles.color} position={getLoaderCoordinates(positions)} />
    );
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
  }),
  rectangleStyles: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number
  }),
  singleSource: PropTypes.bool,
  realImageState: PropTypes.oneOf(Object.values(realImageStates))
};

export default React.memo(Rectangle);
