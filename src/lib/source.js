export const hasSingleImage = (source) => typeof source.imageURL === 'undefined';

export const getThumbnailSource = (source) => source.thumbnailURL;

export const getThumbnailSize = (source) => source.thumbnailSize;

export const getImageSource = (source) => source.imageURL || getThumbnailSource(source);
