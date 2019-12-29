import React from 'react';
import * as PropTypes from 'prop-types';
import { isNumber } from '../lib/utils';
import Rectangle from './Rectangle';

const Thumbnail = React.forwardRef(
  ({ source, size, positions, rectangleStyles, ...func }, ref) => (
    <div className="perfect-zoom-image-picker">
      <img
        alt="thumbnail"
        ref={ref}
        src={source}
        style={{
          maxHeight: size[0],
          maxWidth: size[1]
        }}
        onClick={func.handleClick}
        {...(isNumber(positions.clickX) && {
          onMouseMove: func.handleMouseMove
        })}
      />
      {Object.values(positions).some(Boolean) && (
        <Rectangle rectangleStyles={rectangleStyles} positions={positions} />
      )}
    </div>
  )
);

Thumbnail.propTypes = {
  handleLoadImage: PropTypes.func,
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

export default React.memo(Thumbnail);
