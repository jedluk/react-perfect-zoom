import React from 'react';
import * as PropTypes from 'prop-types';
import { withUserProps } from './context/UserPropsContext';
import { areValidPositions, getContainerPosition } from '../lib/placement';
import { cropImage } from '../lib/crop';
import Canvas from './Canvas';
import { isMobile } from '../lib/platformDetector';
import { isObject } from '../lib/utils';

class Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.singleSource = !('realImage' in props.source);
    this.realImgRef = this.singleSource ? props.thumbnailRef : React.createRef(null);
  }

  getScale = () => {
    if (!isObject(this.realImgRef.current)) return;
    const scale =
      this.realImgRef.current.naturalHeight /
      this.props.thumbnailRef.current.clientHeight;
    return scale;
  };

  render() {
    const { source, positions, realImageLoaded } = this.props;
    if (!areValidPositions(positions)) {
      return null;
    }
    const scale = this.getScale();
    return (
      <div
        className="perfect-zoom-container"
        style={
          realImageLoaded || this.singleSource
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
          <Canvas image={this.realImgRef.current} positions={positions} scale={scale} />
        )}
        <img
          src={this.singleSource ? source.url : source.realImage.url}
          alt="realImage"
          style={
            realImageLoaded || this.singleSource
              ? cropImage(this.realImgRef.current, scale, positions)
              : { display: 'none' }
          }
          ref={this.singleSource ? undefined : this.realImgRef}
          onLoad={this.singleSource ? undefined : this.props.setRealImageLoaded}
        />
      </div>
    );
  }
}

Zoom.propTypes = {
  source: PropTypes.string.isRequired,
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
  margin: PropTypes.number
};

const userProps = [
  'allowDownload',
  'align',
  'placement',
  'translate',
  'margin',
  'source',
  'realImageLoaded',
  'setRealImageLoaded'
];
export default React.memo(withUserProps(userProps)(Zoom));
