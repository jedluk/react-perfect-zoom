import React from 'react';
import * as PropTypes from 'prop-types';
import Rectangle from './Rectangle';

const Thumbnail = React.forwardRef((props, ref) => (
  <div className="image-picker">
    <img
      ref={ref}
      src={props.source}
      id="k13x"
      alt="main"
      onMouseMove={props.handleMouseMove}
      onClick={props.handleClick}
      style={{ maxHeight: props.size[0], maxWidth: props.size[1] }}
    />
    {Object.values(props.positions).some(Boolean) && (
      <Rectangle positions={props.positions} />
    )}
  </div>
));

Thumbnail.propTypes = {
  handleClick: PropTypes.func,
  handleMouseMove: PropTypes.func,
  source: PropTypes.string,
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  })
};

export default React.memo(Thumbnail);
