import React from 'react';
import Canvas from './Canvas';
import * as PropTypes from 'prop-types';
import { withPerfectZoomProps } from './context/PerfectZoomContext';
import { areValidPositions, getContainerPosition } from '../lib/placement';
import { cropImage } from '../lib/crop';
import { isMobile } from '../lib/platformDetector';
import { realImageStates } from '../lib/imageState';
import { isSingleSource } from '../lib/source';

export class Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.realImageRef = isSingleSource(props.source)
      ? props.thumbnailRef
      : React.createRef(null);
  }

  getScale = () => {
    if(this.realImageRef && this.realImageRef.current){
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
    const singleSource = isSingleSource(source);
    return (
      <div
        className="perfect-zoom-container"
        style={
          realImageState === realImageStates.LOADED
            ? getContainerPosition({
                scale,
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
          src={singleSource ? source.url : source.realImage.url}
          alt="realImage"
          style={
            realImageState === realImageStates.LOADED
              ? cropImage(this.realImageRef.current, scale, positions)
              : { display: 'none' }
          }
          ref={singleSource ? undefined : this.realImageRef}
          onLoad={singleSource ? undefined : this.setImageLoaded}
        />
      </div>
    );
  }
}

Zoom.propTypes = {
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
  allowDownload: PropTypes.bool,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
  align: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
  imgRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number
  }),
  translate: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  margin: PropTypes.number,
  realImageState: PropTypes.oneOf(Object.values(realImageStates)),
  setRealImageState: PropTypes.func
};

const HoC = withPerfectZoomProps([
  'allowDownload',
  'align',
  'placement',
  'translate',
  'margin',
  'source',
  'realImageState',
  'setRealImageState'
])(Zoom);
export default React.memo(HoC);
