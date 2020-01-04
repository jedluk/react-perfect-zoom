import React from 'react';
import * as PropTypes from 'prop-types';
import Rectangle from './Rectangle';

const Thumbnail = React.forwardRef(
  ({ source, size, positions, rectangleStyles, events }, ref) => (
    <div className="perfect-zoom-image-picker">
      <img
        alt="thumbnail"
        ref={ref}
        src={source}
        style={{
          maxHeight: size[0],
          maxWidth: size[1]
        }}
        {...events}
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
