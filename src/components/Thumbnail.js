import React from 'react';
import { withUserProps } from './context/UserPropsContext';
import * as PropTypes from 'prop-types';
import Rectangle from './Rectangle';
import { isNumber } from '../lib/utils';
import Image from './ThumbnailImage';

const Thumbnail = ({ events, imageRef, source, positions }) => {
  const thumbnail = source.thumbnail || source;
  return (
    <div className="perfect-zoom-image-picker">
      <Image ref={imageRef} thumbnail={thumbnail} events={events} />
      {Object.values(positions).every(isNumber) && <Rectangle positions={positions} />}
    </div>
  );
};

// TODO: update propTypes
Thumbnail.propTypes = {
  handleClick: PropTypes.func,
  handleMouseMove: PropTypes.func,
  source: PropTypes.string,
  size: PropTypes.arrayOf(PropTypes.number),
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  }),
  rectangleStyles: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number
  })
};

const userProps = ['source', 'rectangleStyles'];
export default withUserProps(userProps)(Thumbnail);
