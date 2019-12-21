import React from 'react';
import * as PropTypes from 'prop-types';
import { isNumber } from '../lib/utils';

const ClickInfo = ({ positions: { currentX, currentY, clickX, clickY } }) => (
  <>
    {isNumber(currentX) && (
      <h4 className="d-inline">
        Current position ({currentX}, {currentY})
      </h4>
    )}{' '}
    {isNumber(clickX) && (
      <h4 className="d-inline">
        Click positon: ({clickX},{clickY})
      </h4>
    )}
  </>
);

ClickInfo.propTypes = {
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  })
};

export default React.memo(ClickInfo);
