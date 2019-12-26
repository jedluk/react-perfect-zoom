import { isNumber, isString, getProperty } from './utils';

export const INITIAL_POSITION = {
  x: null,
  y: null
};

const FALLBACK_BORDER_SIZE = 2;

const withCustomStyles = ({ size, color } = {}) => ({
  ...(isNumber(size) && { height: size }),
  ...(isString(color) && { backgroundColor: color })
});

export const getTopCoordinates = (
  { currentX, currentY, clickX, clickY },
  style
) => ({
  top: Math.min(clickY, currentY),
  left: Math.min(clickX, currentX),
  width: Math.abs(currentX - clickX),
  ...withCustomStyles(style)
});

export const getBottomCoordinates = (
  { currentX, currentY, clickX, clickY },
  style
) => ({
  top: Math.max(clickY, currentY),
  left: Math.min(clickX, currentX),
  width: Math.abs(currentX - clickX),
  ...withCustomStyles(style)
});

export const getRightCoordinates = (
  { currentY, currentX, clickX, clickY },
  style
) => ({
  top: Math.min(clickY, currentY),
  left:
    Math.max(clickX, currentX) - getProperty(style, 'size', FALLBACK_BORDER_SIZE),
  height: Math.abs(currentY - clickY),
  ...withCustomStyles(style)
});

export const getLeftCoordinates = (
  { currentX, currentY, clickX, clickY },
  style
) => ({
  top: Math.min(clickY, currentY),
  left: Math.min(currentX, clickX),
  height: Math.abs(currentY - clickY),
  ...withCustomStyles(style)
});

export const cropImage = (
  { naturalHeight, naturalWidth, clientHeight },
  { currentX, currentY, clickX, clickY }
) => {
  const scale = naturalHeight / clientHeight;
  return {
    marginTop: -Math.floor(Math.min(currentY, clickY) * scale),
    marginRight: -Math.floor(naturalWidth - Math.max(currentX, clickX) * scale),
    marginBottom: -Math.floor(naturalHeight - Math.max(currentY, clickY) * scale),
    marginLeft: -Math.floor(Math.min(currentX, clickX) * scale)
  };
};

export const getZoomContainerDistance = (
  { naturalHeight, clientHeight },
  { currentX, clickX }
) => -Math.floor((Math.abs(currentX - clickX) * naturalHeight) / clientHeight) - 20;
