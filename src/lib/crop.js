export const cropImage = (img, scale = 1, { currentX, currentY, clickX, clickY }) => {
  if (!img) return;
  const { naturalHeight, naturalWidth } = img;
  return {
    marginTop: -Math.floor(Math.min(currentY, clickY) * scale),
    marginRight: -Math.floor(naturalWidth - Math.max(currentX, clickX) * scale),
    marginBottom: -Math.floor(naturalHeight - Math.max(currentY, clickY) * scale),
    marginLeft: -Math.floor(Math.min(currentX, clickX) * scale)
  };
};
