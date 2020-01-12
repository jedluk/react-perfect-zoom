import React from 'react';
import * as PropTypes from 'prop-types';

export default function Loader({ position, color: backgroundColor }) {
  return (
    <div className="bouncing-loader" style={position}>
      <div style={{ backgroundColor }} />
      <div style={{ backgroundColor }} />
      <div style={{ backgroundColor }} />
    </div>
  );
}

Loader.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number
  }),
  color: PropTypes.string
};
