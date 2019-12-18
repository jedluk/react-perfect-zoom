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

export const cropImage = (imageRef, { posX, posY, clickX, clickY }) => {
  const scale =  imageRef.naturalHeight / imageRef.clientHeight; 
  const marginTop = -  Math.floor(Math.min(posY, clickY) * scale);
  const marginRight = - Math.floor(Math.max(clickX, posX) * scale);
  const marginBottom = - Math.floor(Math.max(clickY, posY) * scale);
  const marginLeft = - Math.floor(Math.min(posX, clickX) * scale);
  return {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft
  };
};
