import React from 'react';
import * as PropTypes from 'prop-types';
import { getProperty, isNumber } from '../lib/utils';
import Thumbnail from './Thumbnail';
import ClickInfo from './ClickInfo';
import Zoom from './Zoom';
import { isMobile, touchDevice } from '../lib/platformDetector';
import withMouseEvents from './hoc/withMouseEvents';
import withTouchEvents from './hoc/withTouchEvents';

const PerfectZoom = ({ imageRef, positions, events }) => (
  <div className="pos-relative">
    <Thumbnail imageRef={imageRef} positions={positions} events={events} />
    {getProperty(process, 'env.REACT_APP_PERFECT_ZOOM_DEBUG', false) && (
      <ClickInfo positions={positions} />
    )}
    {isNumber(positions.currentX) && (
      <Zoom thumbnailRef={imageRef} positions={positions} />
    )}
  </div>
);

PerfectZoom.propTypes = {
  imageRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  }).isRequired,
  events: PropTypes.oneOfType([
    PropTypes.shape({
      onClick: PropTypes.func,
      onMouseMove: PropTypes.func
    }),
    PropTypes.shape({
      onTouchStart: PropTypes.func,
      onTouchMove: PropTypes.func,
      onTouchEnd: PropTypes.func
    })
  ]).isRequired
};

const HoC = isMobile && touchDevice ? withTouchEvents : withMouseEvents;
export default HoC(PerfectZoom);
