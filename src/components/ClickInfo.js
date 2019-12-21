import React from 'react';
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

export default React.memo(ClickInfo);
