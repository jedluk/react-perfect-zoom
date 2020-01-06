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
    right(image, positions, margin = 20) {
      return {
        top: 0,
        left: image.clientWidth + margin
      };
    },
    left(image, positions, margin = 20) {
      return {
        top: 0,
        left: Math.floor(
          -margin -
            getCroppedImageSize(image.naturalHeight / image.clientHeight, positions).width
        )
      };
    },
    top(image, positions, margin = 20) {
      return {
        top: Math.floor(
          -margin -
            getCroppedImageSize(image.naturalHeight / image.clientHeight, positions)
              .height
        ),
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

export const withTranslation = (translate) => (obj) => ({
  top: obj.top + getProperty(translate, 'y', 0),
  left: obj.left + getProperty(translate, 'x', 0)
});

export const withAlignment = (align, { img, placement, positions }) => {
  const alignVertical = ['left', 'right'].includes(placement);
  const scale = img.naturalHeight / img.clientHeight;
  const displacement = {
    start: {
      top: 0,
      left: 0
    },
    center: {
      top: alignVertical
        ? Math.floor(
            img.clientHeight / 2 - getCroppedImageSize(scale, positions).height / 2
          )
        : 0,
      left: !alignVertical
        ? Math.floor(
            img.clientWidth / 2 - getCroppedImageSize(scale, positions).width / 2
          )
        : 0
    },
    end: {
      top: alignVertical
        ? Math.floor(img.clientHeight - getCroppedImageSize(scale, positions).height)
        : 0,
      left: !alignVertical
        ? Math.floor(img.clientWidth - getCroppedImageSize(scale, positions).width)
        : 0
    }
  }[align];
  return (obj) => ({
    top: obj.top + displacement.top,
    left: obj.left + displacement.left
  });
};

export const getContainerPosition = ({
  img,
  translate,
  align = 'center',
  positions = {},
  margin = 20,
  placement = 'right'
}) => {
  const settledFunction = placementFunc(placement);
  const initialPosition = settledFunction(img, positions, margin);
  const translatedPosition = withTranslation(translate)(initialPosition);
  return withAlignment(align, { img, placement, positions })(translatedPosition);
};
