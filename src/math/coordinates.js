export const getTopCoordinates = (clickX, clickY, currentX, currentY) => ({
  top: Math.min(clickY, currentY),
  left: Math.min(clickX, currentX),
  width: Math.abs(currentX - clickX)
});

export const getBottomCoordinates = (clickX, clickY, currentX, currentY) => ({
  top: Math.max(clickY, currentY),
  left: Math.min(clickX, currentX),
  width: Math.abs(currentX - clickX)
});

export const getRightCoordinates = (clickX, clickY, currentX, currentY) => ({
  top: Math.min(clickY, currentY),
  left: clickX,
  height: Math.abs(currentY - clickY)
});

export const getLeftCoordinates = (clickX, clickY, currentX, currentY) => ({
  top: Math.min(clickY, currentY),
  left: currentX,
  height: Math.abs(currentY - clickY)
});

export const cropImage = (
  { naturalHeight, naturalWidth, clientHeight },
  { posX, posY, clickX, clickY }
) => {
  const scale = naturalHeight / clientHeight;
  return {
    marginTop: -Math.floor(Math.min(posY, clickY) * scale),
    marginRight: -Math.floor(naturalWidth - Math.max(posX, clickX) * scale),
    marginBottom: -Math.floor(naturalHeight - Math.max(posY, clickY) * scale),
    marginLeft: -Math.floor(Math.min(posX, clickX) * scale)
  };
};
