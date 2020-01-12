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
    right({ margin, thumbnail }) {
      return {
        top: 0,
        left: thumbnail.clientWidth + margin
      };
    },
    left({ margin, croppedImage }) {
      return {
        top: 0,
        left: Math.floor(-margin - croppedImage.width)
      };
    },
    top({ margin, croppedImage }) {
      return {
        top: Math.floor(-margin - croppedImage.height),
        left: 0
      };
    },
    bottom({ margin, thumbnail }) {
      return {
        top: thumbnail.clientHeight + margin,
        left: 0
      };
    }
  }[placement]);

export const calculateAlignment = ({ thumbnail, croppedImage, verticalAlign }) => (
  align
) =>
  ({
    start: {
      top: 0,
      left: 0
    },
    center: {
      top: verticalAlign
        ? Math.floor(0.5 * thumbnail.clientHeight - 0.5 * croppedImage.height)
        : 0,
      left: !verticalAlign
        ? Math.floor(0.5 * thumbnail.clientWidth - 0.5 * croppedImage.width)
        : 0
    },
    end: {
      top: verticalAlign ? Math.floor(thumbnail.clientHeight - croppedImage.height) : 0,
      left: !verticalAlign ? Math.floor(thumbnail.clientWidth - croppedImage.width) : 0
    }
  }[align]);

export const parseTranslation = (translate) => ({
  top: getProperty(translate, 'y', 0),
  left: getProperty(translate, 'x', 0)
});

export const getContainerPosition = ({
  scale,
  translate,
  image: thumbnail,
  align = 'center',
  positions = {},
  margin = 20,
  placement = 'right'
}) => {
  if (!thumbnail) return;
  const croppedImage = getCroppedImageSize(scale, positions);
  const verticalAlign = ['left', 'right'].includes(placement);
  const basePositon = placementFunc(placement)({
    thumbnail,
    croppedImage,
    margin
  });
  const translation = parseTranslation(translate);
  const alignment = calculateAlignment({ croppedImage, thumbnail, verticalAlign })(align);
  basePositon.top += translation.top + alignment.top;
  basePositon.left += translation.left + alignment.left;
  return basePositon;
};
