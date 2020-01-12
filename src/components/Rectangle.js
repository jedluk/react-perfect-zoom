import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import Loader from './Loader';
import {
  getTopCoordinates,
  getRightCoordinates,
  getBottomCoordinates,
  getLeftCoordinates
} from '../lib/rectangleCoordinates';
import { withUserProps } from './context/UserPropsContext';
import { areValidPositions } from '../lib/placement';

const getLoaderCoordinates = ({ clickX, currentX, clickY, currentY }) => ({
  top: currentY || clickY,
  left: currentX || clickX
});

const Rectangle = ({ source, realImageLoaded, positions, rectangleStyles }) => {
  if (!areValidPositions(positions)) {
    return null;
  }
  if ('realImage' in source && !realImageLoaded) {
    return (
      <Loader
        color={rectangleStyles.color}
        position={getLoaderCoordinates(positions, rectangleStyles)}
      />
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
  })
};

const userProps = ['realImageLoaded', 'source', 'rectangleStyles'];
export default React.memo(withUserProps(userProps)(Rectangle));
