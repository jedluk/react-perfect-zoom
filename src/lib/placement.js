import { getProperty } from './utils';

export const getHorizontalDistance = (scale, { currentX, clickX }) =>
  Math.floor(Math.abs(currentX - clickX) * scale);

export const getVerticaDistance = (scale, { currentY, clickY }) =>
  Math.floor(Math.abs(currentY - clickY) * scale);

export const withTranslation = (translate) => (obj) => ({
  top: getProperty(obj, 'top', 0) + getProperty(translate, 'y', 0),
  left: getProperty(obj, 'left', 0) + getProperty(translate, 'x', 0)
});

export const getPlacementFunction = (placement) =>
  ({
    right(image, positions, fallbackMargin = 20) {
      return {
        top: 0,
        left: image.clientWidth + fallbackMargin
      };
    },
    left(image, positions, fallbackMargin = 20) {
      return {
        top: 0,
        left:
          -fallbackMargin -
          getHorizontalDistance(image.naturalHeight / image.clientHeight, positions)
      };
    },
    top(image, positions, fallbackMargin = 20) {
      return {
        top:
          -fallbackMargin -
          getVerticaDistance(image.naturalHeight / image.clientHeight, positions),
        left: 0
      };
    },
    bottom(image, positions, fallbackMargin = 20) {
      return {
        top: image.clientHeight + fallbackMargin,
        left: 0
      };
    }
  }[placement]);
