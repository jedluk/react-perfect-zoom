import React from 'react';
import * as PropTypes from 'prop-types';
import { isNumber } from '../lib/utils';
import Rectangle from './Rectangle';

const Thumbnail = React.forwardRef(({ source, size, positions, ...func }, ref) => (
  <div className="perfect-zoom-image-picker">
    <img
      id="k13x"
      alt="main"
      ref={ref}
      src={source}
      style={{
        maxHeight: size[0],
        maxWidth: size[1]
      }}
      onLoad={func.handleLoadImage}
      onClick={func.handleClick}
      {...(isNumber(positions.clickX) && {
        onMouseMove: func.handleMouseMove
      })}
    />
    {Object.values(positions).some(Boolean) && <Rectangle positions={positions} />}
  </div>
));

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
  })
};

export default React.memo(Thumbnail);
