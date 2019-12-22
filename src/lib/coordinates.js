export const INITIAL_POSITION = {
  x: null,
  y: null
};

export const getTopCoordinates = ({ currentX, currentY, clickX, clickY }) => ({
  top: Math.min(clickY, currentY),
  left: Math.min(clickX, currentX),
  width: Math.abs(currentX - clickX)
});

export const getBottomCoordinates = ({ currentX, currentY, clickX, clickY }) => ({
  top: Math.max(clickY, currentY),
  left: Math.min(clickX, currentX),
  width: Math.abs(currentX - clickX)
});

export const getRightCoordinates = ({ currentY, clickX, clickY }) => ({
  top: Math.min(clickY, currentY),
  left: clickX,
  height: Math.abs(currentY - clickY)
});

export const getLeftCoordinates = ({ currentX, currentY, clickY }) => ({
  top: Math.min(clickY, currentY),
  left: currentX,
  height: Math.abs(currentY - clickY)
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
) => -Math.floor((Math.abs(currentX - clickX) * naturalHeight) / clientHeight);
