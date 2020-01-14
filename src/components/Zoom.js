import React from 'react';
import Canvas from './Canvas';
import * as PropTypes from 'prop-types';
import { withPerfectZoomProps } from './context/PerfectZoomContext';
import { areValidPositions, getContainerPosition } from '../lib/placement';
import { cropImage } from '../lib/crop';
import { isMobile } from '../lib/platformDetector';
import { realImageStates } from '../lib/imageState';
import { hasSingleImage, getImageSource } from '../lib/source';

export class Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.realImageRef = hasSingleImage(props.source)
      ? props.thumbnailRef
      : React.createRef(null);
  }

  getScale = () => {
    if (this.realImageRef && this.realImageRef.current) {
      return (
        this.realImageRef.current.naturalHeight /
        this.props.thumbnailRef.current.clientHeight
      );
    }
    return 1;
  };

  setImageLoaded = () => {
    this.props.setRealImageState(realImageStates.LOADED);
  };

  render() {
    const { source, positions, realImageState } = this.props;
    if (!areValidPositions(positions)) {
      return null;
    }
    const scale = this.getScale();
    const singleImage = hasSingleImage(source);
    return (
      <div
        className="perfect-zoom-container"
        style={
          realImageState === realImageStates.LOADED
            ? getContainerPosition({
                scale,
                positions,
                align: this.props.align,
                placement: this.props.placement,
                translate: this.props.translate,
                margin: this.props.margin,
                image: this.props.thumbnailRef.current
              })
            : undefined
        }
      >
        {!isMobile && this.props.allowDownload && (
          <Canvas image={this.realImageRef.current} positions={positions} scale={scale} />
        )}
        <img
          src={getImageSource(source)}
          alt="realImage"
          style={
            realImageState === realImageStates.LOADED
              ? cropImage(this.realImageRef.current, scale, positions)
              : { display: 'none' }
          }
          ref={singleImage ? undefined : this.realImageRef}
          onLoad={singleImage ? undefined : this.setImageLoaded}
        />
      </div>
    );
  }
}

Zoom.propTypes = {
  thumbnailRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  }),
  allowDownload: PropTypes.bool,
  align: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
  margin: PropTypes.number,
  source: PropTypes.shape({
    thumbnailURL: PropTypes.string.isRequired,
    thumbnailSize: PropTypes.arrayOf(PropTypes.number),
    imageURL: PropTypes.string
  }).isRequired,
  translate: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  realImageState: PropTypes.oneOf(Object.values(realImageStates)),
  setRealImageState: PropTypes.func
};

const HoC = withPerfectZoomProps([
  'allowDownload',
  'align',
  'placement',
  'margin',
  'source',
  'translate',
  'realImageState',
  'setRealImageState'
])(Zoom);
export default React.memo(HoC);
