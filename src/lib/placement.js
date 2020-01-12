import { getProperty, isNumber, isObject } from './utils';

export const areValidPositions = (positions) => {
  const validPositions = ['clickX', 'clickY', 'currentX', 'currentY'];
  return (
    isObject(positions) &&
    Object.keys(positions).length > 0 &&
    Object.entries(positions).every(([k, v]) => validPositions.includes(k) && isNumber(v))
  );
};

export const getCroppedImageSize = (scale, { clickX, clickY, currentX, currentY }) => ({
  width: scale * Math.abs(currentX - clickX),
  height: scale * Math.abs(currentY - clickY)
});

export const placementFunc = (placement) =>
  ({
    right({ image, margin = 20 }) {
      return {
        top: 0,
        left: image.clientWidth + margin
      };
    },
    left({ scale, positions, margin = 20 }) {
      return {
        top: 0,
        left: Math.floor(-margin - getCroppedImageSize(scale, positions).width)
      };
    },
    top({ scale, positions, margin = 20 }) {
      return {
        top: Math.floor(-margin - getCroppedImageSize(scale, positions).height),
        left: 0
      };
    },
    bottom({ image, margin = 20 }) {
      return {
        top: image.clientHeight + margin,
        left: 0
      };
    }
  }[placement]);

export const withTranslation = (translate) => (obj) => ({
  top: obj.top + getProperty(translate, 'y', 0),
  left: obj.left + getProperty(translate, 'x', 0)
});

export const withAlignment = (align, { image, scale, placement, positions }) => {
  const alignVertical = ['left', 'right'].includes(placement);
  const displacement = {
    start: {
      top: 0,
      left: 0
    },
    center: {
      top: alignVertical
        ? Math.floor(
            image.clientHeight / 2 - getCroppedImageSize(scale, positions).height / 2
          )
        : 0,
      left: !alignVertical
        ? Math.floor(
            image.clientWidth / 2 - getCroppedImageSize(scale, positions).width / 2
          )
        : 0
    },
    end: {
      top: alignVertical
        ? Math.floor(image.clientHeight - getCroppedImageSize(scale, positions).height)
        : 0,
      left: !alignVertical
        ? Math.floor(image.clientWidth - getCroppedImageSize(scale, positions).width)
        : 0
    }
  }[align];
  return (obj) => ({
    top: obj.top + displacement.top,
    left: obj.left + displacement.left
  });
};

export const getContainerPosition = ({
  image,
  scale,
  translate,
  align = 'center',
  positions = {},
  margin = 20,
  placement = 'right'
}) => {
  if (!image) return;
  const settledFunction = placementFunc(placement);
  const initialPosition = settledFunction({ image, scale, positions, margin });
  const translatedPosition = withTranslation(translate)(initialPosition);
  return withAlignment(align, { image, scale, placement, positions })(translatedPosition);
};
