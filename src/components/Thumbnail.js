import React from 'react';
import Image from './ThumbnailImage';
import * as PropTypes from 'prop-types';
import Rectangle from './Rectangle';
import { withPerfectZoomProps } from './context/PerfectZoomContext';
import { isNumber } from '../lib/utils';
import { isSingleSource } from '../lib/source';
import { realImageStates } from '../lib/imageState';

const Thumbnail = ({
  events,
  imageRef,
  realImageState,
  setRealImageState,
  source,
  positions,
  rectangleStyles
}) => {
  const singleSource = isSingleSource(source);
  return (
    <div className="perfect-zoom-image-picker">
      <Image
        ref={imageRef}
        events={events}
        thumbnail={singleSource ? source : source.thumbnail}
        cursorNone={!singleSource && realImageState === realImageStates.IN_PROGRESS}
        {...(singleSource && {
          handleLoad: () => setRealImageState(realImageStates.LOADED)
        })}
      />
      {Object.values(positions).every(isNumber) && (
        <Rectangle
          positions={positions}
          singleSource={singleSource}
          realImageState={realImageState}
          rectangleStyles={rectangleStyles}
        />
      )}
    </div>
  );
};

Thumbnail.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      url: PropTypes.string,
      size: PropTypes.arrayOf(PropTypes.number),
      realSize: PropTypes.arrayOf(PropTypes.number)
    }),
    PropTypes.shape({
      thumbnail: PropTypes.shape({
        url: PropTypes.string.isRequired,
        size: PropTypes.arrayOf(PropTypes.number)
      }),
      realImage: PropTypes.shape({
        url: PropTypes.string.isRequired,
        size: PropTypes.arrayOf(PropTypes.number)
      })
    })
  ]).isRequired,
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  }),
  imageRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  realImageState: PropTypes.oneOf(Object.values(realImageStates))
};

const requiredProps = [
  'source',
  'realImageState',
  'setRealImageState',
  'rectangleStyles'
];
export default withPerfectZoomProps(requiredProps)(Thumbnail);
