import { getProperty, isNumber, isObject } from './utils';

export const getHorizontalDistance = (scale, { currentX, clickX }) =>
  Math.floor(Math.abs(currentX - clickX) * scale);

export const getVerticaDistance = (scale, { currentY, clickY }) =>
  Math.floor(Math.abs(currentY - clickY) * scale);

export const withTranslation = (translate) => (obj) => ({
  top: getProperty(obj, 'top', 0) + getProperty(translate, 'y', 0),
  left: getProperty(obj, 'left', 0) + getProperty(translate, 'x', 0)
});

export const areValidPositions = (positions) => {
  const validPositions = ['clickX', 'clickY', 'currentX', 'currentY'];
  return (
    isObject(positions) &&
    Object.keys(positions).length > 0 &&
    Object.entries(positions).every(([k, v]) => validPositions.includes(k) && isNumber(v))
  );
};

export const getPlacementFunction = (placement) =>
  ({
    right(image, positions, margin = 20) {
      return {
        top: 0,
        left: image.clientWidth + margin
      };
    },
    left(image, positions, margin = 20) {
      return {
        top: 0,
        left:
          -margin -
          getHorizontalDistance(image.naturalHeight / image.clientHeight, positions)
      };
    },
    top(image, positions, margin = 20) {
      return {
        top:
          -margin -
          getVerticaDistance(image.naturalHeight / image.clientHeight, positions),
        left: 0
      };
    },
    bottom(image, positions, margin = 20) {
      return {
        top: image.clientHeight + margin,
        left: 0
      };
    }
  }[placement]);
