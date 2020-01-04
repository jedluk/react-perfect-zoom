import React from 'react';
import * as PropTypes from 'prop-types';
import { getProperty, isNumber } from '../lib/utils';
import Thumbnail from './Thumbnail';
import ClickInfo from './ClickInfo';
import Zoom from './Zoom';
import { isMobile, touchDevice } from '../lib/platformDetector';
import withMouseEvents from './hoc/withMouseEvents';
import withTouchEvents from './hoc/withTouchEvents';
import '../assets/index.css';

const PerfectZoom = ({
  source,
  thumbnailSize,
  rectangleStyles,
  margin,
  translate,
  placement,
  allowDownload,
  ...hocProps
}) => (
  <div className="pos-relative">
    <Thumbnail
      ref={hocProps.imageRef}
      source={source}
      size={thumbnailSize}
      rectangleStyles={rectangleStyles}
      positions={hocProps.positions}
      events={hocProps.events}
    />
    {getProperty(process, 'env.REACT_APP_PERFECT_ZOOM_DEBUG', false) && (
      <ClickInfo positions={hocProps.positions} />
    )}
    {isNumber(getProperty(hocProps, 'positions.currentX', null)) && (
      <Zoom
        source={source}
        placement={placement}
        translate={translate}
        margin={margin}
        imgRef={hocProps.imageRef}
        positions={hocProps.positions}
        allowDownload={!isMobile && allowDownload}
      />
    )}
  </div>
);

PerfectZoom.propTypes = {
  source: PropTypes.string.isRequired,
  thumbnailSize: PropTypes.arrayOf(PropTypes.number),
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  margin: PropTypes.number,
  rectangleStyles: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number
  }),
  translate: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  allowDownload: PropTypes.bool
};

PerfectZoom.defaultProps = {
  placement: 'right',
  thumbnailSize: [300, 500],
  margin: 20,
  allowDownload: false
};

const HoC = isMobile && touchDevice ? withTouchEvents : withMouseEvents;
export default HoC(PerfectZoom);
