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
