import React from 'react';
import Image from './ThumbnailImage';
import * as PropTypes from 'prop-types';
import Rectangle from './Rectangle';
import { withPerfectZoomProps } from './context/PerfectZoomContext';
import { isNumber } from '../lib/utils';
import { hasSingleImage, getThumbnailSource, getThumbnailSize } from '../lib/source';
import { realImageStates } from '../lib/imageState';

export const Thumbnail = ({
  events,
  imageRef,
  realImageState,
  setRealImageState,
  source,
  positions,
  rectangleStyles
}) => {
  const singleImage = hasSingleImage(source);
  return (
    <div className="perfect-zoom-image-picker">
      <Image
        ref={imageRef}
        events={events}
        thumbnailURL={getThumbnailSource(source)}
        size={getThumbnailSize(source)}
        cursorNone={!singleImage && realImageState === realImageStates.IN_PROGRESS}
        {...(singleImage && {
          handleLoad: () => setRealImageState(realImageStates.LOADED)
        })}
      />
      {Object.values(positions).every(isNumber) && (
        <Rectangle
          positions={positions}
          singleImage={singleImage}
          realImageState={realImageState}
          rectangleStyles={rectangleStyles}
        />
      )}
    </div>
  );
};

Thumbnail.propTypes = {
  source: PropTypes.shape({
    thumbnailURL: PropTypes.string.isRequired,
    thumbnailSize: PropTypes.arrayOf(PropTypes.number),
    imageURL: PropTypes.string
  }).isRequired,
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  }),
  imageRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  realImageState: PropTypes.oneOf(Object.values(realImageStates)),
  setRealImageState: PropTypes.func,
  rectangleStyles: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number
  })
};

const requiredProps = [
  'source',
  'realImageState',
  'setRealImageState',
  'rectangleStyles'
];
export default withPerfectZoomProps(requiredProps)(Thumbnail);
