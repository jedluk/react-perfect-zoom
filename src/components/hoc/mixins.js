import { inRange } from '../../lib/utils';

// function synthax (arrow change this meaning)
export function getPositions() {
  return {
    clickX: this.state.startPosition.x,
    clickY: this.state.startPosition.y,
    currentX: this.state.currentPosition.x,
    currentY: this.state.currentPosition.y
  };
}

export const getRelativeCoordinates = (boundingRect, { pageX, pageY }) => {
  // getBoundingClient return y position relative to top left corner;
  const { x, y } = boundingRect;
  // we must subtract window.scrollY and window.scrollX
  return {
    x: Math.floor(pageX - x - window.scrollX),
    y: Math.floor(pageY - y - window.scrollY)
  };
};

export const isOutsideImageRectangle = (range) => {
  const inCustomRange = inRange(range);
  return (boundingRect) => {
    const { right, left, top, bottom } = boundingRect;
    return ({ pageX: x, pageY: y }) => {
      return (
        inCustomRange(x, right) ||
        inCustomRange(x, left) ||
        inCustomRange(y, top) ||
        inCustomRange(y, bottom)
      );
    };
  };
};

export const toggleBodyVisibility = ({ overflowX = '', overflowY = '' }) => {
  const { documentElement: elem } = document;
  if (elem.scrollHeight <= elem.clientHeight) {
    document.body.style.overflowY = overflowY;
  }
  if (elem.scrollWidth <= elem.clientWidth) {
    document.body.style.overflowX = overflowX;
  }
};
