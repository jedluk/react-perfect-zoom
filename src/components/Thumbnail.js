import React from 'react';
import * as PropTypes from 'prop-types';
import { isNumber } from '../lib/utils';
import Rectangle from './Rectangle';

const Thumbnail = React.forwardRef((props, ref) => (
  <div className="perfect-zoom-image-picker">
    <img
      id="k13x"
      alt="main"
      ref={ref}
      src={props.source}
      style={{
        maxHeight: props.size[0],
        maxWidth: props.size[1]
      }}
      onLoad={props.handleLoadImage}
      onClick={props.handleClick}
      {...(isNumber(props.positions.clickX) && {
        onMouseMove: props.handleMouseMove
      })}
    />
    {Object.values(props.positions).some(Boolean) && (
      <Rectangle positions={props.positions} />
    )}
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
