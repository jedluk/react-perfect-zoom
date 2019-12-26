import { isNumber, isString, getProperty } from './utils';

export const INITIAL_POSITION = {
  x: null,
  y: null
};

const FALLBACK_BORDER_SIZE = 2;

const withCustomStyles = (prop, { size, color } = {}) => ({
  ...(isNumber(size) && { [prop]: size }),
  ...(isString(color) && { backgroundColor: color })
});

export const getTopCoordinates = (
  { currentX, currentY, clickX, clickY },
  style
) => ({
  top: Math.min(clickY, currentY),
  left: Math.min(clickX, currentX),
  width: Math.abs(currentX - clickX),
  ...withCustomStyles('height', style)
});

export const getBottomCoordinates = (
  { currentX, currentY, clickX, clickY },
  style
) => ({
  top: Math.max(clickY, currentY),
  left: Math.min(clickX, currentX),
  width: Math.abs(currentX - clickX),
  ...withCustomStyles('height', style)
});

export const getRightCoordinates = (
  { currentY, currentX, clickX, clickY },
  style
) => ({
  top: Math.min(clickY, currentY),
  left:
    Math.max(clickX, currentX) - getProperty(style, 'size', FALLBACK_BORDER_SIZE),
  height: Math.abs(currentY - clickY),
  ...withCustomStyles('width', style)
});

export const getLeftCoordinates = (
  { currentX, currentY, clickX, clickY },
  style
) => ({
  top: Math.min(clickY, currentY),
  left: Math.min(currentX, clickX),
  height: Math.abs(currentY - clickY),
  ...withCustomStyles('width', style)
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

// 20 is fallback displacement between thumbnail and real image
export const getZoomContainerDistance = (
  { naturalHeight, clientHeight },
  { currentX, clickX }
) => -Math.floor((Math.abs(currentX - clickX) * naturalHeight) / clientHeight) - 20;
